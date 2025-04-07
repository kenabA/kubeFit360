import { FieldError, Merge } from "react-hook-form";

export type TOptions<T extends string> = {
  label: string;
  value: T;
  theme?: string;
};

export interface MultiSelectProps<T extends string> {
  label: string;
  options: TOptions<T>[];
  selected: T[];
  error: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  onChange: (selected: T[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
