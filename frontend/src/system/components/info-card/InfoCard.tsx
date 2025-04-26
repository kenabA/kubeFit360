import { cn } from "@/lib/utils";
import { TInfoCard } from "./type";

export default function InfoCard({
  icon,
  label,
  value,
  type = "standard",
  className,
}: TInfoCard) {
  return (
    <div className={cn("flex gap-2 items-center", className)}>
      {icon}
      <div
        className={cn(
          "flex flex-col w-full",
          !(type === "standard") ? "gap-2" : "gap-1"
        )}
      >
        <label className="capitalize text-slate-400 text-xs">{label}</label>

        {type === "list" && (
          <ul className="list-disc ml-4 space-y-1">
            {Array.isArray(value) &&
              value.map((val, index) => (
                <li
                  key={index}
                  className="text-gray-secondary text-sm font-semibold capitalize"
                >
                  {val}
                </li>
              ))}
          </ul>
        )}

        {type === "standard" && (
          <span className="text-gray-secondary text-sm font-semibold capitalize">
            {value}
          </span>
        )}

        {type === "description" && (
          <div className="bg-white border w-[calc(100%+27px)] py-2 px-4 rounded-[8px] -ms-[27px] mt-1">
            <span className="text-gray-secondary text-sm font-normal">
              {value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
