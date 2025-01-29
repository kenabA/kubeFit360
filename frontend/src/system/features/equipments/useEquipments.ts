import { TApiResponse } from "@/system/global/types";

import apiEquipments from "@/system/services/equipments/apiEquipments";
import { TEquipmentData } from "@/system/services/equipments/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router";

function useEquipments() {
  const [searchParams] = useSearchParams();

  const filters = Object.fromEntries(searchParams.entries());

  // console.log(new URLSearchParams(filters).toString());

  const {
    data: { data },
    error,
  } = useSuspenseQuery<TApiResponse<TEquipmentData[]>, AxiosError>({
    queryFn: apiEquipments,
    queryKey: ["equipments", filters],
  });

  return { data, error };
}

export default useEquipments;
