import { cn } from "@/lib/utils";
import { TriangleIcon } from "lucide-react";

export default function Triangle({ className }: { className?: string }) {
  return (
    <TriangleIcon
      className={cn(
        "stroke-none fill-[hsl(var(--primary))] absolute left-0 -rotate-90 top-1/2 -translate-y-1/2 -translate-x-[45%] z-[1]",
        className
      )}
    />
  );
}
