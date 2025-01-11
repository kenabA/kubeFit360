import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiAuth() {
  try {
    const response = await _axios.get(`${API_ROUTES.AUTH.AUTHENTICATE_USER}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAuth;
