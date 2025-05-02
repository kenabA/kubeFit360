export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const buildApiRoute = (path: string) => `${BASE_URL}/${path}`;

export const API_ROUTES = {
  AUTH: {
    AUTHENTICATE_USER: buildApiRoute("auth/authenticateUser"),
    ONE_TIME_VERIFICATION: buildApiRoute("auth/one-time-verification"),
    LOGIN: buildApiRoute("auth/login"),
    LOGOUT: buildApiRoute("auth/logout"),
    SIGNUP: buildApiRoute("auth/signup"),
    SIGNUP_REQUEST: buildApiRoute("auth/signupRequest"),
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

  NOTICES: buildApiRoute("notices"),
  WEIGHTS: buildApiRoute("weights"),

  TRAINERS: {
    BASE: buildApiRoute("maintainers"),
    WORKOUT_PLAN_REQUESTS: buildApiRoute("workoutPlanRequests"),
    WORKOUT_PLAN_TEMPLATE: buildApiRoute("workoutPlanTemplate"),
    WORKOUT_PLAN: buildApiRoute("workoutPlan"),
    WORKOUT_PLAN_STATS: buildApiRoute("workoutPlan/stats"),
  },
  RECENT_ACTIVITIES: buildApiRoute("recentActivities"),
  USER: {
    BASE: buildApiRoute("users"),
    STATS: buildApiRoute("users/user-stats"),
    DETAILS: buildApiRoute("users/client-stats"),
    CHECK_NEW_USER: buildApiRoute("users/check-new-user"),
    CR_USER: buildApiRoute("users/me"),
    SIGNUP_REQUEST: buildApiRoute("users/clients"),
    PROCESS_SIGNUP_REQUEST: buildApiRoute("users/processClientRequest"),
    PAYMENT_STATUS: buildApiRoute("users/payment-status"),
    SET_PASSWORD: buildApiRoute("users/setPassword"),
    UPDATE_PASSWORD: buildApiRoute("users/updatePassword"),
  },
};
