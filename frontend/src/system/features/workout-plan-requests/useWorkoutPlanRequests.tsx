import { useSuspenseQuery } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { useSearchParams } from "react-router";
import { TWorkoutPlanRequest } from "./types";
import apiWorkoutPlanRequests from "@/system/services/workout-plan-requests/apiWorkoutPlanRequests";

function useWorkoutPlanRequests() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const {
    data: { data },
    isPending,
    error,
  } = useSuspenseQuery<TApiResponse<TWorkoutPlanRequest[]>, AxiosError>({
    queryFn: () => apiWorkoutPlanRequests(params),
    queryKey: ["workoutPlanRequests", params],
  });

  return { data, error, isPending };
}

export default useWorkoutPlanRequests;
