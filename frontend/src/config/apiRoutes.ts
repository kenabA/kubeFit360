export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const buildApiRoute = (path: string) => `${BASE_URL}/${path}`;

export const API_ROUTES = {
  AUTH: {
    LOGIN: buildApiRoute("auth/login"),
    SIGNUP: buildApiRoute("auth/signup"),
    FORGOT_PASSWORD: buildApiRoute("auth/forgotPassword"),
    RESET_PASSWORD: buildApiRoute("auth/resetPassword"),
  },
};
