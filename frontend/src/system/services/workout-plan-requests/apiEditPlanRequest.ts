import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import {
  TWorkoutPlanRequest,
  TWorkoutPlanStatus,
} from "@/system/features/workout-plan-requests/types";
import { TApiResponse } from "@/system/lib/types";
import { AxiosError } from "axios";

async function apiEditPlanRequest(
  data: { status: TWorkoutPlanStatus },
  selectedId: string
): Promise<TApiResponse<TWorkoutPlanRequest>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_REQUESTS}/${selectedId}`,
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

export default apiEditPlanRequest;
