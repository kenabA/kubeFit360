import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TEquipmentData } from "./type";
import { TEditEquipmentFormProps } from "@/system/features/equipments/edit-equipments/type";
import { TApiResponse } from "@/system/global/types";

async function apiEditEquipments(
  equipmentData: TEditEquipmentFormProps,
  selectedId: string
): Promise<TApiResponse<TEquipmentData>> {
  try {
    const response = await _axios.patch(
      `${API_ROUTES.EQUIPMENTS.BASE}/${selectedId}`,
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

export default apiEditEquipments;
