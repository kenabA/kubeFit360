import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import NoData from "../../no-data/NoData";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pagination from "../../pagination/Pagination";

export default function GeneralTable<T>({
  resultCount,
  className,
  paginationClassName,
  data,
  columns,
  noDataTitle = "No data found",
  noDataDescription = "Get started by creating a new one.",
}: {
  resultCount: number;
  className?: string;
  paginationClassName?: string;
  data: T[];
  columns: ColumnDef<T>[];
  noDataTitle: string;
  noDataDescription: string;
}) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <div
      className={cn(
        "overflow-auto relative custom-scrollbar flex flex-col h-full pb-[80px]",
        className
      )}
    >
      <table className="w-full min-w-[700px] divide-y divide-[#E2E7EB]">
        <thead className="bg-[#F9F9F9] sticky top-0 w-[calc(100%+6px)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`text-gray-tertiary flex-grow flex-shrink-0 min-w-[20px] font-medium text-sm text-left py-[18px] whitespace-nowrap 
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
        <tbody className="divide-y divide-gray-200 sticky-0 bottom-0">
          {table.getRowModel().rows.map((row) => (
            <tr onClick={row.getToggleSelectedHandler()} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-[12px] text-gray-tertiary flex-grow flex-shrink-0 min-w-[20px] text-sm pr-6 leading-[1.8]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length <= 0 && (
        <NoData
          className="h-full"
          description={noDataDescription}
          title={noDataTitle}
        />
      )}

      {data.length > 0 && (
        <Pagination className={paginationClassName} resultCount={resultCount} />
      )}
    </div>
  );
}
