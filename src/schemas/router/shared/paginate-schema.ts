import { z } from "zod";

export const paginateSchema = z.object({
  page: z.number(),
  limit: z.number(),
});
