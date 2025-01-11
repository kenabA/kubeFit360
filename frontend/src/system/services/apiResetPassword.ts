import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TResetPasswordFormProps } from "../pages/ResetPassword/types";

const apiResetPassword = async (
  resetPasswordDetails: TResetPasswordFormProps,
  resetToken: string | undefined
) => {
  try {
    console.log(`${API_ROUTES.AUTH.RESET_PASSWORD}/${resetToken}`);
    const res = await _axios.patch(
      `${API_ROUTES.AUTH.RESET_PASSWORD}/${resetToken}`,
      resetPasswordDetails
    );

    return res.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(backendError.response?.data.message);
  }
};

export default apiResetPassword;
