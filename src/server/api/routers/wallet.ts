import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createCharge } from "~/use-cases/openpix/create-charge";

export const walletRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const wallet = await ctx.db.wallet.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
    });

    return wallet;
  }),

  createCharge: protectedProcedure
    .input(
      z.object({
        valueCents: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { brCode } = await createCharge({
        prisma: ctx.db,
        data: { userId: ctx.session.user.id, valueCents: input.valueCents },
      });

      return {
        brCode,
      };
    }),
});
