import { Button } from "@/components";
import { useRef } from "react";

import { Plus, Trash2 } from "lucide-react";
import { TBaseImageInputProps } from "./types";
import { cn } from "@/lib/utils";

export default function BaseImageInput({
  isSettings = true,
  handleRemove,
  handleFileChange,
  label,
  type,
  localImage,
  error,
}: TBaseImageInputProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full flex flex-col gap-2">
        <label
          htmlFor={label}
          className={`text-sm text-gray-tertiary font-normal pointer-events-none`}
        >
          {label}
        </label>
        <input
          accept="image/*"
          id={label}
          type={type}
          ref={uploadImageRef}
          hidden={true}
          onChange={handleFileChange}
        />
        <div
          className={cn(
            "cursor-pointer group relative overflow-hidden flex h-[120px] flex-col gap-2 items-center justify-center rounded-[8px]",
            !localImage && "border border-slate-300 border-dashed "
          )}
          onClick={() => uploadImageRef.current?.click()}
        >
          {localImage ? (
            <>
              <figure className="size-full overflow-hidden border border-slate-300 rounded-[8px] relative">
                <img
                  alt="Image of the entity"
                  src={
                    typeof localImage === "string"
                      ? localImage
                      : URL.createObjectURL(localImage as File)
                  }
                  className={cn(
                    "object-center size-full",
                    isSettings ? "object-contain absolute z-10" : "object-cover"
                  )}
                />

                {isSettings && (
                  <img
                    alt="Image of the entity"
                    src={
                      typeof localImage === "string"
                        ? localImage
                        : URL.createObjectURL(localImage as File)
                    }
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-300 filter blur-sm opacity-50"
                    )}
                  />
                )}
              </figure>
              <div className="absolute z-20 inset-0 size-full bg-black bg-opacity-0 transition duration-300 group-hover:bg-opacity-30"></div>
              <Button
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove();
                }}
                variant={"ghost"}
                className="absolute right-1 top-1 hidden h-fit border-primary bg-white p-1 group-hover:block rounded-[4px] z-30"
              >
                <Trash2 className="stroke-primary text-xs" />
              </Button>
            </>
          ) : (
            <>
              <Button type="button" className="w-fit  rounded-[8px] p-[6px]">
                <Plus strokeWidth={3} />
              </Button>
              <div className="flex flex-col gap-1 items-center justify-center">
                <p className="text-gray text-sm">Upload Image</p>
                <span className="text-gray-tertiary font-normal text-xs">
                  Max Upload Size 5 MB
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {error && (
        <p className="h-full p-1 text-left text-xs text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
