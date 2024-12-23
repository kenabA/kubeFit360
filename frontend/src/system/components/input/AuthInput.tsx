import { Icon } from "@iconify/react";
import { Input } from "@/components";
import { useState } from "react";
import { TAuthInputProps } from "./types";
import { FieldValues, Path } from "react-hook-form";

export function AuthInput<T extends FieldValues>({
  label,
  type,
  name,
  register,
  error,
}: TAuthInputProps<T>) {
  const [hidden, setHidden] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full">
      <div className="group relative w-full">
        <Input
          className="h-[54px] !w-full peer rounded-xl border border-slate-300 py-2 px-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary !text-[16px]"
          id={label}
          type={type === "password" ? (hidden ? "password" : "text") : type}
          placeholder=""
          {...register(name as Path<T>)}
        />
        <label
          htmlFor={label}
          className={`absolute bg-zinc-50 text-xs text-gray-tertiary transition-all pointer-events-none top-0 -translate-y-1/2 left-2  font-light peer-placeholder-shown:text-[16px] peer-placeholder-shown:top-1/2 px-2 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-primary peer-focus:top-0 peer-focus:text-xs`}
        >
          {label}
        </label>

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

export default AuthInput;
