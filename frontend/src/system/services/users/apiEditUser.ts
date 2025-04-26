import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TUserDetails } from "@/system/stores/user/types";
import { TEditMaintainerFormProps } from "@/system/features/users/maintainers/edit-maintainers/type";

// TODO Make the type for the add user form universal so that trainer will use the same
async function apiEditUser(
  userData: TEditMaintainerFormProps,
  selectedId: string
): Promise<TApiResponse<TUserDetails>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.USER.BASE}/${selectedId}`,
      userData
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiEditUser;
