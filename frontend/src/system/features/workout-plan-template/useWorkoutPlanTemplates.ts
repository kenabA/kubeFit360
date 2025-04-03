import { TApiResponse } from "@/system/lib/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiWorkoutPlanTemplate from "@/system/services/workout-plan-template/apiWorkoutPlanTemplates";
import { TWorkoutPlanTemplate } from "./types";

function useWorkoutPlanTemplate() {
  const {
    data: { data },
    isPending,
    error,
  } = useSuspenseQuery<TApiResponse<TWorkoutPlanTemplate[]>, AxiosError>({
    queryFn: apiWorkoutPlanTemplate,
    queryKey: ["workoutPlanTemplate"],
  });

  return { data, error, isPending };
}

export default useWorkoutPlanTemplate;
