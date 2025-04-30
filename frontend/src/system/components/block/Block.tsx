import { Heading } from "@/components/heading/Heading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TBlockType } from "./type";
import { cn } from "@/lib/utils";
import { themeStyles } from "./helper";
import { Calendar } from "@/components";
import { Badge } from "@/components/ui/badge";

export default function ({
  title,
  icon,
  data,
  total,
  theme = "default",
  type,
  children,
  className,
  status,
}: TBlockType) {
  return (
    <div
      className={`${cn(
        " bg-white shadow-general border-slate-100 border py-3 px-6 rounded-2xl h-full",
        className
      )}`}
    >
      <div className="flex justify-between w-full">
        <span className="capitalize block text-gray-tertiary">{title}</span>
        {theme && icon && (
          <div
            className={cn(
              "text-[24px]  p-2 rounded-full",
              themeStyles[theme]?.light
            )}
          >
            <Icon
              icon={icon}
              className={cn("text-[24px]", themeStyles[theme]?.base)}
            />
          </div>
        )}
        {status}
      </div>
      {(type === "numeric" || type === "qualitative") && (
        <Heading
          level={4}
          variant={"quinary"}
          className="flex items-center gap-2"
        >
          {data}{" "}
          {type === "numeric" && (
            <span className="text-sm text-gray-tertiary font-normal">
              / {total}
            </span>
          )}
          {type === "qualitative" && (
            <Badge
              className="text-gray-tertiary text-xs "
              variant={"secondary"}
            >
              Rs. 1500
            </Badge>
          )}
        </Heading>
      )}
      {type === "figure" && children}
      {type === "table" && children}
      {type === "calendar" && <Calendar />}
      {type === "custom" && children}
    </div>
  );
}
