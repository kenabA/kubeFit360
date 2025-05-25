import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TClientDetails } from "@/system/stores/user/types";

async function apiGetAllMembers(params: {
  [key: string]: string;
}): Promise<TApiResponse<TClientDetails[]>> {
  try {
    const query = `?${new URLSearchParams(params).toString()}`;
    const response = await _axios.get(
      `${API_ROUTES.USER.BASE}/members${query}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetAllMembers;
