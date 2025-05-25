import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TEquipmentsData } from "../type";
import apiGetAllRecommendedEquipments from "@/system/services/equipments/apiGetAllRecommendedEquipments";

function useRecommendedEquipments() {
  // const [searchParams] = useSearchParams();
  // const params = Object.fromEntries(searchParams.entries());

  const {
    isPending,
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TEquipmentsData[]>, AxiosError>({
    queryFn: () => apiGetAllRecommendedEquipments(),
    queryKey: ["recommendedEquipments"],
  });

  return { isPending, data, error };
}

export default useRecommendedEquipments;
