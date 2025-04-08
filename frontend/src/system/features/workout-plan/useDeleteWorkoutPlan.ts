import { useToast } from "@/hooks/use-toast";
import apiDeleteWorkoutPlan from "@/system/services/workout-plan/apiDeleteWorkoutPlan";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteWorkoutPlan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteWorkoutPlanRequest,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (requestId: string) => apiDeleteWorkoutPlan(requestId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["workoutPlanRequests"],
      });

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
  return { deleteWorkoutPlanRequest, isPending, isSuccess };
}

export default useDeleteWorkoutPlan;
