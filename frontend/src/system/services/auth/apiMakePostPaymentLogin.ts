import { API_ROUTES } from "@/config/apiRoutes";

import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TAuthApiResponse } from "@/system/lib/types";

const apiMakePostPaymentLogin = async (
  token: string
): Promise<TAuthApiResponse<any>> => {
  try {
    const res = await _axios.get(
      `${API_ROUTES.AUTH.ONE_TIME_VERIFICATION}?token=${token}`
    );

    return res.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
};

export default apiMakePostPaymentLogin;
