import React from "react";

import {
  Button as NextButton,
  type ButtonProps as NextButtonProps,
} from "@nextui-org/react";
import { tv } from "tailwind-variants";

const buttonTV = tv({
  base: "border border-black rounded-md",
  variants: {
    color: {
      primary: "bg-secondary-200 text-black",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

interface ButtonProps extends NextButtonProps {
  color?: "primary";
}

export const Button: React.FC<ButtonProps> = ({
  color = "primary",
  className,
  ...props
}) => {
  return (
    <NextButton
      {...props}
      className={buttonTV({
        color,
        className,
      })}
    />
  );
};