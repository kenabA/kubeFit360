import apiGetWeights, {
  TWeightData,
} from "@/system/services/weights/apiGetWeights";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function useGetWeights(selectedRange: string) {
  const { isPending, data, error } = useQuery<TWeightData[], AxiosError>({
    queryFn: () => apiGetWeights(selectedRange || "90d"),
    queryKey: ["weight", selectedRange],
  });

  return { isPending, data, error };
}

export default useGetWeights;
