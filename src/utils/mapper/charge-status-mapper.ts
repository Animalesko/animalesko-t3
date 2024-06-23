import { OpenPixChargesStatus } from "@prisma/client";

export const chargeStatusMapper: Record<OpenPixChargesStatus, string> = {
  PAID: "Pago",
  PENDING: "Pendente",
};
