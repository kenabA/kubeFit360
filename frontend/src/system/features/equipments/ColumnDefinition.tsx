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
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUserDetails } from "@/system/stores/user/types";

export default function ColumnDefinition(
  setSelectedIds: React.Dispatch<React.SetStateAction<string>>,
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setOpenView: Dispatch<SetStateAction<boolean>>
): ColumnDef<TEquipmentsData>[] {
  const auth = useAuthUser<TUserDetails>();

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
          <figure className="size-[30px] rounded-full border-[1px] border-primary bg-secondary overflow-hidden shadow-button ">
            {row.original.equipmentImage ? (
              <img
                className="size-full object-cover object-center"
                src={row.original.equipmentImage}
                alt="An icon of the maintainer"
              />
            ) : (
              <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
                <Icon icon="lucide:package" className="size-4" />
              </div>
            )}
          </figure>
          {row.original.equipmentName || "--"}
        </span>
        // <span className="text-gray flex items-center gap-3 pl-[30px]">
        //   <figure className="size-[30px] rounded-full bg-secondary overflow-hidden shadow-button border">
        //     {row.original.equipmentImage ? (
        //       <img
        //         className="size-full object-cover object-center"
        //         src={row.original.equipmentImage}
        //         alt="An icon of the equipment"
        //       />
        //     ) : (
        //       <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
        //         {row.original.equipmentName.split(" ")[0][0] || "--"}
        //       </div>
        //     )}
        //   </figure>
        //   {row.original.equipmentName || "--"}
        // </span>
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
      cell: ({ row }) => {
        return auth?.role === "admin" || auth?.role === "maintainer" ? (
          <Popover>
            <PopoverTrigger className="cursor-pointer" asChild>
              <EllipsisVertical className="text-gray-tertiary size-5" />
            </PopoverTrigger>
            <PopoverContent
              sideOffset={10}
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="flex rounded-[8px] shadow-general flex-col gap-3 p-3 w-[120px]"
            >
              <button
                onClick={() => {
                  toggleRowSelection(row.original._id);
                  setOpenView(true);
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
              {(auth?.role === "admin" || auth?.role === "maintainer") && (
                <>
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
                </>
              )}
            </PopoverContent>
          </Popover>
        ) : (
          <button
            onClick={() => {
              toggleRowSelection(row.original._id);
              setOpenView(true);
            }}
            className="flex items-center gap-[4px] group cursor-pointer"
          >
            <Icon
              icon={"ri:eye-line"}
              className="text-gray-tertiary group-hover:text-gray"
            />
            <span className="text-gray-tertiary group-hover:text-gray font-medium">
              View
            </span>
          </button>
        );
      },
    },
  ];
}
