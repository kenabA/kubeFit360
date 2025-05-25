import { z } from "zod";
import { equipmentSchema } from "./validator";
import { Dispatch, SetStateAction } from "react";

export type TAddEquipmentFormProps = z.infer<typeof equipmentSchema>;

export type TAddEquipmentProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  recommendedBy?: string;
};
