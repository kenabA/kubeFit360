import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatTime } from "@/lib/utils";
import Status from "@/system/components/status/Status";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { TEquipmentsData } from "./type";

export default function ColumnDefinition(
  setSelectedIds: React.Dispatch<React.SetStateAction<string>>,
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>
): ColumnDef<TEquipmentsData>[] {
  // Toggle the selection of a single row
  const toggleRowSelection = (id: string) => {
    // setSelectedIds((prev) =>
    //   prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id]
    // );
    setSelectedIds(id);
  };

  // Toggle selection for all rows
  // const toggleAllRows = (data: TEquipmentsData[]) => {
  //   setSelectedIds((prev) =>
  //     prev.length === data.length ? [] : data.map((row) => row._id)
  //   );
  // };

  // Return column definitions
  return [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <div className="flex items-center pl-[30px]">
    //       <CustomCheckbox
    //         checked={
    //           selectedIds.length === table.getRowModel().rows.length &&
    //           table.getRowModel().rows.length > 0
    //         }
    //         handleOnChange={() =>
    //           toggleAllRows(table.getRowModel().rows.map((row) => row.original))
    //         }
    //       />
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <div className="flex items-center pl-[30px]">
    //       <CustomCheckbox
    //         checked={selectedIds.includes(row.original._id)}
    //         handleOnChange={() => toggleRowSelection(row.original._id)}
    //       />
    //     </div>
    //   ),
    // },
    {
      accessorKey: "equipmentName",
      header: () => <span className="pl-[30px]">Equipment Name</span>,
      cell: ({ row }) => (
        <span className="text-gray flex items-center gap-3 pl-[30px]">
          <figure className="size-[30px] rounded-full bg-secondary"></figure>
          {row.original.equipmentName || "--"}
        </span>
      ),
    },
    {
      accessorKey: "serialNumber",
      header: "Serial Number",
      cell: ({ row }) => <span>{row.original.serialNumber || "--"}</span>,
    },
    {
      accessorKey: "brandName",
      header: "Brand Name",
      cell: ({ row }) => <span>{row.original.brandName || "--"}</span>,
    },
    {
      accessorKey: "installationDate",
      header: "Installation Date",
      cell: ({ row }) => (
        <span>{formatTime(row.original.installationDate) || "--"}</span>
      ),
    },
    {
      accessorKey: "category",
      enableSorting: false,
      header: "Category",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.category || "--"}</span>
      ),
    },
    {
      accessorKey: "status",
      enableSorting: false,
      header: "Status",
      cell: ({ row }) => <Status status={row.original.status} />,
    },
    {
      accessorKey: "actions",
      enableSorting: false,
      header: "",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger className="cursor-pointer" asChild>
            <EllipsisVertical className="text-gray-tertiary size-5" />
          </PopoverTrigger>
          <PopoverContent
            sideOffset={10}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="flex rounded-[8px] shadow-general flex-col gap-3 p-3 w-[120px]"
          >
            <button className="flex items-center gap-[6px] group cursor-pointer">
              <Icon
                icon={"ri:eye-line"}
                className="text-gray-tertiary group-hover:text-gray"
              />
              <span className="text-gray-tertiary group-hover:text-gray font-medium">
                View
              </span>
            </button>

            <button
              className="flex items-center gap-[6px] group"
              onClick={() => {
                toggleRowSelection(row.original._id);
                setOpenEdit(true);
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
              onClick={() => {
                toggleRowSelection(row.original._id);
                setOpenDelete(true);
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
      ),
    },
  ];
}
