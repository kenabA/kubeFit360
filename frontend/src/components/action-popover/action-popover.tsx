import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Dispatch, SetStateAction } from "react";

export default function ActionPopover({
  children,
  handleSelectId,
  setOpenEdit,
  setOpenDelete,
  setOpenView,
  openActionPopover,
  setOpenActionPopover,
}: {
  children: React.ReactNode;
  handleSelectId: () => void;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  setOpenView?: Dispatch<SetStateAction<boolean>>;
  openActionPopover: boolean;
  setOpenActionPopover: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Popover
      open={openActionPopover}
      onOpenChange={setOpenActionPopover}
      modal={false}
    >
      <PopoverTrigger
        className="cursor-pointer"
        asChild
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onClick={(e) => e.stopPropagation()}
        className="flex  rounded-[8px] shadow-general flex-col gap-3 p-3 w-[120px]"
      >
        {setOpenView && (
          <button
            onClick={() => {
              handleSelectId();
              setOpenView(true);
              setOpenActionPopover(false);
            }}
            className="flex items-center gap-[6px] group cursor-pointer"
          >
            <Icon
              icon={"ri:eye-line"}
              className="text-gray-tertiary group-hover:text-gray"
            />
            <span className="text-gray-tertiary group-hover:text-gray font-medium">
              View
            </span>
          </button>
        )}
        <button
          className="flex items-center gap-[6px] group"
          onClick={(e) => {
            // toggleRowSelection(row.original._id);
            handleSelectId();
            setOpenEdit(true);
            setOpenActionPopover(false);
            e.stopPropagation();
          }}
        >
          <Icon
            icon={"material-symbols:edit-outline"}
            className="text-gray-tertiary group-hover:text-gray"
          />
          <span className="text-gray-tertiary group-hover:text-gray font-medium">
            Edit
          </span>
        </button>

        <button
          className="flex items-center gap-[6px] group"
          onClick={(e) => {
            // toggleRowSelection(row.original._id);
            setOpenDelete(true);
            e.stopPropagation();
          }}
        >
          <Icon
            icon={"lucide:trash-2"}
            className="text-gray-tertiary group-hover:text-gray "
          />
          <span className="text-gray-tertiary  group-hover:text-gray font-medium">
            Delete
          </span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
