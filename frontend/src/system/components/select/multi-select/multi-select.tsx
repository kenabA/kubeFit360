"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MultiSelectProps } from "./types";

export function MultiSelect<T extends string>({
  label,
  options,
  selected,
  onChange,
  placeholder,
  className,
  error,
  disabled,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (value: T) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelect = (value: T) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="group relative w-full flex flex-col gap-2">
        <label
          htmlFor={"weekdays"}
          className={`text-sm text-gray-tertiary font-normal w-fit`}
        >
          {label}
        </label>
        <Popover open={open} onOpenChange={setOpen} modal={true}>
          <PopoverTrigger asChild>
            <div
              role="combobox"
              aria-expanded={open}
              className={cn(
                "flex  flex-wrap items-center justify-between  border-input  py-2 ring-offset-background w-full rounded-[8px] border border-slate-300 px-4 focus-visible:ring-1 focus-visible:ring-gray-tertiary  text-sm min-h-[44px] h-fit",
                disabled && "cursor-not-allowed opacity-50 ",
                className
              )}
              onClick={() => !disabled && setOpen(!open)}
            >
              <div className="flex flex-wrap gap-2">
                {selected.length > 0 ? (
                  selected.map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return (
                      <Badge
                        key={value}
                        className="bg-tertiary text-primary border-primary hover:bg-tertiary cursor-default"
                      >
                        {option?.label}
                        <button
                          className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUnselect(value);
                            }
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleUnselect(value);
                          }}
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                          <span className="sr-only">
                            Remove {option?.label}
                          </span>
                        </button>
                      </Badge>
                    );
                  })
                ) : (
                  <span className="text-gray-tertiary">{placeholder}</span>
                )}
              </div>
              <div
                className={cn(
                  "shrink-0 opacity-50",
                  selected.length > 0 && "hidden"
                )}
              >
                ▼
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandList>
                <CommandGroup className="max-h-64 overflow-auto">
                  {options.map((option) => {
                    const isSelected = selected.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12l5 5 9-9" />
                          </svg>
                        </div>
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && (
        <p className="h-full p-1 text-left text-xs text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}
