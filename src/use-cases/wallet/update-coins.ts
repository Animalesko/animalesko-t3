import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

interface addCoinsProps {
  prisma: PrismaClient;

  data: {
    userId: string;
    quantity: number;
  };
}

/**
 *  Update coins
 *
 *  Guarantees proper managemente of the wallet leskoins
 *
 */
export const updateCoins = async ({ prisma, data }: addCoinsProps) => {
  const existingWallet = await prisma.wallet.findFirst({
    where: { userId: data.userId },
  });

  if (!existingWallet) {
    if (data.quantity < 0) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "User has no coins available",
      });
    }

    return await prisma.wallet.create({
      data: {
        userId: data.userId,
        leskoins: data.quantity,
      },
    });
  }

  if (existingWallet.leskoins < data.quantity) {
    throw new TRPCError({
      code: "UNPROCESSABLE_CONTENT",
      message: "User has no coins available",
    });
  }

  return await prisma.wallet.update({
    where: {
      id: existingWallet.id,
    },
    data: {
      leskoins: existingWallet.leskoins + data.quantity,
    },
  });
};
