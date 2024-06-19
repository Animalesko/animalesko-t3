import { PrismaClient } from "@prisma/client";

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
    return await prisma.wallet.create({
      data: {
        userId: data.userId,
        leskoins: data.quantity,
      },
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
