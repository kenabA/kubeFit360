import { Icon } from "@iconify/react";
import { Input } from "@/components";
import { useState } from "react";
import { TAuthInputProps } from "./types";

export function AuthInput({ label, type, name }: TAuthInputProps) {
  const [hidden, setHidden] = useState<boolean>(true);
  const [isFocusing, setFocusing] = useState<boolean>(false);

  return (
    <div className="group relative w-full">
      <label
        htmlFor={label}
        className={`absolute left-4 top-2 block text-xs font-light ${
          isFocusing ? "text-primary" : "text-gray-tertiary"
        }`}
      >
        {label}
      </label>
      <Input
        name={name}
        className="h-[54px] !w-full rounded-xl border border-slate-300 pb-2 pt-6 px-4 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary !text-sm"
        id={label}
        type={type === "password" ? (hidden ? "password" : "text") : type}
        onFocus={() => {
          setFocusing((val) => !val);
        }}
        // Fires when the user clicks outside the input field
        onBlur={() => setFocusing(false)}
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
      {/* {error && (
        <p className="h-full p-1 text-left text-xs text-red-400">
          {error.message}
        </p>
      )} */}
    </div>
  );
}

export default AuthInput;
