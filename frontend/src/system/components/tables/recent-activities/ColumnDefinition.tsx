import { API_ROUTES } from "@/config/apiRoutes";
import { formatTime } from "@/lib/utils";
import { TRecentActivities } from "@/system/features/recent-activities/type";
import { ColumnDef } from "@tanstack/react-table";
import { NavLink } from "react-router";
import Status from "../../status/Status";

export default function ColumnDefinition(): ColumnDef<TRecentActivities>[] {
  return [
    {
      accessorKey: "_id",
      header: () => <span>ID</span>,
      cell: ({ row }) => <span>#{row.original?._id.slice(-6) || "--"}</span>,
    },
    {
      accessorKey: "activist",
      enableSorting: false,
      header: () => <span>Activist</span>,
      cell: ({ row }) => (
        <span className="text-gray whitespace-nowrap capitalize">
          {row.original.activist || "--"}
        </span>
      ),
    },
    {
      accessorKey: "description",
      enableSorting: false,
      header: () => <span>Description</span>,
      cell: ({ row }) => (
        <p className="flex items-center gap-1">
          {row.original.entity ? (
            <NavLink
              className="text-primary capitalize underline hover:text-primary-hover transition-colors"
              to={`${API_ROUTES.EQUIPMENTS}/${row.original.entity?._id}`}
            >
              {row.original.entity?.equipmentName}
            </NavLink>
          ) : (
            <span className="text-slate-400">Deleted Eqp</span>
          )}

          {row.original.description || "--"}
          <Status status={row.original.status} />
        </p>
      ),
    },
    {
      accessorKey: "time",
      header: () => <span>Time</span>,
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {formatTime(row.original.time) || "--"}
        </span>
      ),
    },
  ];
}
