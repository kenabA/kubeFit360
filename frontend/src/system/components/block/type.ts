export type TBlockType = {
  title: string;
  icon: string;
  data: string | number;
  total: string | number;
  type: "numeric" | "figure";
  theme: "success" | "warn" | "info" | "error";
  children?: React.ReactNode;
};
