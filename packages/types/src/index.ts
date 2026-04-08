import { z } from "zod";

export const roles = ["SUPER_ADMIN", "ADMIN", "TEAM_MEMBER", "CLIENT"] as const;
export type Role = (typeof roles)[number];

export const serviceTypes = [
  "WEB_APP",
  "WEBSITE",
  "BUSINESS_PLATFORM",
  "UI_UX_DESIGN",
  "LANDING_PAGE",
  "ECOMMERCE",
  "COPYWRITING",
  "EDITING",
  "BRAND_COMMUNICATION",
  "MAINTENANCE",
  "TECHNICAL_SUPPORT",
  "CRM_SETUP",
  "IT_CONSULTING",
  "DIGITAL_ADVISORY",
  "FREELANCE_SUPPORT",
  "END_TO_END_DELIVERY",
  "CAMPAIGN_DESIGN",
] as const;
export type ServiceType = (typeof serviceTypes)[number];

export const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST",
] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export const appointmentTypes = ["DISCOVERY", "CONSULTATION", "REVIEW", "SUPPORT"] as const;
export type AppointmentType = (typeof appointmentTypes)[number];

export const appointmentStatuses = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "RESCHEDULED",
] as const;
export type AppointmentStatus = (typeof appointmentStatuses)[number];

export const invoiceStatuses = ["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"] as const;
export type InvoiceStatus = (typeof invoiceStatuses)[number];

export const projectStatuses = [
  "BRIEFING",
  "PROPOSAL",
  "APPROVED",
  "IN_PROGRESS",
  "REVIEW",
  "REVISION",
  "COMPLETED",
  "PAUSED",
] as const;
export type ProjectStatus = (typeof projectStatuses)[number];

export const taskStatuses = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE", "BLOCKED"] as const;
export type TaskStatus = (typeof taskStatuses)[number];

export const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export type Priority = (typeof priorities)[number];

export const notificationTypes = ["APPOINTMENT", "LEAD", "PROJECT", "INVOICE", "SYSTEM"] as const;
export type NotificationType = (typeof notificationTypes)[number];

export const channels = ["EMAIL", "WHATSAPP", "SMS", "IN_APP", "PUSH"] as const;
export type Channel = (typeof channels)[number];

export const paginationInputSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  search: z.string().trim().optional(),
});

export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  company: z.string().max(120).optional(),
  service: z.enum(serviceTypes),
  budget: z.string().max(80).optional(),
  message: z.string().min(10).max(5000),
  source: z.string().max(80).optional(),
});

export const createLeadInputSchema = contactSubmissionSchema.extend({
  assignedId: z.string().cuid().optional(),
});

export const bookingInputSchema = z.object({
  title: z.string().min(3).max(120),
  type: z.enum(appointmentTypes),
  timezone: z.string().min(2).max(50),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  leadId: z.string().cuid().optional(),
  notes: z.string().max(3000).optional(),
  captchaToken: z.string().min(10),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  avatar: z.string().url().optional(),
  phone: z.string().max(30).optional(),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type CreateLeadInput = z.infer<typeof createLeadInputSchema>;
export type BookingInput = z.infer<typeof bookingInputSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
