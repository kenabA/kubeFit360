import { useMemo } from "react";
import useWorkoutPlanStats from "./useWorkoutPlanStats";
import { getWorkoutPlanChartData } from "../users/members/membersChartData";

export type TMembersStats = {
  active: number;
  inactive: number;
  total: number;
};

export default function useWorkoutPlanAnalytics() {
  const {
    data: { data: workoutPlanStats },
  } = useWorkoutPlanStats();

  const chartData = useMemo(
    () => getWorkoutPlanChartData(workoutPlanStats),
    [workoutPlanStats]
  );

  return { chartData };
}
