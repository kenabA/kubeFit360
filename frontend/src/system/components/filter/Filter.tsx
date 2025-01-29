import { Button } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TEntity } from "@/system/global/utils";
import { FilterIcon } from "lucide-react";
import BaseSelect from "../select/base-select/BaseSelect";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

// TO make the filter component not close, simply use the open, setOpenChange and so on to the popover

export default function Filter({ entity }: { entity: TEntity }) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{ field: string; value: string }[]>(
    []
  );
  const [isCleared, setIsCleared] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  function handleApply() {
    if (filters.length <= 0) {
      entity.fields.forEach((field) => searchParams.delete(field.label));
    } else {
      filters.forEach((filter) => {
        searchParams.set(filter.field, filter.value);
      });
    }
    setSearchParams(searchParams);
    setFilterOpen(false);
  }

  const clearFilters = () => {
    setFilters([]);
    setIsCleared(true);
  };

  return (
    <Popover open={filterOpen} onOpenChange={setFilterOpen}>
      <PopoverTrigger asChild className="cursor-pointer group">
        <div className={cn("flex items-center gap-2 px-4 py-2 ")}>
          <FilterIcon className="text-gray-tertiary group-hover:text-gray size-5" />
          <span className="font-normal text-gray-tertiary group-hover:text-gray">
            Filter
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-3 rounded-xl shadow-general"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-tertiary text-sm">Filter</span>
          <Button
            onClick={() => {
              clearFilters();
            }}
            variant={"ghost"}
            className="hover:bg-none hover:text-primary-hover text-primary text-xs font-normal border-b border-primary p-0 rounded-none"
          >
            Clear
          </Button>
        </div>
        <div
          className="flex flex-col gap-3
        mb-4"
        >
          {entity.fields.map((field) => (
            <BaseSelect
              onClear={() => setIsCleared(false)}
              isCleared={isCleared}
              key={field.label}
              setFilters={setFilters}
              className="h-fit"
              label={field.label}
              options={field.options}
            />
          ))}
        </div>

        <Button
          onClick={handleApply}
          className="w-full
          font-medium
          text-sm
         py-2
        "
          variant={"primary"}
        >
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
}
