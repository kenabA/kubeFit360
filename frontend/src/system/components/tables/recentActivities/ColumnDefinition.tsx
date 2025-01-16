import { createColumnHelper } from "@tanstack/react-table";

// Define your row shape
export type TRecentActivities = {
  id: number;
  activist: string;
  description: string;
  time: string;
};

const columnHelper = createColumnHelper<TRecentActivities>();

export const columns = [
  columnHelper.accessor("id", {
    header: () => <span>ID</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("activist", {
    header: () => <span>Activist</span>,
    cell: (info) => (
      <span className="text-gray whitespace-nowrap">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("description", {
    header: () => <span>Description</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("time", {
    header: () => <span>Time</span>,
    cell: (info) => (
      <span className="whitespace-nowrap">{info.getValue()}</span>
    ),
  }),
];
