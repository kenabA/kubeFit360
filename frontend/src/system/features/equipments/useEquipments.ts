import apiEquipments from "@/system/services/equipments/apiEquipments";
import { useSuspenseQuery } from "@tanstack/react-query";

function useEquipments() {
  const { data: equipmentsData, isError } = useSuspenseQuery({
    queryKey: ["equipments"],
    queryFn: apiEquipments,
  });

  return { equipmentsData, isError };
}

export default useEquipments;
