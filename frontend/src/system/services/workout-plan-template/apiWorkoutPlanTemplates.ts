import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TApiResponse } from "@/system/lib/types";
import { TWorkoutPlanTemplate } from "@/system/features/workout-plan-template/types";

async function apiWorkoutPlanTemplate(): Promise<
  TApiResponse<TWorkoutPlanTemplate[]>
> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_TEMPLATE}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiWorkoutPlanTemplate;
