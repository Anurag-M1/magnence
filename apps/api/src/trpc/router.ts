import { router } from "./trpc.js";
import { adminRouter } from "../routers/admin.trpc.js";
import { authRouter } from "../routers/auth.trpc.js";
import { portalRouter } from "../routers/portal.trpc.js";
import { publicRouter } from "../routers/public.trpc.js";

export const appRouter = router({
  public: publicRouter,
  auth: authRouter,
  admin: adminRouter,
  portal: portalRouter,
});

export type AppRouter = typeof appRouter;
