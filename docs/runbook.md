# Runbook

## Local environment

- Node: 20+ recommended (repo currently compatible with Node 20-26)
- Install root dependencies:
  - `npm install`
- Install mobile dependencies:
  - `npm install --prefix apps/mobile`
- Start dependencies:
  - `docker compose -f infrastructure/docker/docker-compose.yml up -d`
- Ensure `.env` is configured from `.env.example`.

## Prisma

- Generate client:
  - `npm run prisma:generate --workspace=@magnence/db`
- Apply schema to local DB:
  - `npm run prisma:push --workspace=@magnence/db`

## Services

- API:
  - `npm run dev:api`
- Web:
  - `npm run dev:web`
- Mobile:
  - `npm run dev:mobile`

## Common troubleshooting

- If rate limiting errors appear too early in local dev, clear Redis or restart the API.
- If Supabase uploads fail, validate:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_STORAGE_BUCKET`
- If auth redirects loop, check `NEXTAUTH_URL` and `NEXTAUTH_SECRET`.
