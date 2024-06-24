import { petsRouter } from "~/server/api/routers/pets";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { petviewsRouter } from "./routers/pet-views";
import { userProfileRouter } from "./routers/user-profile";
import { adoptionRouter } from "./routers/adoption";
import { walletRouter } from "./routers/wallet";
import { imagesRouter } from "./routers/images";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pets: petsRouter,
  petviews: petviewsRouter,
  userProfile: userProfileRouter,
  adoption: adoptionRouter,
  wallet: walletRouter,
  images: imagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
