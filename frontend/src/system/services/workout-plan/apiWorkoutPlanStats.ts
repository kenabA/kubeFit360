import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

import { TWorkoutPlanStats } from "@/system/features/workout-plan/useWorkoutPlanStats";

async function apiWorkoutPlanStats(): Promise<
  TApiResponse<TWorkoutPlanStats[]>
> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_STATS}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiWorkoutPlanStats;
