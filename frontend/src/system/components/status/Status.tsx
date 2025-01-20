import { cn } from "@/lib/utils";

export default function Status({
  status,
}: {
  status: "active" | "inactive" | "underMaintenance";
}) {
  let statusText;
  let primaryColor;
  let secondaryColor;

  switch (status) {
    case "active":
      primaryColor = "hsl(var(--success))";
      secondaryColor = "hsl(var(--success-light))";
      statusText = "available";
      break;
    case "inactive":
      primaryColor = "hsl(var(--destructive))";
      secondaryColor = "hsl(var(--destructive-light))";
      statusText = "unavailable";
      break;
    case "underMaintenance":
      primaryColor = "hsl(var(--primary))";
      secondaryColor = "hsl(var(--warn-light))";
      statusText = "maintenance";
      break;
  }

  return (
    <div
      style={{ backgroundColor: secondaryColor, color: primaryColor }}
      className={cn(
        "capitalize w-fit px-3 py-1 rounded-2xl flex gap-2 items-center",
        primaryColor,
        secondaryColor
      )}
    >
      <div
        style={{ backgroundColor: primaryColor }}
        className="size-[6px] rounded-full"
      ></div>
      {statusText}
    </div>
  );
}
