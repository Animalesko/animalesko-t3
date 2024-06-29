import React, { forwardRef, useCallback } from "react";
import { CameraIcon, Trash2Icon } from "lucide-react";
import { type ClassNameValue } from "tailwind-merge";
import { cn } from "~/utils/styles/cn";
import imageCompression from "browser-image-compression";

type InputProps = {
  containerClassName?: ClassNameValue;
  onFileChange?: (file?: File, fileType?: string) => void;
  currentFile?: File;
  takePhotoMobile?: boolean;
  mediaType?: "image" | "video" | "document";
} & React.InputHTMLAttributes<HTMLButtonElement>;

export const InputFile = forwardRef<HTMLButtonElement, InputProps>(
  (
    {
      containerClassName,
      currentFile,
      onFileChange,
      placeholder,
      takePhotoMobile,
      mediaType = "image",
      accept,
    },
    ref,
  ) => {
    const onClick = useCallback(() => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      if (takePhotoMobile) {
        input.capture = "environment";
      }

      input.onchange = async (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file !== undefined) {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            useWebWorker: true,
          });

          onFileChange?.(compressedFile);
        }
      };
      input.click();
    }, [onFileChange]);

    const onRemove = useCallback(() => {
      onFileChange?.(undefined);
    }, [onFileChange]);

    return (
      <div
        className={cn(
          "relative col-span-12 w-full lg:col-span-6",
          containerClassName,
        )}
      >
        {/* Show current file thumbnail, name, size and type if exists. */}
        {currentFile !== undefined ? (
          <div className="relative w-full">
            <img
              src={URL.createObjectURL(currentFile)}
              alt={currentFile.name}
              className="h-auto w-full rounded-md object-cover"
            />

            <div className="absolute right-3 top-2 z-10">
              <button
                onClick={onRemove}
                type="button"
                className="hover:bg-status-error rounded-full bg-white p-2 hover:text-white"
              >
                <Trash2Icon />
              </button>
            </div>
          </div>
        ) : (
          <button
            ref={ref}
            type="button"
            className="w-full rounded-xl border-1 border-black bg-secondary-200 p-2"
            onClick={onClick}
          >
            Selecionar foto
          </button>
        )}
      </div>
    );
  },
);

InputFile.displayName = "InputFile";
