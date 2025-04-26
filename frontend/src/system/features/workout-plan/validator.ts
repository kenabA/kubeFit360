import z from "zod";

export const workoutPlanSchema = z.object({
  member: z.string().nonempty("Please mention the member id"),
  request: z.string().nonempty("Please mention the request id"),
  workoutPlan: z
    .string()
    .nonempty("Workout Plan cannot be empty")
    .min(1000, "Workout plan should be more than 1000 characters"),
  createdAt: z.string().optional(),
});
