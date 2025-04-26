import { TTableCategory, TTableItem } from "./data";

import { Editor } from "@tiptap/react";
import TableButton from "./TableButton";

export default function TableControls({
  tableItems,
  editor,
}: {
  tableItems: TTableItem[];
  editor: Editor;
}) {
  const renderCategory = (category: TTableCategory) => {
    return (
      <div className="flex flex-col gap-3 mb-3">
        <span className="text-xs font-normal text-gray-tertiary capitalize">
          {category}
        </span>
        <div className="flex flex-col gap-4">
          {tableItems
            .filter((item) => item.category === category)
            .map((item) => (
              <TableButton key={item.label} tableItem={item} editor={editor} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderCategory("table")}
      {renderCategory("row")}
      {renderCategory("column")}
    </>
  );
}
