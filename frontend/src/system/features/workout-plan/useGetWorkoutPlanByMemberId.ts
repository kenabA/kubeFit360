import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TGetWorkoutPlan, TWorkoutPlan } from "./types";
import apiGetWorkoutPlanByMemberId from "@/system/services/workout-plan/apiGetWorkoutPlanByMemberId";

function useGetWorkoutPlanByMemberId({ selectedId, enabled }: TGetWorkoutPlan) {
  const { isPending, data, error, isSuccess } = useQuery<
    TWorkoutPlan,
    AxiosError
  >({
    queryFn: () => apiGetWorkoutPlanByMemberId(selectedId),
    queryKey: ["workoutPlan", selectedId],
    enabled: enabled && !!selectedId,
    retry: false,
  });

  return { isPending, data, error, isSuccess };
}

export default useGetWorkoutPlanByMemberId;
