import Status from "@/system/components/status/Status";

import { ColumnDef } from "@tanstack/react-table";

import { Dispatch, SetStateAction } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { formatTime } from "@/lib/utils";
import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUserDetails } from "@/system/stores/user/types";

export default function ColumnDefinition(
  setSelectedIds: React.Dispatch<React.SetStateAction<string>>,
  setOpenDelete: Dispatch<SetStateAction<boolean>>,
  setOpenView: Dispatch<SetStateAction<boolean>>
): ColumnDef<TWorkoutPlanRequest>[] {
  const toggleRowSelection = (id: string) => {
    setSelectedIds(id);
  };

  const user = useAuthUser<TUserDetails>();

  // Return column definitions
  return [
    {
      accessorKey: "name",
      header: () => <span className="pl-[30px]">Full Name</span>,
      cell: ({ row }) => (
        <span className="text-gray flex items-center gap-3 pl-[30px]">
          <figure className="size-[30px] rounded-full border-[1px] border-primary bg-secondary overflow-hidden shadow-button ">
            {row.original.member.userImage ? (
              <img
                className="size-full object-cover object-center"
                src={row.original.member.userImage}
                alt="An icon of the maintainer"
              />
            ) : (
              <>
                <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
                  {row.original.member.name.split(" ")[0][0] || "--"}
                </div>
              </>
            )}
          </figure>
          {row.original.member.name || "--"}
        </span>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.member.gender || "--"}</span>
      ),
    },
    {
      accessorKey: "fitnessLevel",
      header: "Fitness Level",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.fitnessLevel || "--"}</span>
      ),
    },
    {
      accessorKey: "requestedAt",
      header: "Requested At",
      cell: ({ row }) => (
        <span>{formatTime(row.original.createdAt) || "--"}</span>
      ),
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
      cell: ({ row }) => (
        <span>
          {row.original.trainer._id === user?._id
            ? "You"
            : row.original.trainer.name || "--"}
        </span>
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
