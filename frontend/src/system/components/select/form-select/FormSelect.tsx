import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TFormSelect } from "./type";

export default function FormSelect({ field, label, options }: TFormSelect) {
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
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => {
            return (
              <SelectItem value={opt.value} key={opt.label}>
                <div className="flex gap-2 items-center">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: opt.theme }}
                  ></div>
                  <span className="font-medium" style={{ color: opt.theme }}>
                    {opt.label}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
