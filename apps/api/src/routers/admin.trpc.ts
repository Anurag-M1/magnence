import { paginationInputSchema } from "@magnence/types";
import { z } from "zod";
import { listLeads } from "../services/lead.service.js";
import { adminProcedure, router } from "../trpc/trpc.js";

export const adminRouter = router({
  leads: adminProcedure.input(paginationInputSchema).query(async ({ input }) => {
    return listLeads(input.page, input.limit, input.search);
  }),

  analytics: adminProcedure.query(async () => {
    return {
      monthlyRevenue: 0,
      conversionRate: 0,
      activeProjects: 0,
      appointmentBookingRate: 0,
    };
  }),

  updateLeadStatus: adminProcedure
    .input(z.object({ id: z.string().cuid(), status: z.string().min(2).max(32) }))
    .mutation(async () => {
      return { success: true };
    }),
});
