import { z } from "zod";
import { trainerSchema } from "./validator";
import { Dispatch, SetStateAction } from "react";

export type TAddTrainerFormProps = z.infer<typeof trainerSchema>;

export type TAddTrainerProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
