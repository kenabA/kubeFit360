import { Role, ROLE_SIDEBAR_DATA } from "./data";

export const useSidebarData = (role: Role) => {
  return ROLE_SIDEBAR_DATA[role];
};
