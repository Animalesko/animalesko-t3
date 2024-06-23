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

  getLastCharges: protectedProcedure.query(async ({ ctx }) => {
    const charges = ctx.db.openPixCharges.findMany({
      where: { userId: ctx.session.user.id },

      take: 10,
      orderBy: {
        updatedAt: "desc",
      },
    });

    return charges;
  }),

  createCharge: protectedProcedure
    .input(
      z.object({
        priceCents: z.number(),
        leskoins: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { brCode } = await createCharge({
        prisma: ctx.db,
        data: {
          userId: ctx.session.user.id,
          priceCents: input.priceCents,
          leskoins: input.leskoins,
        },
      });

      return {
        brCode,
      };
    }),
});
