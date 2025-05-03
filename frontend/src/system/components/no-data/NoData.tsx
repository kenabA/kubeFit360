import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export default function NoData({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-24 rounded-lg p-4",
        className
      )}
    >
      <div className="rounded-full bg-gray-100 p-4 mb-4 border-gray-tertiary">
        <Inbox className="size-10 text-gray-tertiary" />
      </div>
      <h3 className="text-lg font-medium text-gray-tertiary mb-2">{title}</h3>
      <p className="text-sm text-gray-tertiary mb-4 max-w-[400px] text-center leading-[1.5]">
        {description}
      </p>
    </div>
  );
}
