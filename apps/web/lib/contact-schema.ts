import { z } from "zod";

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

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
