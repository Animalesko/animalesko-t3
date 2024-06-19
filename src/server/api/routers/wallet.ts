import { createTRPCRouter, protectedProcedure } from "../trpc";

export const walletRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const wallet = await ctx.db.wallet.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
    });

    return wallet;
  }),
});
