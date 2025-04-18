import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TAddNoticeFormProps } from "@/system/features/notices/add-notice/types";
import { TNoticeData } from "@/system/features/notices/type";

async function apiAddNotice(
  noticeDetails: TAddNoticeFormProps
): Promise<TApiResponse<TNoticeData>> {
  try {
    const response = await _axios.post(`${API_ROUTES.NOTICES}`, noticeDetails);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAddNotice;
