import { prisma } from "@magnence/db";
import { updateProfileSchema } from "@magnence/types";
import { decryptSensitiveValue } from "../lib/security/crypto.js";
import { encryptPhone } from "../services/auth.service.js";
import { protectedProcedure, router } from "../trpc/trpc.js";

export const authRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        phone: true,
        twoFactorEnabled: true,
        phoneEncrypted: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone,
    };
  }),

  updateMe: protectedProcedure.input(updateProfileSchema).mutation(async ({ ctx, input }) => {
    const encryptedPhone = await encryptPhone(input.phone);
    const user = await prisma.user.update({
      where: { id: ctx.user!.id },
      data: {
        name: input.name,
        avatar: input.avatar,
        phone: encryptedPhone.phone,
        phoneEncrypted: encryptedPhone.phoneEncrypted,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        phone: true,
        phoneEncrypted: true,
      },
    });

    return {
      ...user,
      phone: decryptSensitiveValue(user.phoneEncrypted) ?? user.phone,
    };
  }),
});
