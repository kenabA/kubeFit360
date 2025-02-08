import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import NoData from "../../no-data/NoData";
import Pagination from "../../pagination/Pagination";

export default function RecentActivities<T>({
  columns,
  data,
  className,
  resultCount,
}: {
  columns: ColumnDef<T>[];
  count: number;
  data: T[];
  className?: string;
  resultCount: number;
}) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("", className)}>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="overflow-y-auto min-w-[700px] w-full divide-y divide-[#E2E7EB] ">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`text-gray-tertiary flex-grow flex-shrink-0 min-w-[20px] font-medium text-sm text-left py-[14px] whitespace-nowrap ${
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
                    className="py-[14px]  flex-grow flex-shrink-0 min-w-[20px] text-gray-tertiary text-sm pr-6 align-top leading-[1.8]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length <= 0 ? (
        <NoData
          description="Get started by creating a new equipment."
          title="No items found"
        />
      ) : (
        <Pagination resultCount={resultCount} />
      )}
    </div>
  );
}
