import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { NextUIProvider } from "@nextui-org/react";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextUIProvider>
      <SessionProvider session={session}>
        <main className={GeistSans.className}>
          <Component {...pageProps} />
        </main>
      </SessionProvider>
    </NextUIProvider>
  );
};

export default api.withTRPC(MyApp);
