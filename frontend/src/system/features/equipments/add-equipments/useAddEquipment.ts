import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiAddEquipments from "@/system/services/equipments/apiAddEquipment";
import { TAddEquipmentFormProps } from "./type";

function useAddEquipment() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addEquipment,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (addEquipmentDetails: TAddEquipmentFormProps) =>
      apiAddEquipments(addEquipmentDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["equipments"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Equipment added successfully",
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
  return { addEquipment, isPending, isSuccess };
}

export default useAddEquipment;
