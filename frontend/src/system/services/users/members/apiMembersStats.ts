import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

import { TMembersStats } from "@/system/features/users/members/useMembersAnalytics";

async function apiMembersStats(): Promise<TApiResponse<TMembersStats[]>> {
  try {
    const response = await _axios.get(`${API_ROUTES.USER.STATS}`);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiMembersStats;
