import { Dispatch, SetStateAction } from "react";
import { changePasswordSchema } from "./validator";
import { z } from "zod";

export type TChangePasswordProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export type TChangePasswordFormProps = z.infer<typeof changePasswordSchema>;
