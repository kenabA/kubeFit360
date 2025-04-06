import { Input } from "@/components";
import { useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TBodyMetricsInputProps } from "./types";

export function BodyMetricsInput<T extends FieldValues>({
  label,
  type,
  showLabel = true,
  name,
  register,
  placeholder,
  unitLabel,
  error,
}: TBodyMetricsInputProps<T>) {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full">
      <div className="group relative w-full flex flex-col gap-2">
        {showLabel && (
          <label
            htmlFor={label}
            className={`text-sm text-gray-tertiary font-normal w-fit`}
          >
            {label}
          </label>
        )}
        <div className="flex flex-1 items-center">
          <Input
            className="w-full rounded-[8px] border border-slate-300 rounded-r-none border-r-0 px-4 focus-visible:ring-0   text-sm h-[44px]"
            id={label}
            type={type === "password" ? (hidden ? "password" : "text") : type}
            placeholder={placeholder}
            {...register(name as Path<T>)}
          />
          <div className="cursor-default flex h-[44px] items-center rounded-r-md border border-l-1 bg-slate-50 px-3 text-sm text-gray-tertiary font-medium border-slate-300">
            {unitLabel}
          </div>
        </div>
        {type === "password" && (
          <Icon
            onMouseDown={(e) => e.preventDefault()}
            icon={hidden ? "carbon:view" : "carbon:view-off"}
            className="leading-0 absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-lg z-10"
            onClick={() => {
              setHidden(!hidden);
            }}
          />
        )}
      </div>
      {error && (
        <p className="h-full p-1 text-left text-xs text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
