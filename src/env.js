import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    ANNOUNCE_LESKOINS_PRICE: z.coerce.number(),
    ANNOUNCEMENT_LESKOINS_PRICE: z.coerce.number(),

    OPEN_PIX_TOKEN: z.string(),
    OPEN_PIX_WEBHOOK_AUTHORIZATION_TOKEN: z.string(),

    LESKOIN_VALUE_CENTS: z.number(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),

    NEXT_PUBLIC_ANNOUNCE_LESKOINS_PRICE: z.coerce.number(),
    NEXT_PUBLIC_ANNOUNCEMENT_LESKOINS_PRICE: z.coerce.number(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    ANNOUNCE_LESKOINS_PRICE: Number(process.env.ANNOUNCE_LESKOINS_PRICE),
    ANNOUNCEMENT_LESKOINS_PRICE: Number(
      process.env.ANNOUNCEMENT_LESKOINS_PRICE,
    ),

    NEXT_PUBLIC_ANNOUNCE_LESKOINS_PRICE: Number(
      process.env.NEXT_PUBLIC_ANNOUNCE_LESKOINS_PRICE,
    ),
    NEXT_PUBLIC_ANNOUNCEMENT_LESKOINS_PRICE: Number(
      process.env.NEXT_PUBLIC_ANNOUNCEMENT_LESKOINS_PRICE,
    ),

    OPEN_PIX_TOKEN: process.env.OPEN_PIX_TOKEN,
    OPEN_PIX_WEBHOOK_AUTHORIZATION_TOKEN:
      process.env.OPEN_PIX_WEBHOOK_AUTHORIZATION_TOKEN,

    LESKOIN_VALUE_CENTS: Number(process.env.LESKOIN_VALUE_CENTS),
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
