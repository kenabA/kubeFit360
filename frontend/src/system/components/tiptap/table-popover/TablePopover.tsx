import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import TableControls from "./TableControls";
import { tableItems } from "./data";

export default function TablePopover({
  children,
  editor,
}: {
  children: React.ReactNode;
  editor: Editor;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer group">
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={10}
        className="py-2 px-4 rounded-xl shadow-general w-[200px] flex flex-col gap-[10px] border-[1px] border-[#E4E4E7]"
      >
        <TableControls tableItems={tableItems} editor={editor} />
      </PopoverContent>
    </Popover>
  );
}
