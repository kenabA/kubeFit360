import { useToast } from "@/hooks/use-toast";
import apiDeletePlanRequest from "@/system/services/workout-plan-requests/apiDeletePlanRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteWorkoutPlanRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteWorkoutPlanRequest,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (requestId: string) => apiDeletePlanRequest(requestId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["workoutPlanRequests"],
      });

      toast({
        variant: "success",
        title: "Success",
        description: "Workout plan deleted successfully",
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

export default useDeleteWorkoutPlanRequest;
