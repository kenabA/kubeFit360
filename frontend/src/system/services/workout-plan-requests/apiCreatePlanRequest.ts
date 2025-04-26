import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { TRequestWorkoutPlanFormProps } from "@/system/features/workout-plan-requests/request-workout-plan/type";

import { TWorkoutPlan } from "@/system/features/workout-plan/types";
import { TApiResponse } from "@/system/lib/types";
import { AxiosError } from "axios";

async function apiCreateWorkoutPlanRequest(
  data: TRequestWorkoutPlanFormProps
): Promise<TApiResponse<TWorkoutPlan>> {
  try {
    const response = await _axios.post(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_REQUESTS}`,
      data
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiCreateWorkoutPlanRequest;
