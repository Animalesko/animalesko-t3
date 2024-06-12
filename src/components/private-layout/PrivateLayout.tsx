"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import AnimaleskoLogo from "~/assets/images/logo-extended.png";
import { UserBadgeCard } from "../user-badge-card/UserBadgeCard";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { data } = useSession();

  return (
    <>
      <Navbar className="bg-primary-900 flex flex-row items-center p-2">
        <NavbarBrand>
          <Image
            src={AnimaleskoLogo}
            width={300}
            height={24}
            alt="animalesko-logo"
          />
        </NavbarBrand>

        <NavbarContent justify="end">
          {!!data?.user && (
            <NavbarItem>
              <UserBadgeCard user={data.user} />
            </NavbarItem>
          )}
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              Sign out
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex items-center">
        <div className="flex max-w-5xl flex-col">{children}</div>
      </main>
    </>
  );
};
