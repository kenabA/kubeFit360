import { formatTime } from "@/lib/utils";
import { TRecentActivities } from "@/system/features/recent-activities/type";
import { ColumnDef } from "@tanstack/react-table";

import Status from "../../status/Status";

export default function ColumnDefinition(
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
): ColumnDef<TRecentActivities>[] {
  function handleEquipmentClick(id: string) {
    setSelectedId?.(id);
    setIsDialogOpen(true);
  }

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
      cell: ({ row }) => {
        const id = row.original.entity?._id;

        return (
          <p className="flex items-center gap-1">
            {row.original.entity ? (
              <button
                className="text-primary capitalize underline hover:text-primary-hover transition-colors"
                onClick={() => handleEquipmentClick(id)}
              >
                {row.original.entity?.equipmentName}
              </button>
            ) : (
              <span className="text-slate-400">Deleted Eqp</span>
            )}

            {row.original.description || "--"}
            <Status status={row.original.status} />
          </p>
        );
      },
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
