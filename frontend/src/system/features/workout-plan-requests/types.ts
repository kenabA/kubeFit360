import { TUserDetails } from "@/system/stores/user/types";

export type THeight = {
  feet: number;
  inches: number;
};

export type TUserBase = {
  _id: string;
  name: string;
};

export type TMember = TUserBase & {
  number: string;
  gender: string;
  birthDate: string;
};

export type TDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TWorkoutPlanStatus = "approved" | "rejected" | "pending";
export type TFitnessLevel = "beginner" | "intermediate" | "professional";
export type TBodyType = "ectomorph" | "mesomorph" | "endomorph";
export type TWorkoutTypePreference =
  | "strength training"
  | "cardio"
  | "flexibility";

export type TWorkoutGoals =
  | "Fat Loss"
  | "Muscle Gain"
  | "Strength"
  | "Endurance"
  | "General Fitness";

export type TWorkoutPlanRequest = {
  _id: string;
  height: THeight;
  weight: number;
  member: TUserDetails;
  trainer: TUserDetails;
  status: TWorkoutPlanStatus;
  fitnessLevel: TFitnessLevel;
  bodyType: TBodyType;
  workoutTypePreference: TWorkoutTypePreference[];
  workoutGoals: TWorkoutGoals[];
  preferredWorkoutDays: TDays[];
  additionalNotes: string;
  createdAt: string;
  updatedAt: string;
};

export type TGetWorkoutRequest = {
  selectedId: string;
  enabled?: boolean;
};
