import React from "react";

export type TBlockType = {
  select?: React.ReactElement | null;
  title?: string;
  icon?: string;
  data?: string | number | React.ReactElement;
  total?: string | number;
  type: "numeric" | "figure" | "calendar" | "table" | "qualitative" | "custom";
  theme?: "success" | "warn" | "info" | "error" | "default";
  children?: React.ReactNode;
  className?: string;
  status?: React.ReactElement;
};
