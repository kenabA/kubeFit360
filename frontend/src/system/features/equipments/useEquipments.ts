import { TApiResponse } from "@/system/global/types";

import apiEquipments from "@/system/services/equipments/apiEquipments";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";
import { TEquipmentsData } from "./type";

function useEquipments() {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TEquipmentsData[]>, AxiosError>({
    queryFn: () => apiEquipments(params),
    queryKey: ["equipments", params],
  });

  return { data, error };
}

export default useEquipments;
