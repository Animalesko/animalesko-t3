import { generateUploadUrl } from "~/use-cases/r2/generate-upload-url";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const imagesRouter = createTRPCRouter({
  requestUrl: protectedProcedure.mutation(async ({ ctx }) => {
    const { url, id } = await generateUploadUrl();

    await ctx.db.image.create({
      data: { id },
    });

    return {
      id,
      url,
    };
  }),
});
