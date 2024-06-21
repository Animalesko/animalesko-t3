import { PrismaClient } from "@prisma/client";
import { ChargeCompletedData } from "~/schemas/webhook/open-pix/charge-completed";
import { updateCoins } from "../wallet/update-coins";
import { calcLeskoinValue } from "../wallet/calc-leskoin-value";

interface reconChargeProps {
  data: ChargeCompletedData;
  prisma: PrismaClient;
}

export const reconCharge = async ({ data, prisma }: reconChargeProps) => {
  const existingCharge = await prisma.openPixCharges.findFirst({
    where: {
      chargeCorrelationID: data.charge.correlationID,
      customerCorrelationID: data.charge.customer.correlationID,
      value: data.charge.value,
    },

    include: {
      user: { include: { Wallet: true } },
    },
  });

  if (!existingCharge) {
    console.error("Failed to find correlated charge to credit leskoin.");

    await prisma.openPixFailedChargeCompleted.create({
      data: {
        value: data.charge.value,
        name: data.charge.customer.name,
        email: data.charge.customer.email,

        chargeCorrelationID: data.charge.correlationID,
        customerCorrelationID: data.charge.customer.correlationID,
      },
    });

    return undefined;
  }

  const quantity = calcLeskoinValue(data.charge.value);

  return await prisma.$transaction(async (tx) => {
    await updateCoins({
      prisma: tx as PrismaClient,
      data: {
        userId: existingCharge.userId,
        quantity,
      },
    });

    return await tx.openPixCharges.update({
      where: {
        id: existingCharge.id,
      },

      data: {
        status: "PAID",
      },
    });
  });
};
