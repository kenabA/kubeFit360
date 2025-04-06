import { z } from "zod";

const HeightSchema = z.object({
  feet: z.number().min(0),
  inches: z.number().min(0).max(11),
});

export const workoutPlanTemplateSchema = z.object({
  member: z.string(),
  trainer: z.string(),
  height: HeightSchema,
  weight: z.number().min(0),
  status: z.enum(["approved", "rejected", "pending"]),
  fitnessLevel: z.enum(["beginner", "intermediate", "professional"]),
  bodyType: z.enum(["ectomorph", "mesomorph", "endomorph"]),
  workoutTypePreference: z.array(
    z.enum(["strength training", "cardio", "flexibility"])
  ),
  workoutGoals: z.array(
    z.enum([
      "Fat Loss",
      "Muscle Gain",
      "Strength",
      "Endurance",
      "General Fitness",
    ])
  ),
  preferredWorkoutDays: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
  ),
  additionalNotes: z.string().optional(),
});
