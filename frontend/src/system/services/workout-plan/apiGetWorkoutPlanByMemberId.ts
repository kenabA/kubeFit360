import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TWorkoutPlan } from "@/system/features/workout-plan/types";

async function apiGetWorkoutPlanByMemberId(id: string): Promise<TWorkoutPlan> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN}/member/${id}`
    );
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetWorkoutPlanByMemberId;
