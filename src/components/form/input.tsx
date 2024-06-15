import {
  Input as NextInput,
  InputProps as NextInputProps,
} from "@nextui-org/react";
import { forwardRef } from "react";

type InputProps = NextInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return (
      <NextInput
        labelPlacement="outside"
        ref={ref}
        {...props}
        isInvalid={!!props.errorMessage}
        classNames={{
          base: "col-span-12 lg:col-span-6",
        }}
      />
    );
  },
);

Input.displayName = "Input";
