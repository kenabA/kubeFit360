import { cn, formatTime } from "@/lib/utils";
import Status from "@/system/components/status/Status";

import { ColumnDef } from "@tanstack/react-table";
import { TSignUpRequests } from "./useGetSignUpRequests";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import TooltipAction from "@/components/tooltip-action/tooltip";

export default function ColumnDefinition(
  setSelectedIds: React.Dispatch<React.SetStateAction<string>>,
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
  setDialogTheme: React.Dispatch<
    React.SetStateAction<"success" | "destructive" | "warn" | "info">
  >
): ColumnDef<TSignUpRequests>[] {
  const toggleRowSelection = (id: string) => {
    setSelectedIds(id);
  };

  return [
    {
      accessorKey: "name",
      header: () => <span className="pl-[30px]">Requestor's Name</span>,
      cell: ({ row }) => (
        <span className="text-gray flex items-center gap-3 pl-[30px]">
          <figure className="size-[30px] rounded-full border-[1px] border-primary bg-secondary overflow-hidden shadow-button ">
            {
              <div className="bg-tertiary size-full text-primary font-bold text-sm text-center items-center justify-center flex">
                {row.original.name.split(" ")[0][0] || "--"}
              </div>
            }
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Status status={row.original.status} />,
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
      accessorKey: "createdAt",
      enableSorting: false,
      header: "Requested At",
      cell: ({ row }) => (
        <span>{formatTime(row.original.createdAt) || "--"}</span>
      ),
    },
    {
      accessorKey: "actions",
      enableSorting: false,
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <TooltipAction
              disabled={row.original.status !== "pending"}
              title="Approve"
              key={"approve"}
              className="bg-success text-success-foreground"
              triangleClassName="fill-[hsl(var(--success))]"
            >
              <button
                role="button"
                disabled={row.original.status !== "pending"}
                onClick={() => {
                  toggleRowSelection(row.original._id);
                  setDialogTheme("success");
                  setOpenDialog(true);
                }}
                className={cn(
                  "flex items-center gap-[4px] group cursor-pointer bg-success-light border-success border rounded-[12px] p-[6px] !disabled:cursor-not-allowed",
                  row.original.status === "pending"
                    ? "transition-transform hover:-translate-y-1"
                    : "pointer-events-none bg-[#F7FEF9] border-[#B1D5AA]"
                )}
              >
                <Check
                  className={cn(
                    "group-hover:text-success-hover",
                    row.original.status === "pending"
                      ? "text-success"
                      : "text-[#B1D5AA]"
                  )}
                  size={16}
                />
              </button>
            </TooltipAction>
            <TooltipAction
              disabled={row.original.status !== "pending"}
              title="Reject"
              key={"reject"}
              className="bg-destructive text-destructive-foreground"
              triangleClassName="fill-[hsl(var(--destructive))]"
            >
              <button
                disabled={row.original.status !== "pending"}
                onClick={() => {
                  toggleRowSelection(row.original._id);
                  setDialogTheme("destructive");
                  setOpenDialog(true);
                }}
                className={cn(
                  "flex items-center  gap-[4px] group  cursor-pointer bg-destructive-light border-destructive border rounded-[12px] p-[6px] hover:text-destructive-hover",
                  row.original.status === "pending"
                    ? "transition-transform hover:-translate-y-1"
                    : "pointer-events-none bg-[#FDF5F5] border-[#EAA69F]"
                )}
              >
                <X
                  className={cn(
                    "text-destructive group-hover:text-destructive-hover",
                    row.original.status === "pending"
                      ? "text-destructive"
                      : "text-[#EAA69F]"
                  )}
                  size={16}
                />
              </button>
            </TooltipAction>
          </div>
        );
      },
    },
  ];
}
