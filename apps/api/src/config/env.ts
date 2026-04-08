import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000"),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().optional(),
  NEXTAUTH_SECRET: z.string().min(10),
  JWT_ACCESS_SECRET: z.string().min(10),
  JWT_REFRESH_SECRET: z.string().min(10),
  JWT_REFRESH_TTL_DAYS: z.coerce.number().int().positive().default(7),
  PII_ENCRYPTION_KEY: z.string().min(32),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET: z.string().default("magnence-files"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  WHATSAPP_VERIFY_TOKEN: z.string().optional(),
  WHATSAPP_APP_SECRET: z.string().optional(),
  CALENDLY_WEBHOOK_SIGNING_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

export const corsOrigins = env.CORS_ORIGIN.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
