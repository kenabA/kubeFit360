import warn from "@/assets/system/svg/warn.svg";
import alert from "@/assets/system/svg/alert.svg";

export const themeStyles = {
  success: {
    text: "text-success",
    background: "bg-success",
    backgroundLight: "bg-success-light",
    icon: warn,
  },
  destructive: {
    text: "text-destructive",
    background: "bg-destructive",
    backgroundLight: "bg-destructive-light",
    icon: alert,
  },
  warn: {
    text: "text-warn",
    background: "bg-warn",
    backgroundLight: "bg-warn-light",
    icon: warn,
  },
  info: {
    text: "text-info",
    background: "bg-info",
    backgroundLight: "bg-info-light",
    icon: warn,
  },
  default: {
    text: "text-primary",
    background: "bg-primary",
    backgroundLight: "bg-tertiary",
    icon: warn,
  },
};
