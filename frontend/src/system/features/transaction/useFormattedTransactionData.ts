import useAggregatedTransactionData from "./useAggregatedTransactionData";

function useFormattedTransactionData() {
  const {
    data: transactionData,
    isPending: isGettingTransaction,
    error,
  } = useAggregatedTransactionData();

  const formattedTransactionData = transactionData?.map((entry) => ({
    date: entry.month,
    totalRevenue: entry.totalRevenue,
  }));

  return { formattedTransactionData, isGettingTransaction, error };
}

export default useFormattedTransactionData;
