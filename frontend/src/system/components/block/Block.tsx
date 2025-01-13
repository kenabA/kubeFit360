import { Heading } from "@/components/heading/Heading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { TBlockType } from "./type";
import { cn } from "@/lib/utils";
import { themeStyles } from "./helper";

export default function ({
  title,
  icon,
  data,
  total,
  theme,
  type,
}: TBlockType) {
  return (
    <div className="bg-white shadow-general py-3 px-6 rounded-2xl">
      <div className="flex justify-between w-full">
        <span className="capitalize block text-gray-tertiary">{title}</span>
        <div
          className={cn(
            "text-[24px]  p-2 rounded-full",
            themeStyles[theme].light
          )}
        >
          <Icon
            icon={icon}
            className={cn("text-[24px]", themeStyles[theme].base)}
          />
        </div>
      </div>
      {type === "numeric" && (
        <Heading variant={"quinary"}>
          {data}{" "}
          <span className="text-sm text-gray-tertiary font-normal">
            / {total}
          </span>
        </Heading>
      )}
    </div>
  );
}
