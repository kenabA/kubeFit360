import { Inbox } from "lucide-react";

export default function NoData({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-muted/5 py-24  rounded-lg p-4">
      <div className="rounded-full bg-gray-100 p-4 mb-4 border-gray-tertiary">
        <Inbox className="size-10 text-gray-tertiary" />
      </div>
      <h3 className="text-lg font-medium text-gray-tertiary mb-1">{title}</h3>
      <p className="text-sm text-gray-tertiary mb-4">{description}</p>
    </div>
  );
}
