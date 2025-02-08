import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiDeleteEquipments(equipmentId: string) {
  try {
    console.log(equipmentId);
    const response = await _axios.delete(
      `${API_ROUTES.EQUIPMENTS.BASE}/${equipmentId}`
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiDeleteEquipments;
