import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

import { TChangePasswordFormProps } from "@/system/features/users/change-password/types";

async function apiChangePassword(
  userData: TChangePasswordFormProps
): Promise<TApiResponse<{ status: string }>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.USER.UPDATE_PASSWORD}`,
      userData
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiChangePassword;
