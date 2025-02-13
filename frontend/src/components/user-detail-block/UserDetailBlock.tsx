import { cn } from "@/lib/utils";

type TUserDetailBlock = {
  icon?: React.ReactElement;
  label: string;
  className?: string;
  value: string | number;
};

export function UserDetailBlock({
  icon,
  label,
  value,
  className,
}: TUserDetailBlock) {
  return (
    <li className={cn("text-gray-secondary font-normal", className)}>
      <div className="flex flex-col max-w-[200px]">
        <div className="flex gap-1 items-center">
          {icon}
          <span className="font-normal text-sm">{label}</span>
        </div>
        <span className="font-semibold text break-words">{value}</span>
      </div>
    </li>
  );
}
