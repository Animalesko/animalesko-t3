import { PrismaClient } from "@prisma/client";
import { OpenPixService } from "~/utils/openpix/openpix-service";
import { v4 } from "uuid";

interface createChargeProps {
  data: {
    userId: string;
    priceCents: number;
    leskoins: number;
  };

  prisma: PrismaClient;
}

export const createCharge = async ({ prisma, data }: createChargeProps) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: data.userId },
  });

  const correlationID = v4();
  const { charge, brCode } = await OpenPixService.createCharge({
    correlationID,
    customer: {
      name: user.name ?? "Sem nome",
      email: user.email ?? "leskoanima@gmail.com",
    },
    value: data.priceCents,
    comment: `Obrigado por comprar leskoins.`,
  });

  const prismaCharge = await prisma.openPixCharges.create({
    data: {
      userId: data.userId,

      value: data.priceCents,
      leskoins: data.leskoins,
      status: "PENDING",
      chargeCorrelationID: charge.correlationID,
    },
  });

  return {
    brCode,
    prismaCharge,
    openPixCharge: charge,
  };
};
