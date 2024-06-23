import { z } from "zod";

export const chargeCompletedSchema = z.object({
  event: z.enum([
    "OPENPIX:CHARGE_CREATED",
    "OPENPIX:CHARGE_COMPLETED",
    "OPENPIX:CHARGE_EXPIRED",
    "OPENPIX:TRANSACTION_RECEIVED",
    "OPENPIX:TRANSACTION_REFUND_RECEIVED",
    "OPENPIX:MOVEMENT_CONFIRMED",
    "OPENPIX:MOVEMENT_FAILED",
    "OPENPIX:MOVEMENT_REMOVED",
  ]),
  charge: z.object({
    correlationID: z.string(),
    value: z.number(),

    customer: z.object({
      name: z.string(),
      email: z.string(),
    }),
  }),
});

export type ChargeCompletedData = z.infer<typeof chargeCompletedSchema>;
