import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";

export function createContext({ req, res }: CreateExpressContextOptions) {
  return {
    req,
    res,
    user: req.user ?? null,
  };
}

export type TrpcContext = Awaited<ReturnType<typeof createContext>>;
