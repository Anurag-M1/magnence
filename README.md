# Magnence Platform

Monorepo foundation for a full-stack software agency platform:

- `apps/web`: Next.js 14 marketing site + client portal + admin dashboard
- `apps/api`: Express + tRPC backend with RBAC, rate limit, and webhook scaffolds
- `apps/mobile`: Expo starter app with dashboard/projects/appointments/invoices/notifications screens
- `packages/db`: Prisma schema/client for PostgreSQL
- `packages/types`: shared end-to-end types and Zod schemas
- `packages/ui`: shared React UI primitives
- `packages/email`: React Email templates

## Supabase replacement for AWS

Storage is configured for Supabase Storage using:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`

The API upload service is implemented at `apps/api/src/services/storage.service.ts`.

## Quick start

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
   - `npm install`
3. Install mobile dependencies:
   - `npm install --prefix apps/mobile`
4. Generate Prisma client:
   - `npm run prisma:generate --workspace=@magnence/db`
5. Start local infra (Postgres + Redis):
   - `docker compose -f infrastructure/docker/docker-compose.yml up -d`
6. Run apps:
   - Web: `npm run dev:web`
   - API: `npm run dev:api`
   - Mobile: `npm run dev:mobile`

## Quality gates

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Security endpoints (API)

- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/2fa/setup`
- `POST /api/auth/2fa/verify`
- `POST /api/auth/2fa/backup-codes/regenerate`
- `POST /api/auth/password/change`

Detailed prompt compliance status: `docs/compliance-matrix.md`.
