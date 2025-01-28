export type TEquipmentsData = {
  _id: string;
  equipmentName: string;
  equipmentImage: string;
  serialNumber: string;
  installationDate: string;
  status: string;
  brandName: string;
  description: string;
  category: string;
};

export type TEquipmentStats = {
  active: number;
  inactive: number;
  underMaintenance: number;
};
