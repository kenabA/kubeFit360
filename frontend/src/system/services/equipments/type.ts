export type TEquipmentData = {
  equipmentName: string;
  serialNumber: Number;
  installationDate: string;
  status: "active" | "inactive" | "underMaintenance";
  brandName: string;
  lastMaintenance: string;
  category: "strength" | "cardio" | "flexibility";
  description: string;
  equipmentImage: String;
};
