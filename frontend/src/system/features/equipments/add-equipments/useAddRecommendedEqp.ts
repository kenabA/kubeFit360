import { useToast } from "@/hooks/use-toast";
import apiAddRecommendedEquipment from "@/system/services/equipments/apiAddRecommendedEqp";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddRecommendedEquipment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addRecommendedEquipment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (equipmentId: string) =>
      apiAddRecommendedEquipment(equipmentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["recommendedEquipments"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Recommended equipment added successfully",
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast({
        variant: "error",
        title: err.name,
        description: err.message,
      });
    },
  });
  return { addRecommendedEquipment, isPending, isSuccess };
}

export default useAddRecommendedEquipment;
