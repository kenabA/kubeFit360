import { Dispatch, SetStateAction } from "react";

// export type TAddEquipmentFormProps = z.infer<typeof equipmentSchema>;

export type TRequestWorkoutPlanProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};
