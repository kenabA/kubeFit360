import { ChartConfig } from "@/components/ui/chart";

export const chartData = [
  { status: "available", count: 275, fill: "#E67E22" },
  { status: "unavailable", count: 275, fill: "#ED9E5A" },
  { status: "underMaintenance", count: 275, fill: "#F3BF91" },
];
export const chartConfig = {
  available: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  unavailable: {
    label: "Unavailable",
    color: "hsl(var(--chart-2))",
  },
  underMaintenance: {
    label: "Under Maintenance",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;
