import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiCheckMembership(): Promise<{ membershipExpired: boolean }> {
  try {
    const response = await _axios.get(`${API_ROUTES.USER.CHECK_MEMBERSHIP}`);
    console.log(response);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiCheckMembership;
