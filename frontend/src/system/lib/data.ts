// TODO : Manage types here

export type TOptions = {
  label: string;
  value: string;
  theme?: string;
};

export type TFilterFields = {
  equipments: TEntity;
  maintainers: TEntity;
};

export type TFields = { label: string; options: TOptions[] };

export type TEntity = {
  name: string;
  fields: TFields[];
};

export const equipmentStatusOptions: TOptions[] = [
  { label: "Available", value: "active", theme: "hsl(var(--success))" },
  { label: "Unavailable", value: "inactive", theme: "hsl(var(--destructive))" },
  {
    label: "Maintenance",
    value: "underMaintenance",
    theme: "hsl(var(--primary))",
  },
];

export const maintainerStatusOptions: TOptions[] = [
  { label: "Active", value: "active", theme: "hsl(var(--success))" },
  { label: "Inactive", value: "inactive", theme: "hsl(var(--destructive))" },
];

export const genderOptions: TOptions[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  {
    label: "Others",
    value: "others",
  },
];

export const categoryOptions: TOptions[] = [
  { label: "Cardio", value: "cardio" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Strength", value: "strength" },
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
};
