import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TEquipmentsData } from "../type";
import apiGetEquipment from "@/system/services/equipments/apiGetEquipment";

type TGetEquipment = {
  selectedId: string;
  enabled?: boolean;
};

function useGetEquipment({ selectedId, enabled = true }: TGetEquipment) {
  const { isPending, data, error } = useQuery<TEquipmentsData, AxiosError>({
    queryFn: () => apiGetEquipment(selectedId),
    queryKey: ["equipment", selectedId],
    enabled: enabled && !!selectedId,
  });

  return { isPending, data, error };
}

export default useGetEquipment;
