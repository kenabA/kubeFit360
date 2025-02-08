import { z } from "zod";
import { maintainerSchema } from "./validator";
import { Dispatch, SetStateAction } from "react";

export type TAddMaintainerFormProps = z.infer<typeof maintainerSchema>;

export type TAddMaintainerProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
