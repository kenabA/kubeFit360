import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TUserDetails } from "@/system/stores/user/types";

async function apiGetUser(id: string): Promise<TUserDetails> {
  try {
    const response = await _axios.get(`${API_ROUTES.USER.BASE}/${id}`);
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetUser;
