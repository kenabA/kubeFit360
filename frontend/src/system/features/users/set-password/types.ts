import { Dispatch, SetStateAction } from "react";

import { z } from "zod";
import { setPasswordSchema } from "./validator";

export type TSetPasswordProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

export type TSetPasswordFormProps = z.infer<typeof setPasswordSchema>;
