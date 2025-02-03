import { TApiResponse } from "@/system/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TEquipmentsStats } from "./type";
import apiEquipmentsStats from "@/system/services/equipments/apiEquipmentStats";

function useEquipmentsStats() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TEquipmentsStats[]>, AxiosError>({
    queryFn: () => apiEquipmentsStats(),
    queryKey: ["equipmentsStats"],
  });

  return { data, error };
}

export default useEquipmentsStats;
