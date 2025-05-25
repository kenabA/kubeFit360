import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TFormSelect } from "./type";
import { cn } from "@/lib/utils";
import ectomorph from "@/assets/system/svg/ectomorph.svg";
import endomorph from "@/assets/system/svg/endomorph.svg";
import mesomorph from "@/assets/system/svg/mesomorph.svg";
import { Badge } from "@/components/ui/badge";

export default function FormSelect({
  field,
  label,
  error,
  options,
  placeholder,
}: TFormSelect) {
  return (
    <>
      <label
        htmlFor={label}
        className="text-sm text-gray-tertiary font-normal mb-2 block capitalize"
      >
        {label}
      </label>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className="focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => {
            return (
              <SelectItem
                value={opt.value}
                key={opt.label}
                className={cn("cursor-pointer relative !flex !flex-row")}
                disabled={(opt as any).availability === "inactive"}
              >
                <div className="flex gap-2 items-center">
                  {opt.theme && (
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: opt.theme }}
                    ></div>
                  )}
                  {opt.label === "Ectomorph" ||
                  opt.label === "Mesomorph" ||
                  opt.label === "Endomorph" ? (
                    <span
                      className="font-medium flex gap-1 items-center"
                      style={{ color: opt.theme }}
                    >
                      <img
                        src={
                          opt.label === "Ectomorph"
                            ? ectomorph
                            : opt.label === "Mesomorph"
                            ? mesomorph
                            : opt.label === "Endomorph"
                            ? endomorph
                            : ""
                        }
                        className=""
                        alt={opt.label}
                      />
                      {opt.label}
                    </span>
                  ) : (
                    <span className="font-medium" style={{ color: opt.theme }}>
                      {opt.label}
                    </span>
                  )}
                </div>
                {(opt as any).availability === "inactive" && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <Badge variant={(opt as any).availability}>
                      {(opt as any).availability}
                    </Badge>
                  </div>
                )}
              </SelectItem>
            );
          })}
        </SelectContent>
        {error && (
          <p className="h-full p-1 text-left text-xs text-red-400">
            {error.message}
          </p>
        )}
      </Select>
    </>
  );
}
