import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TEquipmentData } from "./type";
import { TApiResponse } from "@/system/global/types";

async function apiEquipments(
  filters: any
): Promise<TApiResponse<TEquipmentData[]>> {
  try {
    const query = `?${new URLSearchParams(filters).toString()}`;
    const response = await _axios.get(`${API_ROUTES.EQUIPMENTS}${query}`);
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiEquipments;
