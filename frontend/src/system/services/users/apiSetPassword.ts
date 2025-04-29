import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

import { TSetPasswordFormProps } from "@/system/features/users/set-password/types";

async function apiSetPassword(
  userData: TSetPasswordFormProps
): Promise<TApiResponse<{ status: string }>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.USER.SET_PASSWORD}`,
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

export default apiSetPassword;
