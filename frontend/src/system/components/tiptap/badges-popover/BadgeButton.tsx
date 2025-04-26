import { Editor } from "@tiptap/react";
import { TBadgeColors } from "./data";
import { cn } from "@/lib/utils";

export default function BadgeButton({
  editor,
  badgeData,
}: {
  editor: Editor;
  badgeData: TBadgeColors;
}) {
  return (
    <button
      className="flex gap-2 items-center"
      onClick={() => {
        const isActive = editor.isActive("highlight", {
          color: badgeData.color,
        });

        if (badgeData.name === "remove") {
          editor.chain().focus().unsetHighlight().run();
          editor.chain().unsetColor().run();
        } else {
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: badgeData.color })
            .run();
          if (!isActive) {
            editor.chain().setColor("#fff").run();
          } else {
            editor.chain().unsetColor().run();
          }
        }
      }}
    >
      <div
        className={cn(
          "bg-slate-200 text-xs size-7 rounded-[6px] border-[1px]   flex items-center justify-center text-white",
          badgeData.name !== "remove" ? "text-white" : "text-black"
        )}
        style={{ backgroundColor: badgeData.color }}
      >
        A
      </div>
      <span className="text-sm capitalize">{badgeData.name} Badge</span>
    </button>
  );
}
