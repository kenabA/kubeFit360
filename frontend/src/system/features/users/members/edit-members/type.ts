import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { memberSchema } from "./validator";

export type TEditMemberFormProps = z.infer<typeof memberSchema>;

export type TEditMemberProps = {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
