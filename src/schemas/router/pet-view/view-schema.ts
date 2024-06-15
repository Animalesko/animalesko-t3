import { z } from "zod";

export const viewSchema = z.object({
  petId: z.string(),
});
