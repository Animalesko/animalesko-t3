import { forwardRef } from "react";
import {
  Select as NextSelect,
  SelectProps as NextSelectProps,
} from "@nextui-org/react";

type AutocompleteProps = NextSelectProps;

// @ts-expect-error supercast
export const Select: typeof NextSelect = forwardRef<
  HTMLSelectElement,
  AutocompleteProps
>(({ children, ...props }, ref) => {
  return (
    <NextSelect
      labelPlacement="outside"
      {...props}
      isInvalid={!!props.errorMessage}
      ref={ref}
      classNames={{
        base: "col-span-12 lg:col-span-6",
      }}
    >
      {children}
    </NextSelect>
  );
});

// @ts-expect-error supercast
Select.displayName = "Select";
