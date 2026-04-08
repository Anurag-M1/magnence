# Prompt Compliance Matrix (as of 2026-04-08)

## Fully Implemented

- Monorepo structure (`apps/*`, `packages/*`, infra docs).
- Next.js App Router public/portal/admin route scaffolds.
- Express + tRPC API scaffolds with RBAC middleware.
- Prisma schema covering requested core entities.
- Redis-backed rate limiting with per-IP/per-user keying.
- JWT access token expiry set to 15 minutes.
- Refresh token rotation flow with DB-backed revocation tracking.
- Account lockout after 5 failed login attempts.
- Session/token invalidation on password change (`tokenVersion` + refresh revoke).
- TOTP 2FA setup/verify + one-time backup codes.
- Password hashing and verification with bcrypt cost factor 12.
- PII encryption-at-rest support for phone fields using AES-256-GCM.
- Helmet + CORS allowlist + HSTS.
- Webhook signature verification:
  - Stripe (`stripe-signature`)
  - WhatsApp (`x-hub-signature-256`)
  - Calendly (`calendly-webhook-signature`)
- Supabase storage integration (AWS replaced).
- CI scaffold + Docker compose local infra.
- Build pipeline checks passing (`lint`, `typecheck`, `build`).

## Implemented But Still Basic

- Public/admin/client REST route coverage exists; many domain flows are functional but still starter-level.
- Queue layer (BullMQ) scaffolded, but production jobs/consumers are not fully built.
- Stripe invoice pay route currently returns checkout placeholder URL (full checkout session creation pending).
- Blog/portfolio/content sources are placeholder-backed (not full CMS/MDX production pipeline).

## Still Pending For 100% Spec Compliance

- **NextAuth v5** specifically requested; current implementation uses stable v4 scaffold.
- Full production-grade feature depth for all listed phase modules (CRM scoring logic, advanced calendar sync, complete billing automations, full notification orchestration, full analytics suite).
- Staging/prod deployment manifests for Vercel + Railway/ECS (currently starter infra only).
- Observability wiring end-to-end (Sentry upload, PostHog consent instrumentation, alerting policies).
- Comprehensive tests (unit/integration/e2e/Playwright) for all critical flows.
- Performance benchmark proof against all stated numeric targets (Lighthouse/CWV/API p95).
