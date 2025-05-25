import { Dispatch, SetStateAction } from "react";

export type TDialog = {
  isPending: boolean;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  mutationFn: any;
  disabled?: boolean;
  children?: React.ReactNode;
  title: string;
  theme: "success" | "destructive" | "warn" | "info";
  message: string;
  className?: string;
  ctaText: string;
  cancelButton?: boolean;
};
