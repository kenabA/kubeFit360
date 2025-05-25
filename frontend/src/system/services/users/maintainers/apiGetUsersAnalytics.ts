import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

async function apiGetUsersAnalytics(): Promise<
  TApiResponse<{ total: number; role: string }[]>
> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.USER.BASE}/getUsersAnalytics`
    );

    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetUsersAnalytics;
