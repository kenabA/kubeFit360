import {
  TFitnessLevel,
  TWorkoutPlanStatus,
} from "../features/workout-plan-requests/types";

export type TOptions<T> = {
  label: string;
  value: T;
  theme?: string;
};

export type TFilterFields = {
  equipments: TEntity;
  maintainers: TEntity;
  workoutPlanRequests: TEntity;
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

export const maintainerStatusOptions: TOptions<string>[] = [
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

export const requestPlanStatusOptions: TOptions<TWorkoutPlanStatus>[] = [
  { label: "Approved", value: "approved", theme: "hsl(var(--success))" },
  { label: "Pending", value: "pending", theme: "hsl(var(--primary))" },
  { label: "Rejected", value: "rejected", theme: "hsl(var(--destructive))" },
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
  maintainers: {
    name: "maintainers",
    fields: [
      { label: "status", options: maintainerStatusOptions },
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
