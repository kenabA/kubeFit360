import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import { badgeColors } from "./data";
import BadgeButton from "./BadgeButton";

export default function BadgesPopover({
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
        align="start"
        sideOffset={20}
        className="p-3 rounded-xl shadow-general w-[200px] flex flex-col gap-[10px]"
      >
        <span className="text-gray-tertiary font-normal text-xs">Badges</span>
        {badgeColors.map((badgeData) => (
          <BadgeButton
            key={badgeData.name}
            editor={editor}
            badgeData={badgeData}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}
