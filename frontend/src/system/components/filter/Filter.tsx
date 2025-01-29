import { Button } from "@/components";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FilterIcon } from "lucide-react";

export default function Filter() {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        <div className={cn("flex items-center gap-2 px-4 py-2 ")}>
          <FilterIcon className="text-gray-tertiary group-hover:text-gray size-5" />
          <span className="font-normal text-gray-tertiary group-hover:text-gray">
            Filter
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-3"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center">
          <span className="text-gray-tertiary text-md">Filter By:</span>
          <Button
            variant={"ghost"}
            className="hover:bg-none hover:text-primary-hover text-primary text-sm font-normal border-b border-primary p-0 rounded-none"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
