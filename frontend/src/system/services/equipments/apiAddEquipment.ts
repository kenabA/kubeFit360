import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TEquipmentData } from "./type";
import { TAddEquipmentFormProps } from "@/system/features/equipments/add-equipments/type";
import { TApiResponse } from "@/system/lib/types";

async function apiAddEquipments(
  equipmentData: TAddEquipmentFormProps
): Promise<TApiResponse<TEquipmentData>> {
  try {
    const response = await _axios.post(
      `${API_ROUTES.EQUIPMENTS.BASE}`,
      equipmentData
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAddEquipments;
