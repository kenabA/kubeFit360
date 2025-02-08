import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TEquipmentsStats } from "@/system/features/equipments/type";

async function apiEquipmentsStats(): Promise<TApiResponse<TEquipmentsStats[]>> {
  try {
    const response = await _axios.get(`${API_ROUTES.EQUIPMENTS.STATS}`);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiEquipmentsStats;
