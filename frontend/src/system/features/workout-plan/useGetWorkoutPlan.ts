import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TGetWorkoutPlan, TWorkoutPlan } from "./types";
import apiGetWorkoutPlan from "@/system/services/workout-plan/apiGetWorkoutPlan";

function useGetWorkoutPlan({ selectedId, enabled }: TGetWorkoutPlan) {
  // verify the get workout plan in the backend first and then only work forward.
  const { isPending, data, error } = useQuery<TWorkoutPlan, AxiosError>({
    queryFn: () => apiGetWorkoutPlan(selectedId),
    queryKey: ["workoutPlanPlan", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetWorkoutPlan;
