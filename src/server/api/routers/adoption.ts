import { updateCoins } from "~/use-cases/wallet/update-coins";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

export const adoptionRouter = createTRPCRouter({
  findByPetId: protectedProcedure
    .input(
      z.object({
        petId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const petContact = await ctx.db.petContactBought.findFirst({
        where: {
          petId: input.petId,
          userId: ctx.session.user.id,
        },

        include: {
          pet: true,
        },
      });

      return petContact;
    }),

  checkAvailableContact: protectedProcedure
    .input(
      z.object({
        petId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const existingContactBought = await ctx.db.petContactBought.findFirst({
        where: {
          userId: ctx.session.user.id,
          petId: input.petId,
        },
      });

      if (existingContactBought) {
        return false;
      }

      const pet = await ctx.db.pet.findFirst({
        where: { id: input.petId },
        include: {
          owner: {
            include: {
              UserProfile: true,
            },
          },
        },
      });

      const email = pet?.owner.email;
      const phone = pet?.owner.UserProfile[0]?.phone;

      if (!email || !phone) {
        return false;
      }

      return true;
    }),

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

      return await ctx.db.pet.update({
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
      return await ctx.db.$transaction(async (tx) => {
        const existingContactBought = await tx.petContactBought.findFirst({
          where: {
            userId: ctx.session.user.id,
            petId: input.petId,
          },
        });

        if (existingContactBought) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Already bought this contact",
          });
        }

        const pet = await tx.pet.update({
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
          prisma: tx as PrismaClient,
          data: {
            quantity: -env.ANNOUNCE_LESKOINS_PRICE,
            userId: ctx.session.user.id,
          },
        });

        await tx.petContactBought.create({
          data: {
            petId: pet.id,
            userId: ctx.session.user.id,

            phone,
            email,
          },
        });

        return {
          email,
          phone,
        };
      });
    }),
});
