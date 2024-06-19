import { PrismaClient } from "@prisma/client";
import { updateCoins } from "~/use-cases/wallet/update-coins";

const main = async ({
  quantity,
  userId,
}: {
  userId: string;
  quantity: number;
}) => {
  const prisma = new PrismaClient();

  const wallet = await updateCoins({
    prisma,
    data: {
      quantity,
      userId,
    },
  });

  console.log(JSON.stringify(wallet, null, 2));
};

main({
  userId: String(process.argv[2]),
  quantity: Number(process.argv[3]),
}).catch(console.error);
