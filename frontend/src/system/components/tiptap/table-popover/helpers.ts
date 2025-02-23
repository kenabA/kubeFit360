import { Editor } from "@tiptap/react";

export function handleTableAction(editor: Editor, label: string) {
  if (!editor) return;

  switch (label) {
    case "Insert Table":
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
      break;
    case "Remove Table":
      editor.chain().focus().deleteTable().run();
      break;
    case "Add Row Top":
      editor.chain().focus().addRowBefore().run();
      break;
    case "Add Row Bottom":
      editor.chain().focus().addRowAfter().run();
      break;
    case "Remove Row":
      editor.chain().focus().deleteRow().run();
      break;
    case "Add Column Left":
      editor.chain().focus().addColumnBefore().run();
      break;
    case "Add Column Right":
      editor.chain().focus().addColumnAfter().run();
      break;
    case "Remove Column":
      editor.chain().focus().deleteColumn().run();
      break;
    default:
      console.warn(`No action found for ${label}`);
  }
}
