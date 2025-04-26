import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import {
  TClientStatus,
  TSignUpRequests,
} from "@/system/features/authentication/useGetSignUpRequests";

import { TApiResponse } from "@/system/lib/types";
import { AxiosError } from "axios";

async function apiValidateSignUpRequest(
  data: TClientStatus,
  selectedId: string
): Promise<TApiResponse<TSignUpRequests>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.USER.PROCESS_SIGNUP_REQUEST}/${selectedId}`,
      { status: data }
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiValidateSignUpRequest;
