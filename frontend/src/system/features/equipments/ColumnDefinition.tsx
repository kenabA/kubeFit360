import CustomCheckbox from "@/system/components/customCheckbox/CustomCheckbox";
import Status from "@/system/components/status/Status";
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";

export type TRecentActivities = {
  id: number;
  activist: string;
  description: string;
  time: string;
};

export type TEquipmentData = {
  _id: string;
  equipmentName: string;
  serialNumber: string;
  installationDate: string;
  status: "active" | "inactive" | "underMaintenance";
  brandName: string;
  lastMaintenance: string;
  category: "strength" | "cardio" | "flexibility";
  description: string;
  equipmentImage: string;
};

export const columnHelper = createColumnHelper<TEquipmentData>();

export default function ColumnDefinition(
  selectedIds: string[],
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
): ColumnDef<TEquipmentData>[] {
  // Toggle the selection of a single row
  const toggleRowSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id]
    );
  };

  // Toggle selection for all rows
  const toggleAllRows = (data: TEquipmentData[]) => {
    setSelectedIds((prev) =>
      prev.length === data.length ? [] : data.map((row) => row._id)
    );
  };

  // Return column definitions
  return [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center pl-[30px]">
          <CustomCheckbox
            checked={
              selectedIds.length === table.getRowModel().rows.length &&
              table.getRowModel().rows.length > 0
            }
            handleOnChange={() =>
              toggleAllRows(table.getRowModel().rows.map((row) => row.original))
            }
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center pl-[30px]">
          <CustomCheckbox
            checked={selectedIds.includes(row.original._id)}
            handleOnChange={() => toggleRowSelection(row.original._id)}
          />
        </div>
      ),
    },

    {
      accessorKey: "equipmentName",
      header: "Equipment Name",
      cell: ({ row }) => (
        <span className="text-gray flex items-center gap-3">
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
      cell: ({ row }) => <span>{row.original.installationDate || "--"}</span>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category || "--"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <Status status={row.original.status} />,
    },
  ];
}
