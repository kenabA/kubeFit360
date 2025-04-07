import { TWorkoutPlanRequest } from "../workout-plan-requests/types";

import { z } from "zod";
import { workoutPlanSchema } from "./validator";

export type TCreateWorkoutPlanForm = z.infer<typeof workoutPlanSchema>;

export type TWorkoutPlan = {
  _id: string;
  request: TWorkoutPlanRequest;
  workoutPlan: string;
  createdAt: string;
  updatedAt: string;
};

export type TGetWorkoutPlan = {
  selectedId: string;
  enabled?: boolean;
};
