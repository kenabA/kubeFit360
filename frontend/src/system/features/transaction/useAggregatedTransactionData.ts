import apiGetAggregatedTransaction, {
  TTransactionData,
} from "@/system/services/transactions/apiGetTransaction";

import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function useAggregatedTransactionData() {
  const { isPending, data, error } = useQuery<TTransactionData[], AxiosError>({
    queryFn: () => {
      return apiGetAggregatedTransaction();
    },
    queryKey: ["allTransactions"],
  });

  return { isPending, data, error };
}

export default useAggregatedTransactionData;
