import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";

import { TApiResponse } from "@/system/lib/types";
import { AxiosError } from "axios";

async function apiExtendClientMembership(
  membershipType: string,
  selectedId: string
): Promise<TApiResponse<any>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.USER.EXTEND_MEMBERSHIP}/${selectedId}`,
      { membershipType: membershipType.toLowerCase() }
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiExtendClientMembership;
