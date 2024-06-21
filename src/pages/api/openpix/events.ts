import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { chargeCompletedSchema } from "~/schemas/webhook/open-pix/charge-completed";
import { reconCharge } from "~/use-cases/openpix/recon-charge";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const chargeCompletedPayload = chargeCompletedSchema.safeParse(req.body);

  if (!chargeCompletedPayload.success) {
    console.error("Failed to parse payload");

    return res.status(200).json({ message: "Received webhook" });
  }

  const prisma = new PrismaClient();

  await reconCharge({
    prisma,
    data: chargeCompletedPayload.data,
  });

  return res.status(200).json({ message: "Received webhook" });
}
