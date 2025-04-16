import { cn } from "@/lib/utils";

export function CountDown({ expiryDate }: { expiryDate: string }) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffInTime = expiry.getTime() - today.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  if (diffInDays < 0) {
    return;
  }

  let label = "Expiring ";
  let color = "";
  let expiryTime = "";

  if (diffInDays === 0) {
    expiryTime = "Today";
    color = "hsl(var(--destructive))";
  } else if (diffInDays === 1) {
    expiryTime = "Tomorrow";
    color = "hsl(var(--warn))";
  } else {
    label = "Expiring in: ";
    expiryTime = `${diffInDays} Days`;
    color = "hsl(var(--success))";
  }

  return (
    <span className="text-xs text-gray-tertiary font-normal">
      {label}
      <span style={{ color: color }} className={cn("font-semibold")}>
        {expiryTime}
      </span>
    </span>
  );
}
