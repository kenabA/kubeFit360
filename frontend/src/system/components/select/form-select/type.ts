import { TOptions } from "@/system/lib/data";
import { FieldError } from "react-hook-form";

export type TFormSelect = {
  field: any;
  label: string;
  options: TOptions[];
  placeholder: string;
  error?: FieldError | undefined;
};
