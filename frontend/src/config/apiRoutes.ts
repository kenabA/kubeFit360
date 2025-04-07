export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const buildApiRoute = (path: string) => `${BASE_URL}/${path}`;

export const API_ROUTES = {
  AUTH: {
    AUTHENTICATE_USER: buildApiRoute("auth/authenticateUser"),
    LOGIN: buildApiRoute("auth/login"),
    LOGOUT: buildApiRoute("auth/logout"),
    SIGNUP: buildApiRoute("auth/signup"),
    FORGOT_PASSWORD: buildApiRoute("auth/forgotPassword"),
    RESET_PASSWORD: buildApiRoute("auth/resetPassword"),
  },
  EQUIPMENTS: {
    BASE: buildApiRoute("equipments"),
    STATS: buildApiRoute("equipments/equipment-stats"),
  },
  MAINTAINERS: {
    BASE: buildApiRoute("maintainers"),
  },

  TRAINERS: {
    BASE: buildApiRoute("maintainers"),
    WORKOUT_PLAN_REQUESTS: buildApiRoute("workoutPlanRequests"),
    WORKOUT_PLAN: buildApiRoute("workoutPlan"),
    WORKOUT_PLAN_TEMPLATE: buildApiRoute("workoutPlanTemplate"),
  },
  RECENT_ACTIVITIES: buildApiRoute("recentActivities"),
  USER: {
    BASE: buildApiRoute("users"),
    STATS: buildApiRoute("users/user-stats"),
  },
};
