import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TApiResponse } from "@/system/lib/types";
import { TWorkoutPlanRequest } from "@/system/features/workout-plan-requests/types";
import { formatParams } from "@/lib/utils";

async function apiWorkoutPlanRequests(params: {
  [key: string]: string;
}): Promise<TApiResponse<TWorkoutPlanRequest[]>> {
  const formattedParams = formatParams(params);
  try {
    const query = `?${new URLSearchParams(formattedParams).toString()}`;
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_REQUESTS}${query}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiWorkoutPlanRequests;
