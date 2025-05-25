import { useToast } from "@/hooks/use-toast";
import apiDeleteEquipments from "@/system/services/equipments/apiDeleteEquipments";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteEquipments() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteEquipment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (equipmentId: string) => apiDeleteEquipments(equipmentId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["recommendedEquipments"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Equipment deleted successfully",
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
  return { deleteEquipment, isPending, isSuccess };
}

export default useDeleteEquipments;
