import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TRecentActivities } from "@/system/features/recent-activities/type";
import { TApiResponse } from "@/system/lib/types";

async function apiGetAllRecentActivities(params: {
  [key: string]: string;
}): Promise<TApiResponse<TRecentActivities[]>> {
  try {
    const query = `?${new URLSearchParams(params).toString()}`;
    const response = await _axios.get(
      `${API_ROUTES.RECENT_ACTIVITIES}${query}`
    );

    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetAllRecentActivities;
