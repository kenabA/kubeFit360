import { ROUTES } from "@/config/appRoutes";
import { TSidebarData } from "./types";

export const sidebarData: TSidebarData[] = [
  {
    title: "Dashboard",
    to: ROUTES.DASHBOARD,
    icon: "lucide:home",
  },
  {
    title: "Equipments",
    to: ROUTES.EQUIPMENTS,
    icon: "lucide:package",
  },
  {
    title: "Notices",
    to: ROUTES.NOTICES,
    icon: "pepicons-pop:bulletin-notice",
  },
  {
    title: "Settings",
    to: ROUTES.SETTINGS,
    icon: "gravity-ui:gear",
  },
];
