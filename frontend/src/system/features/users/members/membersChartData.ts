import { ChartConfig } from "@/components";
import { TMembersStats } from "./useMembersAnalytics";
import { TWorkoutPlanStats } from "../../workout-plan/useWorkoutPlanStats";

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

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 405 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

export function getWorkoutPlanChartData(data: TWorkoutPlanStats[]) {
  return data.map((data) => {
    return { month: data.month, workoutPlan: data.plansCreated };
  });
}
