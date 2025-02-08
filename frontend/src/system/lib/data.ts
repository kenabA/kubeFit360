// TODO : Manage types here

export type TOptions = {
  label: string;
  value: string;
  theme?: string;
};

export type TFilterFields = {
  maintainer: TEntity;
};

export type TFields = { label: string; options: TOptions[] };

export type TEntity = {
  name: string;
  fields: TFields[];
};

export const statusOptions: TOptions[] = [
  { label: "Available", value: "active", theme: "hsl(var(--success))" },
  { label: "Unavailable", value: "inactive", theme: "hsl(var(--destructive))" },
  {
    label: "Maintenance",
    value: "underMaintenance",
    theme: "hsl(var(--primary))",
  },
];

export const categoryOptions: TOptions[] = [
  { label: "Cardio", value: "cardio" },
  { label: "Flexibility", value: "flexibility" },
  { label: "Strength", value: "strength" },
];

export const filterFields: TFilterFields = {
  maintainer: {
    name: "maintainer",
    fields: [
      { label: "status", options: statusOptions },
      { label: "category", options: categoryOptions },
    ],
  },
};
