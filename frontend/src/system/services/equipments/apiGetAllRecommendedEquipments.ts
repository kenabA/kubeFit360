import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TApiResponse } from "@/system/lib/types";
import { TEquipmentsData } from "@/system/features/equipments/type";

async function apiGetAllRecommendedEquipments(): Promise<
  TApiResponse<TEquipmentsData[]>
> {
  try {
    // const query = `?${new URLSearchParams(params).toString()}`;
    const response = await _axios.get(
      // `${API_ROUTES.EQUIPMENTS.RECOMMENDED}${query}`
      `${API_ROUTES.EQUIPMENTS.RECOMMENDED}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetAllRecommendedEquipments;
