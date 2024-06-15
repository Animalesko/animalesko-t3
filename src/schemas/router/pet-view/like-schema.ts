import { z } from "zod";

export const likeSchema = z.object({
  petId: z.string(),
});
