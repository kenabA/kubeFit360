import Status from "@/system/components/status/Status";

import { ColumnDef } from "@tanstack/react-table";

import { Dispatch, SetStateAction } from "react";

import { TClientDetails } from "@/system/stores/user/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { Button } from "@/components";

export default function ColumnDefinition(
  setSelectedIds: React.Dispatch<React.SetStateAction<string>>,
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenExtendMembership: Dispatch<SetStateAction<boolean>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setOpenView: Dispatch<SetStateAction<boolean>>
): ColumnDef<TClientDetails>[] {
  const toggleRowSelection = (id: string) => {
    setSelectedIds(id);
  };

  return [
    {
      accessorKey: "name",
      header: () => <span className="pl-[30px]">Full Name</span>,
      cell: ({ row }) => (
        <span className="text-gray flex items-center gap-3 pl-[30px]">
          <figure className="size-[30px] rounded-full border-[1px] border-primary bg-secondary overflow-hidden shadow-button ">
            {row.original.userImage ? (
              <img
                className="size-full object-cover object-center"
                src={row.original.userImage}
                alt="An icon of the maintainer"
              />
            ) : (
              <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
                {row.original.name.split(" ")[0][0] || "--"}
              </div>
            )}
          </figure>
          {row.original.name || "--"}
        </span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email || "--"}</span>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => <span>+977 {row.original.phoneNumber || "--"}</span>,
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => (
        <span>{formatTime(row.original.joinDate, "MMM dd, yyyy") || "--"}</span>
      ),
    },
    {
      accessorKey: "membershipType",
      enableSorting: false,
      header: "Membership Type",
      cell: ({ row }) => (
        <span className="capitalize">
          <Badge
            variant={
              row.original.membershipType === "basic" ? "secondary" : "gold"
            }
          >
            {row.original.membershipType || "--"}
          </Badge>
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Status
          status={row.original.status}
          passedTextNode={
            row.original.active
              ? "active"
              : !row.original.active
              ? "inactive"
              : ""
          }
        />
      ),
    },
    {
      accessorKey: "membership",
      header: "Membership",
      enableSorting: false,
      cell: ({ row }) => (
        <Button
          onClick={() => {
            toggleRowSelection(row.original._id);
            setOpenExtendMembership(true);
          }}
          variant={"accent"}
          className="px-4 py-1 font-medium"
        >
          Extend
        </Button>
      ),
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
