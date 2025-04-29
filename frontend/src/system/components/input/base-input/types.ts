import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

export type TBaseInputProps<T extends FieldValues> = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  disabled?: boolean;
  name: string;
  error?: FieldError | undefined;
  register: UseFormRegister<T>;
  allowPastDate?: boolean;
  allowFuture?: boolean;
};
