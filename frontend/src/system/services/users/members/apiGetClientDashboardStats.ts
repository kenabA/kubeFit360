import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TClientDashboardStats } from "@/system/features/users/members/useGetClientDashboardStats";

async function apiGetClientDashboardStats(): Promise<{
  status: "string";
  data: TClientDashboardStats;
}> {
  try {
    const response = await _axios.get(`${API_ROUTES.USER.DETAILS}`);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetClientDashboardStats;
