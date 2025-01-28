import { TEquipmentsData } from "@/system/features/equipments/type";

export type TRecentActivities = {
  _id: string;
  activist: string;
  description: string;
  entity: TEquipmentsData;
  status: string;
  time: string;
};
