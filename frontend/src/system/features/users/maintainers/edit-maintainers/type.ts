import { z } from "zod";
import { Dispatch, SetStateAction } from "react";
import { maintainerSchema } from "./validator";

export type TEditMaintainerFormProps = z.infer<typeof maintainerSchema>;

export type TEditMaintainerProps = {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
