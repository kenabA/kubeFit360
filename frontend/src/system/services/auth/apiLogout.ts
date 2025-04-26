import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

const apiLogout = async () => {
  try {
    const res = await _axios.get(`${API_ROUTES.AUTH.LOGOUT}`);
    return res.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
};

export default apiLogout;
