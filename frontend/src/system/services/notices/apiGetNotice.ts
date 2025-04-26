import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TNoticeData } from "@/system/features/notices/type";

async function apiGetNotice(id: string): Promise<TNoticeData> {
  try {
    const response = await _axios.get(`${API_ROUTES.NOTICES}/${id}`);
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetNotice;
