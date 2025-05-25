import { API_ROUTES } from "@/config/apiRoutes";
import { _axios } from "@/config/axios";
import axios, { AxiosError } from "axios";

import { TWorkoutPlan } from "@/system/features/workout-plan/types";

async function apiGetWorkoutPlanByMemberId(id: string): Promise<TWorkoutPlan> {
  try {
    const response = await _axios.get(
      `${API_ROUTES.TRAINERS.WORKOUT_PLAN}/member/${id}`
    );
    return response.data.data.data;
  } catch (err) {
    // First, confirm it's an AxiosError
    if (!axios.isAxiosError(err)) {
      console.error("Not an Axios error:", err);
      throw err;
    }

    const backendError = err as AxiosError<{
      message: string;
      membershipExpired?: boolean;
    }>;

    const data = backendError.response?.data;

    // if (status === 403 && data?.membershipExpired) {
    //   const setSubscriptionStatus =
    //     useUserStore.getState().setSubscriptionStatus;
    //   setSubscriptionStatus(false);
    // }

    throw new Error(data?.message || backendError.message);
  }
}

export default apiGetWorkoutPlanByMemberId;
