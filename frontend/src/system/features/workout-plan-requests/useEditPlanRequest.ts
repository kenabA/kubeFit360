import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TWorkoutPlanStatus } from "./types";
import apiEditPlanRequest from "@/system/services/workout-plan-requests/apiEditPlanRequest";

function useEditPlanRequest() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    mutate: editPlanRequest,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: ({
      data,
      selectedId,
    }: {
      data: { status: TWorkoutPlanStatus };
      selectedId: string;
    }) => apiEditPlanRequest(data, selectedId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["workoutPlanRequests"],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Changed the status successfully",
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
  return { editPlanRequest, isPending, isSuccess, error };
}

export default useEditPlanRequest;
