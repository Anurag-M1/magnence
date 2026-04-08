import { prisma } from "@magnence/db";
import { bookingInputSchema, contactSubmissionSchema } from "@magnence/types";
import { z } from "zod";
import { createLead } from "../services/lead.service.js";
import { publicProcedure, router } from "../trpc/trpc.js";

const staticServices = [
  { slug: "web-apps", title: "Web Apps", description: "Custom full-stack applications and platforms." },
  { slug: "ui-ux-design", title: "UI/UX Design", description: "Conversion-first interface and experience design." },
  { slug: "copywriting", title: "Copywriting", description: "Sales and brand content for web and campaigns." },
  { slug: "maintenance-support", title: "Maintenance & Support", description: "Ongoing support and optimization." },
  { slug: "it-consulting", title: "IT Consulting", description: "Architecture, scaling and digital advisory." },
];

export const publicRouter = router({
  health: publicProcedure.query(() => ({
    ok: true,
    timestamp: new Date().toISOString(),
  })),

  services: publicProcedure.query(() => staticServices),

  portfolio: publicProcedure.query(() => [
    {
      slug: "saas-analytics-suite",
      title: "SaaS Analytics Suite",
      service: "WEB_APP",
      summary: "Built a multi-tenant analytics product with 58% faster report delivery.",
    },
  ]),

  contact: publicProcedure.input(contactSubmissionSchema).mutation(async ({ input }) => {
    const lead = await createLead(input);
    return { success: true, leadId: lead.id };
  }),

  createLead: publicProcedure.input(contactSubmissionSchema).mutation(async ({ input }) => {
    const lead = await createLead(input);
    return { success: true, leadId: lead.id };
  }),

  bookAppointment: publicProcedure.input(bookingInputSchema).mutation(async ({ input }) => {
    const placeholderUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
      select: { id: true },
    });

    if (!placeholderUser) {
      return {
        accepted: true,
        message: "Booking accepted and pending assignment.",
      };
    }

    const appointment = await prisma.appointment.create({
      data: {
        title: input.title,
        type: input.type,
        timezone: input.timezone,
        startTime: input.startTime,
        endTime: input.endTime,
        leadId: input.leadId,
        notes: input.notes,
        userId: placeholderUser.id,
      },
    });

    return { accepted: true, appointmentId: appointment.id };
  }),

  blogList: publicProcedure.query(() => [
    {
      slug: "building-digital-products-2026",
      title: "Building Digital Products That Scale in 2026",
      excerpt: "A practical blueprint for agencies building modern client platforms.",
    },
  ]),

  blogBySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(({ input }) => ({
    slug: input.slug,
    title: "Sample Blog Post",
    content: "Replace this placeholder with your MDX-backed rendering pipeline.",
  })),
});
