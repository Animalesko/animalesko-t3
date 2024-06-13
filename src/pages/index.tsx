import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import AnimaleskoLogo from "~/assets/images/logo.png";
import { GoogleLoginButton } from "~/components/google-login-button/GoogleLoginButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Animalesko</title>
        <meta
          name="description"
          content="Vamos ajudar os animais em situação de abandono"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-primary-900 flex min-h-screen flex-col items-center">
        <div className="flex w-full max-w-3xl flex-col items-center lg:flex-row">
          <Image
            src={AnimaleskoLogo}
            height={800}
            width={600}
            alt="animalesko-logo"
            className="w-[560px]"
          />

          <div className="flex flex-col gap-4 rounded-lg p-6">
            <GoogleLoginButton
              onClick={async () => {
                await signIn("google", {
                  callbackUrl: "/adocao",
                });
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
