import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultData } from "./data";
import { columns } from "./ColumnDefinition";
import { cn } from "@/lib/utils";

export default function RecentActivities({
  className,
}: {
  className?: string;
}) {
  const table = useReactTable({
    data: defaultData,
    columns: columns,
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
