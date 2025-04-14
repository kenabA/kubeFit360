import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TGetWorkoutPlan, TWorkoutPlan } from "./types";
import apiGetWorkoutPlanByMemberId from "@/system/services/workout-plan/apiGetWorkoutPlanByMemberId";

function useGetWorkoutPlanByMemberId({ selectedId, enabled }: TGetWorkoutPlan) {
  // verify the get workout plan in the backend first and then only work forward.
  const { isPending, data, error } = useQuery<TWorkoutPlan, AxiosError>({
    queryFn: () => apiGetWorkoutPlanByMemberId(selectedId),
    queryKey: ["workoutPlan", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetWorkoutPlanByMemberId;
