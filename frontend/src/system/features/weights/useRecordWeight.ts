import { useToast } from "@/hooks/use-toast";
import { TWeightFormProps } from "@/system/components/weight-popover/types";
import apiAddWeight from "@/system/services/weights/apiAddWeight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRecordWeight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addWeight,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (addWeight: TWeightFormProps) => apiAddWeight(addWeight),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["weight"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Weight recorded successfully",
      });
    },
    onError: async (res) => {
      toast({
        variant: "error",
        title: "Fail",
        description: res.message,
      });
    },
  });
  return { addWeight, isPending, isSuccess, error };
}

export default useRecordWeight;
