import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TSaveTemplateFormProps } from "@/system/components/tiptap/save-template-popover/type";
import apiSaveWorkoutPlanTemplate from "@/system/services/workout-plan-template/apiSaveWorkoutPlan";

function useCreateWorkoutPlanTemplate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: createWorkoutPlanTemplate,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: TSaveTemplateFormProps) =>
      apiSaveWorkoutPlanTemplate(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workoutPlanTemplate"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Successfully saved the workout plan template",
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

export default useCreateWorkoutPlanTemplate;
