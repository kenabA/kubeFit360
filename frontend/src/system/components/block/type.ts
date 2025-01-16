export type TBlockType = {
  title?: string;
  icon?: string;
  data?: string | number;
  total?: string | number;
  type: "numeric" | "figure" | "calendar" | "table";
  theme?: "success" | "warn" | "info" | "error" | "default";
  children?: React.ReactNode;
  className?: string;
};
