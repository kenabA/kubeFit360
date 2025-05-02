import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TWeightFormProps } from "@/system/components/weight-popover/types";

async function apiAddWeight(
  weightDetails: TWeightFormProps
): Promise<TApiResponse<any>> {
  try {
    const response = await _axios.post(`${API_ROUTES.WEIGHTS}`, weightDetails);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAddWeight;
