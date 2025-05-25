import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiAddRecommendedEquipment(equipmentId: string) {
  try {
    console.log(equipmentId);
    const response = await _axios.patch(
      `${API_ROUTES.EQUIPMENTS.BASE}/${equipmentId}`,
      {
        isRecommended: false,
        status: "active",
      }
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiAddRecommendedEquipment;
