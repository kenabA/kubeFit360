import { TClientStatus } from "../features/authentication/useGetSignUpRequests";
import {
  TBodyType,
  TDays,
  TFitnessLevel,
  TWorkoutGoals,
  TWorkoutPlanStatus,
  TWorkoutTypePreference,
} from "../features/workout-plan-requests/types";

export type TOptions<T> = {
  label: string;
  value: T;
  theme?: string;
};

export type TFilterFields = {
  equipments: TEntity;
  members: TEntity;
  maintainers: TEntity;
  trainers: TEntity;
  notices: TEntity;
  workoutPlanRequests: TEntity;
  signUpRequests: TEntity;
};

export type TFields = { label: string; options: TOptions<string>[] };

export type TEntity = {
  name: string;
  fields: TFields[];
};

export const equipmentStatusOptions: TOptions<string>[] = [
  { label: "Available", value: "active", theme: "hsl(var(--success))" },
  { label: "Unavailable", value: "inactive", theme: "hsl(var(--destructive))" },
  {
    label: "Maintenance",
    value: "underMaintenance",
    theme: "hsl(var(--primary))",
  },
];

export const noticesStatusOptions: TOptions<string>[] = [
  { label: "Active", value: "active", theme: "hsl(var(--success))" },
  { label: "Expired", value: "expired", theme: "hsl(var(--destructive))" },
];

export const maintainerStatusOptions: TOptions<string>[] = [
  { label: "Active", value: "active", theme: "hsl(var(--success))" },
  { label: "Inactive", value: "inactive", theme: "hsl(var(--destructive))" },
];

export const trainerStatusOptions: TOptions<string>[] = [
  { label: "Active", value: "active", theme: "hsl(var(--success))" },
  { label: "Inactive", value: "inactive", theme: "hsl(var(--destructive))" },
];

export const genderOptions: TOptions<string>[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  {
    label: "Others",
    value: "others",
  },
];

export const categoryOptions: TOptions<string>[] = [
  { label: "Cardio", value: "cardio" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Strength", value: "strength" },
];
export const membershipOptions: TOptions<string>[] = [
  { label: "Basic", value: "basic" },
  { label: "Enterprise", value: "enterprise" },
];

export const requestPlanStatusOptions: TOptions<TWorkoutPlanStatus>[] = [
  { label: "Approved", value: "approved", theme: "hsl(var(--success))" },
  { label: "Pending", value: "pending", theme: "hsl(var(--primary))" },
  { label: "Rejected", value: "rejected", theme: "hsl(var(--destructive))" },
  { label: "Generated", value: "generated", theme: "hsl(var(--accent))" },
];

export const signUpRequestStatusOptions: TOptions<TClientStatus>[] = [
  { label: "Approved", value: "approved", theme: "hsl(var(--success))" },
  { label: "Pending", value: "pending", theme: "hsl(var(--primary))" },
  { label: "Rejected", value: "rejected", theme: "hsl(var(--destructive))" },
];

export const clientStatusOptions: TOptions<TClientStatus>[] = [
  { label: "Active", value: "active", theme: "hsl(var(--success))" },
  { label: "Inactive", value: "inactive", theme: "hsl(var(--destructive))" },
];

export const fitnessLevelOptions: TOptions<TFitnessLevel>[] = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Professional", value: "professional" },
];

export const filterFields: TFilterFields = {
  equipments: {
    name: "equipments",
    fields: [
      { label: "status", options: equipmentStatusOptions },
      { label: "category", options: categoryOptions },
    ],
  },
  signUpRequests: {
    name: "signUpRequests",
    fields: [
      { label: "membershipType", options: membershipOptions },
      { label: "status", options: signUpRequestStatusOptions },
    ],
  },
  notices: {
    name: "notices",
    fields: [{ label: "status", options: noticesStatusOptions }],
  },
  members: {
    name: "members",
    fields: [
      { label: "membershipType", options: membershipOptions },
      { label: "status", options: clientStatusOptions },
    ],
  },
  maintainers: {
    name: "maintainers",
    fields: [
      { label: "status", options: maintainerStatusOptions },
      { label: "gender", options: genderOptions },
    ],
  },
  trainers: {
    name: "trainers",
    fields: [
      { label: "status", options: trainerStatusOptions },
      { label: "gender", options: genderOptions },
    ],
  },
  workoutPlanRequests: {
    name: "workoutPlanRequests",
    fields: [
      { label: "status", options: requestPlanStatusOptions },
      { label: "fitness level", options: fitnessLevelOptions },
    ],
  },
};

export const bodyTypeOptions: TOptions<React.ReactNode>[] = [
  { label: "Ectomorph", value: "ectomorph" },
  { label: "Mesomorph", value: "mesomorph" },
  { label: "Endomorph", value: "endomorph" },
];

export const weekdaysOptions: TOptions<TDays>[] = [
  { label: "Sunday", value: "Sunday" },
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
];

export const workoutTypeOptions: TOptions<TWorkoutTypePreference>[] = [
  { label: "Cardio", value: "cardio" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Strength Training", value: "strength training" },
];

export const workoutGoalOptions: TOptions<TWorkoutGoals>[] = [
  { label: "Fat Loss", value: "Fat Loss" },
  { label: "Endurance", value: "Endurance" },
  { label: "General Fitness", value: "General Fitness" },
  { label: "Muscle Gain", value: "Muscle Gain" },
  { label: "Strength", value: "Strength" },
];
