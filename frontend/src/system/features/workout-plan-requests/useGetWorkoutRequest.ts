import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { TGetWorkoutRequest, TWorkoutPlanRequest } from "./types";
import apiGetWorkoutRequest from "@/system/services/workout-plan-requests/apiGetWorkoutRequest";

function useGetWorkoutRequest({
  selectedId,
  enabled = true,
}: TGetWorkoutRequest) {
  const { isPending, data, error } = useQuery<TWorkoutPlanRequest, AxiosError>({
    queryFn: () => apiGetWorkoutRequest(selectedId),
    queryKey: ["workoutPlanRequests", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetWorkoutRequest;
