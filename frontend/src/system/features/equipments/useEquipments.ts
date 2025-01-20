import apiEquipments from "@/system/services/equipments/apiEquipments";
import { TEquipmentResponse } from "@/system/services/equipments/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function useEquipments() {
  const {
    data: { data },
    error,
  } = useSuspenseQuery<TEquipmentResponse, AxiosError>({
    queryFn: apiEquipments,
    queryKey: ["equipments"],
  });

  return { data, error };
}

export default useEquipments;
