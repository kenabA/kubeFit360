import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { trainerSchema } from "./validator";

export type TEditTrainerFormProps = z.infer<typeof trainerSchema>;

export type TEditTrainerProps = {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
