import z from "zod";

export const workoutPlanSchema = z.object({
  request: z.string().nonempty("Please mention the brand name"),
  workoutPlan: z
    .string()
    .nonempty("Workout Plan cannot be empty")
    .min(1000, "Workout plan should be more than 1000 characters"),
});
