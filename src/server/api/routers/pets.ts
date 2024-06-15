import { z } from "zod";
import { createPetSchema } from "~/schemas/router/pets/create-pet-schema";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const petsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createPetSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.pet.create({
        data: {
          ...input,

          ownerId: ctx.session.user.id,
        },
      });
    }),

  listBreeds: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.petBreed.findMany();
  }),
});
