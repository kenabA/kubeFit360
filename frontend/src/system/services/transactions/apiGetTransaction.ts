import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { AxiosError } from "axios";

export type TTransactionData = {
  month: string;
  totalRevenue: number;
};

async function apiGetAggregatedTransaction(): Promise<TTransactionData[]> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRANSACTIONS.GET_AGGREGATED}`
    );

    return response.data.data.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiGetAggregatedTransaction;
