import { createUserProfileSchema } from "~/schemas/router/user-profile/create-user-profile";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userProfileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.userProfile.findFirstOrThrow({
      where: { userId: ctx.session.user.id },
      include: { address: true },
    });
  }),

  upsert: protectedProcedure
    .input(createUserProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { address, ...payload } = input;

      const existingUserProfile = await ctx.db.userProfile.findFirst({
        where: {
          userId: ctx.session.user.id,
        },
      });

      if (!existingUserProfile) {
        const createdAddress = await ctx.db.address.create({
          data: {
            ...address,
          },
        });

        return await ctx.db.userProfile.create({
          data: {
            ...payload,
            userId: ctx.session.user.id,
            addressId: createdAddress.id,
          },

          include: {
            address: true,
          },
        });
      }

      await ctx.db.address.update({
        where: { id: existingUserProfile.addressId },

        data: {
          ...address,
        },
      });

      return await ctx.db.userProfile.update({
        where: { id: existingUserProfile.id },

        data: {
          ...payload,
        },

        include: {
          address: true,
        },
      });
    }),
});
