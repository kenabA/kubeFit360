import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getValidFilters } from "./helpers";
import { TBaseSelect } from "./type";

export default function BaseSelect({
  onClear,
  isCleared,
  setFilters,
  label,
  options,
  className,
}: TBaseSelect) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isCleared) {
      setSelectedValue("");
      onClear();
    }
  }, [isCleared, onClear]);

  useEffect(() => {
    const filterField = searchParams.get(label);
    const valuePresent = options.some((option) => option.value === filterField);

    if (filterField && valuePresent) {
      setSelectedValue(filterField);
      setFilters((filters) => {
        return getValidFilters(label, filters, filterField);
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={label}
        className="text-sm text-gray-tertiary font-normal block capitalize"
      >
        {label}
      </label>
      <Select
        value={selectedValue}
        onValueChange={(newValue) => {
          setSelectedValue(newValue);
          setFilters((filters) => {
            return getValidFilters(label, filters, newValue);
          });
        }}
      >
        <SelectTrigger
          className={cn(
            "focus:ring-gray-tertiary rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm h-[44px]",
            className
          )}
        >
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => {
            return (
              <SelectItem value={opt.value} key={opt.label}>
                <div className="flex gap-2 items-center">
                  {label === "status" && (
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: opt.theme }}
                    ></div>
                  )}
                  <span className="font-medium" style={{ color: opt.theme }}>
                    {opt.label}
                  </span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
