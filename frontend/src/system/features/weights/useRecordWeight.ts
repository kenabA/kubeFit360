import { useToast } from "@/hooks/use-toast";
import { TWeightFormProps } from "@/system/components/weight-popover/types";
import apiAddWeight from "@/system/services/weights/apiAddWeight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRecordWeight() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: addNotice,
    isPending,
    error,
    isSuccess,
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
    onError: (err) => {
      console.log(err.message);
      toast({
        variant: "error",
        title: err.name,
        description: err.message,
      });
    },
  });
  return { addNotice, isPending, isSuccess, error };
}

export default useRecordWeight;
