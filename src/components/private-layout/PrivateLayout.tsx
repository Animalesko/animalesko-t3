"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
      <Navbar className="flex flex-row items-center bg-primary-900 p-2">
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
              <Dropdown>
                <DropdownTrigger>
                  <Button className="h-auto bg-transparent p-0">
                    <UserBadgeCard user={data.user} />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu
                  onAction={(key) => {
                    if (key === "sign-out") {
                      signOut({
                        callbackUrl: "/",
                      });
                    }
                  }}
                >
                  <DropdownItem key="sign-out">Sign out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
          <NavbarItem></NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex flex-col items-center">
        <div className="flex w-full max-w-5xl flex-col bg-primary-500">
          {children}
        </div>
      </main>
    </>
  );
};
