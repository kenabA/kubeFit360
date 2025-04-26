import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TForgotPasswordFormProps } from "../../pages/forgot-password/types";

const apiForgotPassword = async (
  forgotPasswordDetails: TForgotPasswordFormProps
) => {
  try {
    const res = await _axios.post(
      `${API_ROUTES.AUTH.FORGOT_PASSWORD}`,
      forgotPasswordDetails
    );

    return res.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(backendError.response?.data.message);
  }
};

export default apiForgotPassword;
