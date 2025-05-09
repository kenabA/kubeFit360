import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import axios, { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TNoticeData } from "@/system/features/notices/type";
import useUserStore from "@/system/stores/user/useUserStore";

async function apiGetAllNotices(params: {
  [key: string]: string;
}): Promise<TApiResponse<TNoticeData[]>> {
  try {
    const query = `?${new URLSearchParams(params).toString()}`;
    const response = await _axios.get(`${API_ROUTES.NOTICES}${query}`);
    return response.data;
  } catch (err) {
    // First, confirm it's an AxiosError
    if (!axios.isAxiosError(err)) {
      console.error("Not an Axios error:", err);
      throw err;
    }

    const backendError = err as AxiosError<{
      message: string;
      membershipExpired?: boolean;
    }>;

    const status = backendError.response?.status;
    const data = backendError.response?.data;

    if (status === 403 && data?.membershipExpired) {
      const setSubscriptionStatus =
        useUserStore.getState().setSubscriptionStatus;
      setSubscriptionStatus(false);
    }

    throw new Error(data?.message || backendError.message);
  }
}

export default apiGetAllNotices;
