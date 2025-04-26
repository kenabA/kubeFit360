import { Editor } from "@tiptap/react";

import { TTableItem } from "./data";
import { Icon } from "@iconify/react/dist/iconify.js";
import { handleTableAction } from "./helpers";

export default function TableButton({
  editor,
  tableItem,
}: {
  editor: Editor;
  tableItem: TTableItem;
}) {
  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => handleTableAction(editor, tableItem.label)}
    >
      <Icon icon={tableItem.icon} className="text-gray-secondary text-[20px]" />
      <span className="text-sm text-gray-secondary">{tableItem.label}</span>
    </button>
  );
}
