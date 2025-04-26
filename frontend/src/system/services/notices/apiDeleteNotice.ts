import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiDeleteNotice(noticeId: string) {
  try {
    console.log(noticeId);
    const response = await _axios.delete(`${API_ROUTES.NOTICES}/${noticeId}`);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiDeleteNotice;
