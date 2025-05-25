import { ROUTES } from "@/config/appRoutes";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TCreateWorkoutPlanForm } from "./types";
import apiCreatePlan from "@/system/services/workout-plan/apiCreateWorkoutPlan";
import useHandleNavigate from "@/hooks/useHandleNavigate";

function useCreateWorkoutPlan() {
  const handleNavigate = useHandleNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: createWorkoutPlan,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data: TCreateWorkoutPlanForm) => apiCreatePlan(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.removeQueries({ queryKey: ["workoutPlan"] }),
        queryClient.invalidateQueries({ queryKey: ["workoutPlanRequests"] }),
      ]);

      toast({
        variant: "success",
        title: "Success",
        description: "Successfully created the workout plan",
      });
      handleNavigate(ROUTES.WORKOUT_PLAN_REQUESTS);
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
  return { createWorkoutPlan, isPending, isSuccess, error };
}

export default useCreateWorkoutPlan;
