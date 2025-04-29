import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";

import { TApiResponse } from "@/system/lib/types";
import { TSignupFormProps } from "@/system/pages/signup/types";
import { AxiosError } from "axios";

async function apiCreateSignUpRequest(
  data: TSignupFormProps
): Promise<TApiResponse<any>> {
  try {
    console.log(data);
    const response = await _axios.post(
      `${API_ROUTES.AUTH.SIGNUP_REQUEST}`,
      data
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiCreateSignUpRequest;
