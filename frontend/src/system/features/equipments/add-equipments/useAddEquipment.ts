import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

import apiAddEquipments from "@/system/services/equipments/apiAddEquipment";
import { TAddEquipmentFormProps } from "./type";

function useAddEquipment() {
  const { toast } = useToast();
  const { mutate: addEquipment, isPending } = useMutation({
    mutationFn: (addEquipmentDetails: TAddEquipmentFormProps) =>
      apiAddEquipments(addEquipmentDetails),
    onSuccess: (newEquipmentData) => {
      console.log(newEquipmentData);
      toast({
        variant: "success",
        title: "Success",
        description: "Logged in successfully",
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
  return { addEquipment, isPending };
}

export default useAddEquipment;
