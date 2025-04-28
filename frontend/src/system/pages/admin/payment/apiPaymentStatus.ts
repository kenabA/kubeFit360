import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import axios, { AxiosError } from "axios";

async function apiPaymentStatus(id: string): Promise<any> {
  try {
    console.log(id);
    const response = await axios.post(`${API_ROUTES.USER.PAYMENT_STATUS}`, {
      product_id: id,
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
