import { z } from "zod";
import { createPetSchema } from "~/schemas/router/pets/create-pet-schema";
import { paginateSchema } from "~/schemas/router/shared/paginate-schema";

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

  update: protectedProcedure
    .input(
      createPetSchema.extend({
        id: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...payload } = input;

      return await ctx.db.pet.update({
        where: { id },
        data: {
          ...payload,
        },
      });
    }),

  paginateOwned: protectedProcedure
    .input(paginateSchema)
    .query(async ({ ctx, input }) => {
      const [data, total] = await Promise.all([
        ctx.db.pet.findMany({
          where: {
            ownerId: ctx.session.user.id,
          },

          take: input.limit,
          skip: input.limit * (input.page - 1),
        }),

        ctx.db.pet.count({
          where: {
            ownerId: ctx.session.user.id,
          },
        }),
      ]);

      return {
        data,
        total,
      };
    }),

  findById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.pet.findFirst({
        where: { id: input.id },
      });
    }),

  listBreeds: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.petBreed.findMany();
  }),
});
