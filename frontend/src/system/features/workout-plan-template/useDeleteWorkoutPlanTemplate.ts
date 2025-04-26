import { useToast } from "@/hooks/use-toast";
import apiDeletePlanTemplate from "@/system/services/workout-plan-template/apiDeletePlanRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteWorkoutPlanTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: deleteWorkoutPlanRequest,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: (templateId: string) => apiDeletePlanTemplate(templateId),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["workoutPlanTemplate"],
      });

      toast({
        variant: "success",
        title: "Success",
        description: "Workout plan Template request deleted successfully",
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

export default useDeleteWorkoutPlanTemplate;
