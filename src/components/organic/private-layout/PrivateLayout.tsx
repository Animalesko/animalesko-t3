"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Progress,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import AnimaleskoLogo from "~/assets/images/logo-extended-bg-red.png";
import { UserBadgeCard } from "../../molecular/user-badge-card/UserBadgeCard";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

interface PrivateLayoutProps {
  children: React.ReactNode;

  isLoading?: boolean;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  children,
  isLoading,
}) => {
  const { data } = useSession();

  const { push } = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const walletQuery = api.wallet.get.useQuery();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center bg-orange-100">
        <Navbar
          className="flex flex-row items-center bg-primary-900 p-2"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent>
            {/* <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            /> */}
            <NavbarBrand>
              <Image
                src={AnimaleskoLogo}
                width={300}
                height={24}
                alt="animalesko-logo"
              />
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent justify="end">
            {!!data?.user && (
              <NavbarItem>
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="h-auto bg-transparent p-0">
                      <UserBadgeCard
                        user={data.user}
                        leskoins={walletQuery.data?.leskoins ?? 0}
                      />
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu
                    onAction={(key) => {
                      if (key === "sign-out") {
                        signOut({
                          callbackUrl: "/",
                        }).catch(console.error);
                      }

                      if (key === "adocao") {
                        push("/pets/adocao").catch(console.error);
                      }

                      if (key === "contatos-adquiridos") {
                        push("/pets/contatos-adquiridos").catch(console.error);
                      }

                      if (key === "meus-pets") {
                        push("/meus-pets").catch(console.error);
                      }

                      if (key === "cadastro-pet") {
                        push("/pets/cadastro").catch(console.error);
                      }

                      if (key === "minha-carteira") {
                        push("/minha-carteira").catch(console.error);
                      }

                      if (key === "meu-perfil") {
                        push("/meu-perfil").catch(console.error);
                      }
                    }}
                  >
                    <DropdownItem key="adocao">Adoção</DropdownItem>
                    <DropdownItem key="contatos-adquiridos">
                      Meus contatos adquiridos
                    </DropdownItem>
                    <DropdownItem key="meus-pets">Meus pets</DropdownItem>
                    <DropdownItem key="cadastro-pet">
                      Cadastrar pet
                    </DropdownItem>
                    <DropdownItem key="meu-perfil">Meu perfil</DropdownItem>
                    <DropdownItem key="minha-carteira">
                      Minha carteira
                    </DropdownItem>
                    <DropdownItem key="sign-out">Sign out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarItem>
            )}
          </NavbarContent>

          {/* TODO: CREATE LEFT SIDE MENU */}
          {/* <NavbarMenu>
            <NavbarMenuItem>
              <Link href="/pets/adocao">Adoção</Link>
            </NavbarMenuItem>
          </NavbarMenu> */}
        </Navbar>

        <div className="flex w-full max-w-5xl flex-col p-2">
          <Progress
            size="sm"
            isIndeterminate={isLoading}
            aria-label="Loading..."
            color="warning"
          />
          {children}
        </div>
      </main>
    </>
  );
};
