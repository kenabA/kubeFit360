import Status from "@/system/components/status/Status";
import { createColumnHelper } from "@tanstack/react-table";

// Define your row shape
export type TRecentActivities = {
  id: number;
  activist: string;
  description: string;
  time: string;
};

export type TEquipmentData = {
  equipmentName: string;
  serialNumber: Number;
  installationDate: string;
  status: "active" | "inactive" | "underMaintenance";
  brandName: string;
  lastMaintenance: string;
  category: "strength" | "cardio" | "flexibility";
  description: string;
  equipmentImage: String;
};

const columnHelper = createColumnHelper<TEquipmentData>();

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center ">
        <input
          type="checkbox"
          checked={false}
          // onChange={() =>
          //    toggleAllRows(table.getRowModel().rows.map((row) => row.original))
          // }
          className="cursor-pointer"
          aria-label="Select all rows"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="flex cursor-pointer "
        // onClick={() => toggleRowSelection(row.original.id)}
      >
        <input
          type="checkbox"
          // checked={selectedIds.includes(row.original.id)}
          onClick={(e) => e.stopPropagation()}
          // onChange={() => toggleRowSelection(row.original.id)}
          className="cursor-pointer"
          aria-label={`Select row ${row.original.id}`}
        />
      </div>
    ),
  },
  columnHelper.accessor("equipmentName", {
    header: () => <span>Equipment Name</span>,
    cell: (info) => (
      <span className="text-gray flex items-center gap-3">
        <figure className="size-[30px] rounded-full bg-secondary"></figure>
        {info.getValue() || "--"}
      </span>
    ),
  }),
  columnHelper.accessor("serialNumber", {
    header: () => <span>Serial Number</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("brandName", {
    header: () => <span>Brand Name</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("installationDate", {
    header: () => <span>Installation Date</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("category", {
    header: () => <span>Category</span>,
    cell: (info) => <span>{info.getValue() || "--"}</span>,
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => <Status status={info.getValue()} />,
  }),
];
