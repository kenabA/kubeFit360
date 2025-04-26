import { Dispatch, SetStateAction } from "react";
import { workoutPlanTemplateSchema } from "./validator";
import { z } from "zod";

export type TRequestWorkoutPlanFormProps = z.infer<
  typeof workoutPlanTemplateSchema
>;

export type TRequestWorkoutPlanProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
