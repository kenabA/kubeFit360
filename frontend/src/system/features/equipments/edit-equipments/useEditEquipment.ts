import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TEditEquipmentFormProps } from "./type";
import apiEditEquipments from "@/system/services/equipments/apiEditEquipment";

function useEditEquipment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: editEquipment,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      editEquipmentDetails,
      selectedId,
    }: {
      editEquipmentDetails: TEditEquipmentFormProps;
      selectedId: string;
    }) => apiEditEquipments(editEquipmentDetails, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Equipment edited successfully",
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
  return { editEquipment, isPending, isSuccess, error };
}

export default useEditEquipment;
