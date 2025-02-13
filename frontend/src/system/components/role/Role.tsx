import { TRole } from "@/system/lib/types";
import { Icon } from "@iconify/react/dist/iconify.js";

export function Role({ role }: { role: TRole }) {
  let icon;
  switch (role) {
    case "admin":
      icon = "material-symbols:cardio-load";
      break;
    case "maintainer":
      icon = "mdi:worker-outline";
      break;
    case "trainer":
      icon = "lucide:biceps-flexed";
      break;
    case "member":
      icon = "lucide:biceps-flexed";
      break;
  }
  return (
    <div className="flex gap-1 items-center bg-accent-light py-1 px-2 border-accent border-[.5px] rounded-[8px]">
      <Icon icon={icon} className="text-accent text-lg" />
      <span className="text-accent capitalize text-sm font-medium">{role}</span>
    </div>
  );
}
