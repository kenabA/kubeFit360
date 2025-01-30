import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { TRecentActivities } from "@/system/features/recent-activities/type";
import ColumnDefinition from "./ColumnDefinition";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function RecentActivities({
  data,
  className,
}: {
  data: TRecentActivities[];
  className?: string;
}) {
  const table = useReactTable({
    data: data,
    columns: ColumnDefinition(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("", className)}>
      <table className="overflow-y-auto w-full  divide-y divide-[#E2E7EB] ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`text-gray-tertiary  font-medium text-sm text-left py-[14px] whitespace-nowrap ${
                    index === 0 ? "rounded-tl-lg rounded-bl-lg" : ""
                  }
                      ${
                        index === headerGroup.headers.length - 1
                          ? "rounded-tr-lg rounded-br-lg"
                          : ""
                      }`}
                >
                  <div className="flex items-center gap-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getCanSort() && (
                      <Icon
                        className="cursor-pointer"
                        icon={"lucide:arrow-down-up"}
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr className="" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-[14px] text-gray-tertiary text-sm pr-6 align-top leading-[1.8]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
