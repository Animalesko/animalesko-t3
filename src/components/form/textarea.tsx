import {
  Textarea as NextInput,
  TextAreaProps as NextInputProps,
} from "@nextui-org/react";
import { forwardRef } from "react";

type TextAreaProps = NextInputProps;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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

TextArea.displayName = "TextArea";
