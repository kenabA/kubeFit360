import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import axios, { AxiosError } from "axios";
import { TNoticeData } from "@/system/features/notices/type";

async function apiGetNotice(id: string): Promise<TNoticeData> {
  try {
    const response = await _axios.get(`${API_ROUTES.NOTICES}/${id}`);
    return response.data.data.data;
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

    const data = backendError.response?.data;

    // if (status === 403 && data?.membershipExpired) {
    //   const setSubscriptionStatus =
    //     useUserStore.getState().setSubscriptionStatus;
    //   setSubscriptionStatus(false);
    // }

    throw new Error(data?.message || backendError.message);
  }
}

export default apiGetNotice;
