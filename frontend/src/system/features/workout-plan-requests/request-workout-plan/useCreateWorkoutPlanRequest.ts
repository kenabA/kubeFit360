import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TRequestWorkoutPlanFormProps } from "./type";
import apiCreateWorkoutPlanRequest from "@/system/services/workout-plan-requests/apiCreatePlanRequest";

function useCreateWorkoutPlanRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: createWorkoutPlanTemplate,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: TRequestWorkoutPlanFormProps) =>
      apiCreateWorkoutPlanRequest(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workoutPlanRequest"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Successfully requested new workout plan",
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
  return { createWorkoutPlanTemplate, isPending, isSuccess, error };
}

export default useCreateWorkoutPlanRequest;
