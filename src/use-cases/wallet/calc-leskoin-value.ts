import { env } from "~/env";

export const calcLeskoinValue = (valueCents: number): number => {
  return Math.round(valueCents / env.LESKOIN_VALUE_CENTS);
};
