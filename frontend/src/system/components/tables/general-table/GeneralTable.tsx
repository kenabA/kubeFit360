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
  data,
  columns,
}: {
  resultCount: number;

  className?: string;
  data: T[];
  columns: ColumnDef<T>[];
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
    <div className={cn("overflow-x-auto custom-scrollbar", className)}>
      <table className="overflow-y-auto w-full min-w-[700px] divide-y divide-[#E2E7EB]">
        <thead className="bg-[#F9F9F9]">
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
        <tbody className="divide-y divide-gray-200">
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

      {data.length <= 0 ? (
        <NoData
          description="Get started by creating a new equipment."
          title="No items found"
        />
      ) : (
        <Pagination className="px-6" resultCount={resultCount} />
      )}
    </div>
  );
}
