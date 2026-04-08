import { prisma } from "@magnence/db";
import { clientProcedure, router } from "../trpc/trpc.js";

export const portalRouter = router({
  projects: clientProcedure.query(async ({ ctx }) => {
    return prisma.project.findMany({
      where: { clientId: ctx.user!.id },
      include: {
        tasks: true,
        milestones: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  invoices: clientProcedure.query(async ({ ctx }) => {
    return prisma.invoice.findMany({
      where: { clientId: ctx.user!.id },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
  }),

  appointments: clientProcedure.query(async ({ ctx }) => {
    return prisma.appointment.findMany({
      where: { userId: ctx.user!.id },
      orderBy: { startTime: "asc" },
    });
  }),
});
