import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";

import { TSignUpRequests } from "@/system/features/authentication/useGetSignUpRequests";

async function apiGetSignUpRequests(params: {
  [key: string]: string;
}): Promise<TApiResponse<TSignUpRequests[]>> {
  try {
    const query = `?${new URLSearchParams(params).toString()}`;
    const response = await _axios.get(
      `${API_ROUTES.USER.SIGNUP_REQUEST}${query}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetSignUpRequests;
