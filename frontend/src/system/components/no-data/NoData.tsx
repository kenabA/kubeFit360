import { FileIcon } from "lucide-react";

export default function NoData({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-muted/5 py-32 border border-dashed rounded-lg">
      <FileIcon className="size-10 text-gray-tertiary mb-4" />
      <h3 className="text-lg font-medium text-gray-tertiary mb-1">{title}</h3>
      <p className="text-sm text-gray-tertiary mb-4">{description}</p>
    </div>
  );
}
