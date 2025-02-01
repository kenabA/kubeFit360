export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const buildApiRoute = (path: string) => `${BASE_URL}/${path}`;

export const API_ROUTES = {
  AUTH: {
    AUTHENTICATE_USER: buildApiRoute("auth/authenticateUser"),
    LOGIN: buildApiRoute("auth/login"),
    SIGNUP: buildApiRoute("auth/signup"),
    FORGOT_PASSWORD: buildApiRoute("auth/forgotPassword"),
    RESET_PASSWORD: buildApiRoute("auth/resetPassword"),
  },
  EQUIPMENTS: {
    BASE: buildApiRoute("equipments"),
    STATS: buildApiRoute("equipments/equipment-stats"),
  },
  RECENT_ACTIVITIES: buildApiRoute("recentActivities"),
};
