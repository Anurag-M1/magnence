import { prisma } from "@magnence/db";
import {
  bookingInputSchema,
  contactSubmissionSchema,
  paginationInputSchema,
  serviceTypes,
  updateProfileSchema,
} from "@magnence/types";
import { type Response, Router } from "express";
import { z } from "zod";
import { env } from "../config/env.js";
import { createRateLimitMiddleware } from "../lib/rate-limit.js";
import { decryptSensitiveValue, generateSecureToken, sha256 } from "../lib/security/crypto.js";
import { verifyTurnstileToken } from "../lib/security/turnstile.js";
import { requireAuth } from "../middleware/auth.js";
import { requireRole } from "../middleware/rbac.js";
import {
  changePassword,
  encryptPhone,
  loginWithCredentials,
  refreshAuthToken,
  revokeRefreshToken,
  rotateBackupCodes,
  setupTwoFactor,
  verifyTwoFactorSetup,
} from "../services/auth.service.js";
import { createLead, listLeads } from "../services/lead.service.js";

const contactLimiter = createRateLimitMiddleware({
  keyPrefix: "contact-form",
  points: 5,
  duration: 60 * 60,
});

const publicLimiter = createRateLimitMiddleware({
  keyPrefix: "public-form",
  points: 10,
  duration: 60 * 60,
});

const authLimiter = createRateLimitMiddleware({
  keyPrefix: "auth-routes",
  points: 100,
  duration: 60,
});

export const restRouter = Router();

const refreshCookieName = "magnence_refresh_token";

const idParamSchema = z.object({
  id: z.string().cuid(),
});

const leadStatusSchema = z.enum(["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"]);
const appointmentStatusSchema = z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "RESCHEDULED"]);
const projectStatusSchema = z.enum([
  "BRIEFING",
  "PROPOSAL",
  "APPROVED",
  "IN_PROGRESS",
  "REVIEW",
  "REVISION",
  "COMPLETED",
  "PAUSED",
]);
const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "BLOCKED"]);
const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
const invoiceStatusSchema = z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]);

