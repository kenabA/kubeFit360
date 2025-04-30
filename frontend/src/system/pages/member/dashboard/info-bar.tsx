import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function InfoBar({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn("p-1.5 rounded-full bg-accent-light")}>
          <Icon icon={icon} className={cn("text-[24px] text-accent")} />
        </div>
        <span className="text-gray-secondary text-md font-semibold">
          {label}
        </span>
      </div>
      <span className="text-gray-secondary font-normal text-md">{value}</span>
    </div>
  );
}
