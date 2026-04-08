# Architecture Overview

## Core design

- **Frontend**: Next.js App Router for SEO-first public pages and SSR dashboards.
- **Backend**: Express API with REST endpoints and tRPC router for end-to-end type-safe internal operations.
- **Mobile**: Expo app with module-aligned screens for projects, bookings, invoices, and notifications.
- **Data**: PostgreSQL + Prisma; Redis for cache, rate limiting, and queues.
- **Storage**: Supabase Storage for assets/documents (AWS replaced).

## Security baseline

- JWT-based request auth middleware on API.
- RBAC middleware at route level (`ADMIN/SUPER_ADMIN/CLIENT` checks).
- Rate limit middleware (Redis-backed when available, memory fallback).
- Helmet security headers and CORS allowlist.
- Webhook endpoint scaffolds include signature/verification placeholder logic.

## Delivery strategy

1. Start with shared contracts (`packages/types`) and DB schema (`packages/db`).
2. Build domain modules in API (`leads`, `appointments`, `projects`, `invoices`, `notifications`).
3. Wire web portal/admin pages to tRPC.
4. Add queue jobs + notification channels + analytics.
5. Expand mobile to authenticated, offline-first flow.