restRouter.post("/contact", contactLimiter, async (req, res, next) => {
  try {
    const input = contactSubmissionSchema.parse(req.body);
    const lead = await createLead({
      ...input,
      source: input.source ?? "contact-form",
    });
    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/leads", publicLimiter, async (req, res, next) => {
  try {
    const input = contactSubmissionSchema.parse(req.body);
    const lead = await createLead(input);
    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/appointments/book", publicLimiter, async (req, res, next) => {
  try {
    const input = bookingInputSchema.parse(req.body);
    const captchaValid = await verifyTurnstileToken(input.captchaToken, req.ip);
    if (!captchaValid) {
      res.status(400).json({ error: "CAPTCHA validation failed." });
      return;
    }

    const adminUser = await prisma.user.findFirst({
      where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
      select: { id: true },
    });

    if (!adminUser) {
      res.status(202).json({
        success: true,
        message: "Booking accepted and queued for assignment.",
      });
      return;
    }

    const appointment = await prisma.appointment.create({
      data: {
        title: input.title,
        type: input.type,
        startTime: input.startTime,
        endTime: input.endTime,
        timezone: input.timezone,
        notes: input.notes,
        leadId: input.leadId,
        userId: adminUser.id,
      },
    });

    res.status(201).json({ success: true, appointmentId: appointment.id });
  } catch (error) {
    next(error);
  }
});

restRouter.get("/services", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.json([
    { slug: "web-apps", title: "Web Apps" },
    { slug: "ui-ux-design", title: "UI/UX Design" },
    { slug: "copywriting", title: "Copywriting" },
    { slug: "maintenance-support", title: "Maintenance & Support" },
    { slug: "crm-setup", title: "CRM Setup" },
    { slug: "ecommerce", title: "Ecommerce" },
    { slug: "it-consulting", title: "IT Consulting" },
  ]);
});

restRouter.get("/portfolio", (_req, res) => {
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.json([
    {
      slug: "saas-growth-platform",
      title: "SaaS Growth Platform",
      service: "WEB_APP",
      industry: "B2B SaaS",
      result: "42% faster onboarding completion",
    },
  ]);
});

restRouter.post("/newsletter", publicLimiter, (req, res, next) => {
  try {
    const payload = z.object({ email: z.string().email() }).parse(req.body);
    res.status(201).json({ success: true, email: payload.email });
  } catch (error) {
    next(error);
  }
});

restRouter.get("/blog", (_req, res) => {
  res.json([{ slug: "launching-digital-platforms", title: "Launching Digital Platforms", readingTime: "6 min" }]);
});

restRouter.get("/blog/:slug", (req, res) => {
  const params = z.object({ slug: z.string().min(1).max(200) }).parse(req.params);
  res.json({
    slug: params.slug,
    title: "Sample Post",
    readingTime: "6 min",
    content: "Use your MDX pipeline to render article content.",
  });
});

restRouter.post("/auth/login", authLimiter, async (req, res, next) => {
  try {
    const input = z
      .object({
        email: z.string().email(),
        password: z.string().min(8).max(128),
        totpCode: z.string().length(6).optional(),
        backupCode: z.string().min(5).max(20).optional(),
      })
      .parse(req.body);

    const result = await loginWithCredentials(input);
    if (result.requiresTwoFactor) {
      res.status(200).json(result);
      return;
    }

    setRefreshCookie(res, result.tokens.refreshToken, result.tokens.refreshExpiresAt);
    res.status(200).json({
      requiresTwoFactor: false,
      user: result.user,
      accessToken: result.tokens.accessToken,
      accessTokenExpiresIn: 60 * 15,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/refresh", authLimiter, async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[refreshCookieName];
    if (typeof refreshToken !== "string" || refreshToken.length < 20) {
      res.status(401).json({ error: "Refresh token is missing." });
      return;
    }

    const result = await refreshAuthToken(refreshToken);
    setRefreshCookie(res, result.tokens.refreshToken, result.tokens.refreshExpiresAt);
    res.status(200).json({
      user: result.user,
      accessToken: result.tokens.accessToken,
      accessTokenExpiresIn: 60 * 15,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/logout", authLimiter, async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.[refreshCookieName];
    if (typeof refreshToken === "string") {
      await revokeRefreshToken(refreshToken);
    }

    clearRefreshCookie(res);
    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

restRouter.use(authLimiter);

restRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        phone: true,
        phoneEncrypted: true,
        twoFactorEnabled: true,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json({
      ...user,
      phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.patch("/me", requireAuth, async (req, res, next) => {
  try {
    const input = updateProfileSchema.parse(req.body);
    const encryptedPhone = input.phone !== undefined ? await encryptPhone(input.phone) : null;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name: input.name,
        avatar: input.avatar,
        ...(encryptedPhone
          ? {
              phone: encryptedPhone.phone,
              phoneEncrypted: encryptedPhone.phoneEncrypted,
            }
          : {}),
      },
      select: { id: true, email: true, name: true, avatar: true, phone: true, phoneEncrypted: true },
    });
    res.json({
      ...user,
      phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/2fa/setup", requireAuth, async (req, res, next) => {
  try {
    const setup = await setupTwoFactor(req.user!.id);
    res.json({
      success: true,
      otpauthUrl: setup.otpauthUrl,
      base32: setup.base32,
      backupCodes: setup.backupCodes,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/2fa/verify", requireAuth, async (req, res, next) => {
  try {
    const payload = z.object({ code: z.string().length(6) }).parse(req.body);
    await verifyTwoFactorSetup(req.user!.id, payload.code);
    res.json({ success: true, verified: true });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/2fa/backup-codes/regenerate", requireAuth, async (req, res, next) => {
  try {
    const backupCodes = await rotateBackupCodes(req.user!.id);
    res.json({ success: true, backupCodes });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/auth/password/change", requireAuth, async (req, res, next) => {
  try {
    const payload = z
      .object({
        currentPassword: z.string().min(8).max(128),
        newPassword: z
          .string()
          .min(12)
          .max(128)
          .regex(/[A-Z]/, "Must include uppercase")
          .regex(/[a-z]/, "Must include lowercase")
          .regex(/[0-9]/, "Must include number")
          .regex(/[^A-Za-z0-9]/, "Must include special character"),
      })
      .parse(req.body);
    await changePassword(req.user!.id, payload.currentPassword, payload.newPassword);

    const refreshToken = req.cookies?.[refreshCookieName];
    if (typeof refreshToken === "string") {
      await revokeRefreshToken(refreshToken);
    }
    clearRefreshCookie(res);

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

const adminOnly = [requireAuth, requireRole(["ADMIN", "SUPER_ADMIN"])] as const;

restRouter.get("/leads", ...adminOnly, async (req, res, next) => {
  try {
    const query = paginationInputSchema.parse({
      page: Number(req.query.page ?? 1),
      limit: Number(req.query.limit ?? 20),
      search: typeof req.query.search === "string" ? req.query.search : undefined,
    });
    const data = await listLeads(query.page, query.limit, query.search);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.patch("/leads/:id", ...adminOnly, async (req, res, next) => {
  try {
    const body = z.object({ status: leadStatusSchema }).parse(req.body);
    const leadId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!leadId) {
      res.status(400).json({ error: "Lead id is required." });
      return;
    }

    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: { status: body.status },
    });
    res.json(lead);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/leads/:id/notes", ...adminOnly, async (req, res, next) => {
  try {
    const body = z.object({ body: z.string().min(2).max(2000) }).parse(req.body);
    const leadId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!leadId) {
      res.status(400).json({ error: "Lead id is required." });
      return;
    }

    const note = await prisma.leadNote.create({
      data: {
        leadId,
        body: body.body,
        authorId: req.user?.id,
      },
    });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/appointments", ...adminOnly, async (_req, res, next) => {
  try {
    const data = await prisma.appointment.findMany({ orderBy: { startTime: "asc" } });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.patch("/appointments/:id", ...adminOnly, async (req, res, next) => {
  try {
    const params = idParamSchema.parse(req.params);
    const body = z
      .object({
        status: appointmentStatusSchema.optional(),
        startTime: z.coerce.date().optional(),
        endTime: z.coerce.date().optional(),
        notes: z.string().max(3000).optional(),
        meetLink: z.string().url().optional(),
      })
      .parse(req.body);

    const appointment = await prisma.appointment.update({
      where: { id: params.id },
      data: body,
    });
    res.json(appointment);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/projects", ...adminOnly, async (_req, res, next) => {
  try {
    const data = await prisma.project.findMany({
      include: { tasks: true, milestones: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/projects", ...adminOnly, async (req, res, next) => {
  try {
    const body = z
      .object({
        name: z.string().min(2).max(120),
        description: z.string().max(3000).optional(),
        service: z.enum(serviceTypes),
        clientId: z.string().cuid(),
        status: projectStatusSchema.optional(),
        startDate: z.coerce.date().optional(),
        deadline: z.coerce.date().optional(),
        budget: z.coerce.number().nonnegative().optional(),
      })
      .parse(req.body);

    const project = await prisma.project.create({
      data: {
        ...body,
        budget: body.budget?.toString(),
      },
    });
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
});

restRouter.patch("/projects/:id", ...adminOnly, async (req, res, next) => {
  try {
    const params = idParamSchema.parse(req.params);
    const body = z
      .object({
        name: z.string().min(2).max(120).optional(),
        description: z.string().max(3000).optional(),
        status: projectStatusSchema.optional(),
        startDate: z.coerce.date().optional(),
        deadline: z.coerce.date().optional(),
        budget: z.coerce.number().nonnegative().optional(),
      })
      .parse(req.body);
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...body,
        budget: body.budget?.toString(),
      },
    });
    res.json(project);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/tasks", ...adminOnly, async (_req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        project: true,
        assignee: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/tasks", ...adminOnly, async (req, res, next) => {
  try {
    const body = z
      .object({
        title: z.string().min(2).max(120),
        description: z.string().max(3000).optional(),
        status: taskStatusSchema.optional(),
        priority: taskPrioritySchema.optional(),
        dueDate: z.coerce.date().optional(),
        projectId: z.string().cuid(),
        assigneeId: z.string().cuid().optional(),
      })
      .parse(req.body);
    const task = await prisma.task.create({
      data: body,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

restRouter.patch("/tasks/:id", ...adminOnly, async (req, res, next) => {
  try {
    const params = idParamSchema.parse(req.params);
    const body = z
      .object({
        title: z.string().min(2).max(120).optional(),
        description: z.string().max(3000).optional(),
        status: taskStatusSchema.optional(),
        priority: taskPrioritySchema.optional(),
        dueDate: z.coerce.date().optional(),
        assigneeId: z.string().cuid().nullable().optional(),
      })
      .parse(req.body);
    const task = await prisma.task.update({
      where: { id: params.id },
      data: body,
    });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/invoices", ...adminOnly, async (_req, res, next) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        items: true,
        client: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(invoices);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/invoices", ...adminOnly, async (req, res, next) => {
  try {
    const body = z
      .object({
        number: z.string().min(2).max(32),
        amount: z.coerce.number().positive(),
        currency: z.string().min(3).max(3).default("USD"),
        dueDate: z.coerce.date(),
        status: invoiceStatusSchema.optional(),
        clientId: z.string().cuid(),
        projectId: z.string().cuid().optional(),
        items: z
          .array(
            z.object({
              description: z.string().min(2).max(200),
              quantity: z.coerce.number().int().positive(),
              unitPrice: z.coerce.number().nonnegative(),
            }),
          )
          .min(1),
      })
      .parse(req.body);

    const invoice = await prisma.invoice.create({
      data: {
        number: body.number,
        amount: body.amount.toString(),
        currency: body.currency,
        dueDate: body.dueDate,
        status: body.status,
        clientId: body.clientId,
        projectId: body.projectId,
        items: {
          create: body.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            unitPrice: item.unitPrice.toString(),
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/invoices/:id/send", ...adminOnly, async (req, res, next) => {
  try {
    const params = idParamSchema.parse(req.params);
    const invoice = await prisma.invoice.update({
      where: { id: params.id },
      data: { status: "SENT" },
    });
    res.json({ success: true, invoiceId: invoice.id });
  } catch (error) {
    next(error);
  }
});

restRouter.post("/invoices/:id/pay", ...adminOnly, async (req, res, next) => {
  try {
    const params = idParamSchema.parse(req.params);
    const invoice = await prisma.invoice.findUnique({
      where: { id: params.id },
      select: { id: true, amount: true, currency: true, number: true },
    });
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found." });
      return;
    }
    res.json({
      success: true,
      invoiceId: invoice.id,
      checkoutUrl: `/payments/stripe/checkout?invoiceId=${invoice.id}`,
    });
  } catch (error) {
    next(error);
  }
});

restRouter.get("/analytics", ...adminOnly, async (_req, res, next) => {
  try {
    const [leadCount, wonLeadCount, activeProjectCount, paidInvoiceAgg] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "WON" } }),
      prisma.project.count({
        where: { status: { in: ["APPROVED", "IN_PROGRESS", "REVIEW", "REVISION"] } },
      }),
      prisma.invoice.aggregate({
        where: { status: "PAID" },
        _sum: { amount: true },
      }),
    ]);

    res.json({
      leads: {
        total: leadCount,
        conversionRate: leadCount ? (wonLeadCount / leadCount) * 100 : 0,
      },
      projects: {
        active: activeProjectCount,
      },
      revenue: {
        paidTotal: paidInvoiceAgg._sum.amount ?? 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

restRouter.get("/users", ...adminOnly, async (_req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        phoneEncrypted: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(
      users.map((user) => ({
        ...user,
        phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone,
      })),
    );
  } catch (error) {
    next(error);
  }
});

restRouter.get("/notifications", ...adminOnly, async (_req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/settings/integration-keys", ...adminOnly, async (_req, res, next) => {
  try {
    const keys = await prisma.integrationApiKey.findMany({
      orderBy: [{ service: "asc" }, { version: "desc" }],
      take: 100,
    });
    res.json(
      keys.map((key) => ({
        id: key.id,
        service: key.service,
        version: key.version,
        active: key.active,
        createdAt: key.createdAt,
        rotatedAt: key.rotatedAt,
      })),
    );
  } catch (error) {
    next(error);
  }
});

restRouter.post("/settings/integration-keys/rotate", ...adminOnly, async (req, res, next) => {
  try {
    const body = z
      .object({
        service: z.enum(["STRIPE", "WHATSAPP", "CALENDLY", "RESEND", "OPENAI", "POSTHOG", "SENTRY"]),
      })
      .parse(req.body);

    const latest = await prisma.integrationApiKey.findFirst({
      where: { service: body.service },
      orderBy: { version: "desc" },
      select: { version: true },
    });

    const version = (latest?.version ?? 0) + 1;
    const plainKey = `mk_${body.service.toLowerCase()}_${generateSecureToken(36)}`;
    const keyHash = sha256(plainKey);

    await prisma.$transaction([
      prisma.integrationApiKey.updateMany({
        where: { service: body.service, active: true },
        data: { active: false, rotatedAt: new Date() },
      }),
      prisma.integrationApiKey.create({
        data: {
          service: body.service,
          version,
          keyHash,
          active: true,
          rotatedById: req.user!.id,
        },
      }),
    ]);

    res.status(201).json({
      success: true,
      service: body.service,
      version,
      apiKey: plainKey,
      warning: "This key is shown only once. Store it securely.",
    });
  } catch (error) {
    next(error);
  }
});

restRouter.get("/portal/projects", requireAuth, requireRole(["CLIENT"]), async (req, res, next) => {
  try {
    const data = await prisma.project.findMany({
      where: { clientId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/portal/invoices", requireAuth, requireRole(["CLIENT"]), async (req, res, next) => {
  try {
    const data = await prisma.invoice.findMany({
      where: { clientId: req.user!.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.get("/portal/appointments", requireAuth, requireRole(["CLIENT"]), async (req, res, next) => {
  try {
    const data = await prisma.appointment.findMany({
      where: { userId: req.user!.id },
      orderBy: { startTime: "desc" },
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});

restRouter.post("/portal/feedback", requireAuth, requireRole(["CLIENT"]), (req, res, next) => {
  try {
    z.object({ message: z.string().min(5).max(2000) }).parse(req.body);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

function setRefreshCookie(res: Response, refreshToken: string, expiresAt: Date): void {
  res.cookie(refreshCookieName, refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/api/auth",
  });
}

function clearRefreshCookie(res: Response): void {
  res.clearCookie(refreshCookieName, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth",
  });
}
