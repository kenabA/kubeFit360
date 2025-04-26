import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";

async function apiGetWorkoutRequest(id: string): Promise<TWorkoutPlanRequest> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_REQUESTS}/${id}`
    );
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetWorkoutRequest;
