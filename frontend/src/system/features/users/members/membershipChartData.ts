import { ChartConfig } from "@/components";
import { TMembershipStats } from "./useMembersAnalytics";

export function getMembershipChartData(stats: TMembershipStats) {
  const chartData = [
    { status: "basic", count: stats.basic, fill: "#1A5E63" },
    { status: "enterprise", count: stats.enterprise, fill: "#7FD7DC" },
  ];
  return chartData;
}

export const membershipChartConfig = {
  basic: {
    label: "Basic",
    color: "hsl(var(--chart-1))",
  },
  enterprise: {
    label: "Enterprise",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
