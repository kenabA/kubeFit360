import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

export type TWeightData = {
  _id: string;
  user: string;
  weight: number;
  loggedAt: string;
};

async function apiGetWeights(range: string): Promise<TWeightData[]> {
  try {
    const response = await _axios.get(`${API_ROUTES.WEIGHTS}`, {
      params: { range },
    });
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetWeights;
