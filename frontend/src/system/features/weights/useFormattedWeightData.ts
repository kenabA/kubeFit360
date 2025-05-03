import useGetWeights from "./useWeightsData";

function useFormattedWeightData(selectedRange: string) {
  const {
    data: weightData,
    isPending: isGettingWeights,
    error,
  } = useGetWeights(selectedRange);

  const formattedWeightsData = weightData?.map((entry) => ({
    date: entry.loggedAt,
    weight: entry.weight,
  }));

  return { formattedWeightsData, isGettingWeights, error };
}

export default useFormattedWeightData;
