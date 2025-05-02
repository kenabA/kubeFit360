import useGetWeights from "./useWeightsData";

function useFormattedWeightData(selectedRange: string) {
  const { data: weightData, isPending: isGettingWeights } =
    useGetWeights(selectedRange);

  const formattedWeightsData = weightData?.map((entry) => ({
    date: entry.loggedAt.slice(0, 10),
    weight: entry.weight,
  }));

  return { formattedWeightsData, isGettingWeights };
}

export default useFormattedWeightData;
