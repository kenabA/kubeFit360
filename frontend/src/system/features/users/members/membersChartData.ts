import { ChartConfig } from "@/components";
import { TMembersStats } from "./useMembersAnalytics";

export function getMemberChartData(stats: TMembersStats) {
  const chartData = [
    { status: "active", count: stats.active, fill: "#BA324F" },
    { status: "inactive", count: stats.inactive, fill: "#E18EA0" },
  ];
  return chartData;
}

export const memberChartConfig = {
  active: {
    label: "Active",
    color: "hsl(var(--chart-1))",
  },
  inactive: {
    label: "Inactive",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
