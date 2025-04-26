import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TApiResponse } from "@/system/lib/types";
import { TNoticeData } from "@/system/features/notices/type";
import { TEditNoticeFormProps } from "@/system/features/notices/edit-notice/types";

async function apiEditNotice(
  noticeData: TEditNoticeFormProps,
  selectedId: string
): Promise<TApiResponse<TNoticeData>> {
  try {
    console.log(selectedId);
    const response = await _axios.patch(
      `${API_ROUTES.NOTICES}/${selectedId}`,
      noticeData
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiEditNotice;
