export type TInfoCard = {
  icon: React.ReactElement;
  type?: "list" | "description" | "standard";
  label: string;
  value: string | number | (string | number)[];
  className?: string;
};
