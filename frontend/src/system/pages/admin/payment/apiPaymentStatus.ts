import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

async function apiPaymentStatus(id: string): Promise<any> {
  try {
    const response = await _axios.post(`${API_ROUTES.USER.PAYMENT_STATUS}`, {
      transaction_uuid: id,
    });
    return response;
  } catch (err) {
    const backendError = err as AxiosError<any>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiPaymentStatus;

// 1. LOGIN USR ONCE COMPLEED
