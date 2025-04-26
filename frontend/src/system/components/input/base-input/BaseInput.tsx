import { Input } from "@/components";
import { useState } from "react";
import { TBaseInputProps } from "./types";
import { FieldValues, Path } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";

export function BaseInput<T extends FieldValues>({
  label,
  type,
  name,
  register,
  placeholder,
  disabled = false,
  error,
  allowPastDate,
}: TBaseInputProps<T>) {
  const [hidden, setHidden] = useState<boolean>(true);

  // Calculate today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col w-full">
      <div className="group relative w-full flex flex-col gap-2">
        <label
          htmlFor={label}
          className={`text-sm text-gray-tertiary font-normal w-fit`}
        >
          {label}
        </label>
        <Input
          disabled={disabled}
          className="w-full rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]"
          id={label}
          type={type === "password" ? (hidden ? "password" : "text") : type}
          placeholder={placeholder}
          min={type === "date" && !allowPastDate ? today : undefined}
          {...register(name as Path<T>)}
        />

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

export default BaseInput;
