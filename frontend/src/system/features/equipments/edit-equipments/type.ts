import { z } from "zod";

import { Dispatch, SetStateAction } from "react";
import { editEquipmentSchema } from "./validator";

export type TEditEquipmentFormProps = z.infer<typeof editEquipmentSchema>;

export type TEditEquipmentProps = {
  selectedId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
