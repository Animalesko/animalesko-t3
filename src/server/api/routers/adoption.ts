import { updateCoins } from "~/use-cases/wallet/update-coins";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const adoptionRouter = createTRPCRouter({
  displayAdoption: protectedProcedure
    .input(
      z.object({
        petId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await updateCoins({
        prisma: ctx.db,
        data: {
          quantity: -env.ANNOUNCE_LESKOINS_PRICE,
          userId: ctx.session.user.id,
        },
      });

      await ctx.db.pet.update({
        where: { id: input.petId },
        data: {
          announce: true,
        },
      });
    }),

  requestContact: protectedProcedure
    .input(
      z.object({
        petId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const pet = await ctx.db.pet.update({
        where: { id: input.petId },
        data: {
          announce: false,
        },

        include: {
          owner: {
            include: {
              UserProfile: true,
            },
          },
        },
      });

      const email = pet.owner.email;
      const phone = pet.owner.UserProfile[0]?.phone;

      if (!phone || !email) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Pet owner has incomplete profile.",
        });
      }

      await updateCoins({
        prisma: ctx.db,
        data: {
          quantity: -env.ANNOUNCE_LESKOINS_PRICE,
          userId: ctx.session.user.id,
        },
      });

      return {
        email,
        phone,
      };
    }),
});
