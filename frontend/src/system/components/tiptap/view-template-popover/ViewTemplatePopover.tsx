import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TableButton from "../table-popover/TableButton";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ViewTemplatePopover({
  children,
  handleLoadTemplate,
}: {
  children: React.ReactNode;
  handleLoadTemplate: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={10}
        className="py-2 px-4 rounded-xl shadow-general w-[200px] flex flex-col gap-[10px] border-[1px] border-[#E4E4E7]"
      >
        <div className="flex flex-col gap-3 mb-3">
          <span className="text-xs font-normal text-gray-tertiary capitalize">
            Pre-built Template
          </span>

          <button
            className="flex gap-2 items-center"
            onClick={() => handleLoadTemplate()}
          >
            <Icon
              icon={"tabler:template"}
              className="text-gray-secondary text-[20px]"
            />
            <span className="text-sm text-gray-secondary">
              Table Blue Print
            </span>
          </button>
        </div>
        <div className="flex flex-col gap-3 mb-3">
          <span className="text-xs font-normal text-gray-tertiary capitalize">
            Saved Template
          </span>
          {/* Here, render dynamically and if the length is 0, render the element below */}
          <span className="text-sm text-gray-secondary">None</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
