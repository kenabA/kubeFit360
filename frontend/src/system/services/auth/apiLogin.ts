import { API_ROUTES } from "@/config/apiRoutes";
import { TLoginFormProps } from "../../pages/Login/types";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

import { TUserDetails } from "@/system/stores/user/types";
import { TAuthApiResponse } from "@/system/lib/types";

const apiLogin = async (
  loginDetails: TLoginFormProps
): Promise<TAuthApiResponse<TUserDetails>> => {
  try {
    const res = await _axios.post(`${API_ROUTES.AUTH.LOGIN}`, loginDetails);
    return res.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
};

export default apiLogin;
