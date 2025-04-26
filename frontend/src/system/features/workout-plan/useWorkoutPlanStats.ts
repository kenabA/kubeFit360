import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import apiWorkoutPlanStats from "@/system/services/workout-plan/apiWorkoutPlanStats";

export type TWorkoutPlanStats = {
  month: string;
  year: number;
  plansCreated: number;
};

function useWorkoutPlanStats() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TWorkoutPlanStats[]>, AxiosError>({
    queryFn: () => apiWorkoutPlanStats(),
    queryKey: ["workoutPlanStats"],
  });

  return { data, error };
}

export default useWorkoutPlanStats;
