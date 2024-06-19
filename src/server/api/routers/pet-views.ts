import { likeSchema } from "~/schemas/router/pet-view/like-schema";
import { viewSchema } from "~/schemas/router/pet-view/view-schema";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const petviewsRouter = createTRPCRouter({
  next: protectedProcedure.query(async ({ ctx }) => {
    const unseentPet = await ctx.db.pet.findFirst({
      where: {
        PetView: {
          none: {
            userId: ctx.session.user.id,
          },
        },
        announce: true,
      },
    });

    if (unseentPet) {
      return await ctx.db.petView.create({
        data: {
          userId: ctx.session.user.id,
          petId: unseentPet.id,
        },

        include: {
          pet: true,
        },
      });
    }

    const lastSeenPetView = await ctx.db.petView.findFirstOrThrow({
      where: {
        userId: ctx.session.user.id,
        pet: {
          announce: true,
        },
      },
      orderBy: {
        lastSeen: "asc",
      },
      include: {
        pet: true,
      },
    });

    return lastSeenPetView;
  }),

  view: protectedProcedure
    .input(viewSchema)
    .mutation(async ({ ctx, input }) => {
      const existingPetView = await ctx.db.petView.findFirst({
        where: {
          userId: ctx.session.user.id,
          petId: input.petId,
        },
      });

      if (!existingPetView) {
        return await ctx.db.petView.create({
          data: {
            userId: ctx.session.user.id,
            petId: input.petId,
          },
        });
      }

      return await ctx.db.petView.update({
        where: {
          petId_userId: {
            userId: ctx.session.user.id,
            petId: input.petId,
          },
        },
        data: { quantity: existingPetView.quantity + 1 },
      });
    }),

  like: protectedProcedure
    .input(likeSchema)
    .mutation(async ({ ctx, input }) => {
      const existingPetView = await ctx.db.petView.findFirst({
        where: {
          userId: ctx.session.user.id,
          petId: input.petId,
        },
      });

      console.log("existing petview", existingPetView);

      if (!existingPetView) {
        return await ctx.db.petView.create({
          data: {
            userId: ctx.session.user.id,
            petId: input.petId,
            like: true,
          },
        });
      }

      return await ctx.db.petView.update({
        where: {
          id: existingPetView.id,
        },

        data: {
          like: !existingPetView.like,
        },
      });
    }),
});
