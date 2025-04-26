import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiDeletePlanRequest(requestId: string) {
  try {
    const response = await _axios.delete(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_REQUESTS}/${requestId}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiDeletePlanRequest;
