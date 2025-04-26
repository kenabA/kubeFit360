import { ChartConfig } from "@/components";
import { TEquipmentsStats } from "./type";

export function getEquipmentChartData(stats: TEquipmentsStats) {
  const chartData = [
    { status: "available", count: stats.active, fill: "#E67E22" },
    { status: "unavailable", count: stats.inactive, fill: "#ED9E5A" },
    {
      status: "underMaintenance",
      count: stats.underMaintenance,
      fill: "#F3BF91",
    },
  ];
  return chartData;
}

export const equipmentChartConfig = {
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
