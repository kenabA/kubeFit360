import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type TAuthInputProps<T extends FieldValues> = {
  label: string;
  type: HTMLInputElement["type"];
  placeholder?: string;
  name: string;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  className?: string;
};
