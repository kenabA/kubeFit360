import apiEquipments from "@/system/services/equipments/apiEquipments";
import { useQuery } from "@tanstack/react-query";

function useEquipments() {
  const { data: equipmentsData, isLoading } = useQuery({
    queryKey: ["equipments"],
    queryFn: () => apiEquipments(),
  });

  console.log(equipmentsData);

  return { equipmentsData, isLoading };
}

export default useEquipments;
