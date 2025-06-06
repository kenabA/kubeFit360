import { useToast } from "@/hooks/use-toast";
import apiDeleteWorkoutPlan from "@/system/services/workout-plan/apiDeleteWorkoutPlan";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteWorkoutPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteWorkoutPlan,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (requestId: string) => apiDeleteWorkoutPlan(requestId),
    onSuccess: async () => {
      queryClient.resetQueries({ queryKey: ["workoutPlan"] });
      toast({
        variant: "success",
        title: "Success",
        description: "Workout plan request deleted successfully",
      });
    },

    onError: (err) => {
      toast({
        variant: "error",
        title: err.name,
        description: err.message,
      });
    },
  });
  return { deleteWorkoutPlan, isPending, isSuccess };
}

export default useDeleteWorkoutPlan;
