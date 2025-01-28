import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TRecentActivities } from "@/system/features/recent-activities/type";
import { TApiResponse } from "@/system/global/types";

async function apiGetAllRecentActivities(): Promise<
  TApiResponse<TRecentActivities[]>
> {
  try {
    const response = await _axios.get(`${API_ROUTES.RECENT_ACTIVITIES}`);

    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetAllRecentActivities;
