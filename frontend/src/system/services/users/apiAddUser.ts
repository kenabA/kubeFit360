import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TAddMaintainerFormProps } from "@/system/features/users/maintainers/add-maintainers/type";
import { TUserDetails } from "@/system/stores/user/types";

// TODO Make the type for the add user form universal so that trainer will use the same
async function apiAddUser(
  userData: TAddMaintainerFormProps
): Promise<TApiResponse<TUserDetails>> {
  try {
    console.log(`${API_ROUTES.USER.BASE}`);
    const response = await _axios.post(`${API_ROUTES.USER.BASE}`, userData);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAddUser;
