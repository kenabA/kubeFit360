import { ROUTES } from "@/config/appRoutes";
import { TSidebarData } from "./types";

export const sidebarDataMaintainer: TSidebarData[] = [
  {
    title: "Dashboard",
    to: ROUTES.DASHBOARD.MAINTAINER,
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

export const sidebarDataAdmin: TSidebarData[] = [
  {
    title: "Dashboard",
    to: ROUTES.DASHBOARD.ADMIN,
    icon: "lucide:home",
  },
  {
    title: "Client Requests",
    to: ROUTES.SIGNUP_REQUEST,
    icon: "fluent:form-new-24-regular",
  },
  {
    title: "Maintainers",
    to: ROUTES.MAINTAINERS,
    icon: "gravity-ui:person-worker",
  },
  {
    title: "Equipments",
    to: ROUTES.EQUIPMENTS,
    icon: "lucide:package",
  },
  {
    title: "Trainers",
    to: ROUTES.TRAINERS,
    icon: "mdi:teach-poll",
  },
  {
    title: "Workout Requests",
    to: ROUTES.WORKOUT_PLAN_REQUESTS,
    icon: "icon-park-outline:plan",
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
export const sidebarDataMember: TSidebarData[] = [
  {
    title: "Dashboard",
    to: ROUTES.DASHBOARD.MEMBER,
    icon: "lucide:home",
  },
  {
    title: "Workout Plan",
    to: ROUTES.WORKOUT_PLAN.MEMBER,
    icon: "icon-park-outline:plan",
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

export const sidebarDataTrainer: TSidebarData[] = [
  {
    title: "Dashboard",
    to: ROUTES.DASHBOARD.TRAINER,
    icon: "lucide:home",
  },
  {
    title: "Workout Requests",
    to: ROUTES.WORKOUT_PLAN_REQUESTS,
    icon: "icon-park-outline:plan",
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

export const sidebarDataDefault: TSidebarData[] = [
  {
    title: "Notices",
    to: ROUTES.NOTICES,
    icon: "pepicons-pop:bulletin-notice",
  },
];

export const ROLE_SIDEBAR_DATA = {
  maintainer: sidebarDataMaintainer,
  admin: sidebarDataAdmin,
  trainer: sidebarDataTrainer,
  member: sidebarDataMember,
  default: sidebarDataDefault,
};

export type Role = keyof typeof ROLE_SIDEBAR_DATA;
