import { API_ROUTES, BASE_URL } from "@/config/apiRoutes";
import { TLoginFormProps } from "../pages/Login/types";

const apiLogin = async (loginDetails: TLoginFormProps) => {
  try {
    console.log(API_ROUTES.AUTH.LOGIN);
  } catch {}
};

export default apiLogin;
