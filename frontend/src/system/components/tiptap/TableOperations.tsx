import { Button } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import TablePopover from "./table-popover/TablePopover";
import { Editor } from "@tiptap/react";
import ViewTemplatePopover from "./view-template-popover/ViewTemplatePopover";

export default function TableOperations({
  editor,
  handleLoadTemplate,
  handleClearContent,
}: {
  editor: Editor;
  handleLoadTemplate: () => void;
  handleClearContent: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {editor && editor.getText().trim() !== "" && (
        <Button
          onClick={handleClearContent}
          variant={"outline"}
          className="border-transparent text-slate-600 bg-slate-200 py-1 px-2 hover:border-slate-400-hover hover:text-slate-400-hover font-medium"
        >
          <Icon icon={"ic:round-clear"} className="!size-[20px]" />
        </Button>
      )}
      <ViewTemplatePopover handleLoadTemplate={handleLoadTemplate}>
        <Button
          // onClick={handleLoadTemplate}
          variant={"outline"}
          className="border-accent text-accent bg-accent-light py-1 px-2 hover:border-accent-hover hover:text-accent-hover font-medium"
        >
          <Icon icon={"flowbite:upload-outline"} className="!size-[20px]" />
          Load Template
        </Button>
      </ViewTemplatePopover>
      <TablePopover editor={editor}>
        <Button
          variant={"outline"}
          className="border-accent text-accent bg-accent-light py-1 px-2 hover:border-accent-hover hover:text-accent-hover"
        >
          <Icon icon={"tabler:table"} className="!size-[20px]" />
        </Button>
      </TablePopover>
    </div>
  );
}
