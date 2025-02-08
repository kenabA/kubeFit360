import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";
import { TEquipmentsData } from "@/system/features/equipments/type";

async function apiGetEquipment(id: string): Promise<TEquipmentsData> {
  try {
    console.log(`${API_ROUTES.EQUIPMENTS.BASE}/${id}`);
    const response = await _axios.get(`${API_ROUTES.EQUIPMENTS.BASE}/${id}`);
    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetEquipment;
