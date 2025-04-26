import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type TBodyMetricsInputProps<T extends FieldValues> = {
  label: string;
  unitLabel: "kg" | "ft" | "in";
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  name: string;
  showLabel?: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
};
