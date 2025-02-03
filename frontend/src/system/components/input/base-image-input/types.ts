import { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

export type TBaseImageInputProps = {
  label: string;
  type: React.HTMLInputTypeAttribute;
  name?: string;
  error?: FieldError | undefined;
  localImage: File | string | undefined;
  setLocalImage: Dispatch<SetStateAction<File | string | undefined>>;
  handleRemove: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
