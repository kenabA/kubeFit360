export type TEquipmentsData = {
  _id: string;
  equipmentName: string;
  serialNumber: number;
  installationDate: string;
  status: string;
  brandName: string;
  description: string;
};

export type TEquipmentStats = {
  active: number;
  inactive: number;
  underMaintenance: number;
};
