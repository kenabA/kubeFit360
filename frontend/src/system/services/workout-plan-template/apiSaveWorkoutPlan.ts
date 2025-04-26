import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import { TSaveTemplateFormProps } from "@/system/components/tiptap/save-template-popover/type";

import { TWorkoutPlan } from "@/system/features/workout-plan/types";
import { TApiResponse } from "@/system/lib/types";
import { AxiosError } from "axios";

async function apiSaveWorkoutPlanTemplate(
  data: TSaveTemplateFormProps
  // Change the type of the TWorkoutPlan
): Promise<TApiResponse<TWorkoutPlan>> {
  try {
    const response = await _axios.post(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN_TEMPLATE}`,
      data
    );
    return response.data;
  } catch (err) {
    const backendError = err as AxiosError<{ message: string }>;
    throw new Error(
      backendError?.response?.data.message || backendError.message
    );
  }
}

export default apiSaveWorkoutPlanTemplate;
