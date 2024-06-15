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
import AnimaleskoLogo from "~/assets/images/logo-extended-bg-red.png";
import { UserBadgeCard } from "../../molecular/user-badge-card/UserBadgeCard";
import { useRouter } from "next/router";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({ children }) => {
  const { data } = useSession();

  const { push } = useRouter();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-orange-100">
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
                        }).catch(console.error);
                      }

                      if (key === "meus-pets") {
                        push("/meus-pets").catch(console.error);
                      }

                      if (key === "cadastro-pet") {
                        push("/pets/cadastro").catch(console.error);
                      }
                    }}
                  >
                    <DropdownItem key="meus-pets">
                      Meus pets
                    </DropdownItem>
                    <DropdownItem key="cadastro-pet">
                      Cadastrar pet
                    </DropdownItem>
                    <DropdownItem key="sign-out">Sign out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            )}
            <NavbarItem></NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="flex w-full max-w-5xl flex-col">{children}</div>
      </main>
    </>
  );
};
