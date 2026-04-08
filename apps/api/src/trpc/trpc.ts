import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { type Role } from "@magnence/types";
import { type TrpcContext } from "./context.js";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});

const hasRole = (roles: Role[]) =>
  t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!roles.includes(ctx.user.role)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({ ctx });
  });

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(hasRole(["ADMIN", "SUPER_ADMIN"]));
export const clientProcedure = t.procedure.use(hasRole(["CLIENT"]));
