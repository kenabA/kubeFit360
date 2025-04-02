import { Separator } from "@/components";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { BubbleMenu, Editor } from "@tiptap/react";
import BadgesPopover from "./badges-popover/BadgesPopover";
import SaveTemplatePopover from "./save-template-popover/SaveTemplatePopover";

export default function BubbleMenuBar({ editor }: { editor: Editor }) {
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className="bubble-menu relative">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("bold") ? "is-active" : ""
          )}
        >
          <Icon icon={"octicon:bold-16"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("italic") ? "is-active" : ""
          )}
        >
          <Icon icon={"tabler:italic"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("underline") ? "is-active" : ""
          )}
        >
          <Icon icon={"majesticons:underline"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("strike") ? "is-active" : ""
          )}
        >
          <Icon icon={"tabler:strikethrough"} className="text-[20px]" />
        </button>
        <Separator
          orientation="vertical"
          className="h-5 bg-secondary w-[0.5px]"
        />
        <BadgesPopover editor={editor}>
          <button
            className={cn(
              "text-xs size-7 rounded-[6px] flex items-center justify-center border-[1px] "
            )}
            style={{
              backgroundColor: editor.getAttributes("highlight").color,
              color: editor.getAttributes("textStyle").color,
            }}
          >
            A
          </button>
        </BadgesPopover>
        <Separator
          orientation="vertical"
          className="h-5 bg-secondary w-[0.5px]"
        />
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("orderedList") ? "is-active" : ""
          )}
        >
          <Icon icon={"f7:list-number"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive("bulletList") ? "is-active" : ""
          )}
        >
          <Icon icon={"proicons:bullet-list"} className="text-[20px]" />
        </button>
        <Separator
          orientation="vertical"
          className="h-5 bg-secondary w-[0.5px]"
        />
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive({ textAlign: "left" }) ? "is-active" : ""
          )}
        >
          <Icon icon={"tabler:align-left"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          )}
        >
          <Icon icon={"tabler:align-center"} className="text-[20px]" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "p-1 rounded-[6px]",
            editor.isActive({ textAlign: "right" }) ? "is-active" : ""
          )}
        >
          <Icon icon={"tabler:align-right"} className="text-[20px]" />
        </button>
        <Separator
          orientation="vertical"
          className="h-5 bg-secondary w-[0.5px]"
        />
        <SaveTemplatePopover>
          <button>
            <Icon
              icon={"material-symbols:save-outline-rounded"}
              className="text-[20px]"
            />
          </button>
        </SaveTemplatePopover>
      </div>
    </BubbleMenu>
  );
}
