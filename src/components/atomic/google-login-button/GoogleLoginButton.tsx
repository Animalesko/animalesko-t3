import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

import GoogleGIcon from "~/assets/icons/google-g.png";

interface GoogleLoginButtonProps {
  onClick: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      startContent={
        <Image
          src={GoogleGIcon}
          width={24}
          height={24}
          className="h-6 w-6"
          alt="google-g-icon"
        />
      }
      className="bg-white"
      variant="bordered"
    >
      Entrar com Google
    </Button>
  );
};
