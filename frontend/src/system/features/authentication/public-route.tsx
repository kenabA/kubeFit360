import { Navigate, Outlet } from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { ROUTES } from "@/config/appRoutes";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { TUserDetails } from "@/system/stores/user/types";

export default function PublicRoute() {
  const isAuthenticated = useIsAuthenticated();
  const user = useAuthUser<TUserDetails>();

  const role = user?.role;
  let route;

  if (role === "member") {
    route = ROUTES.DASHBOARD.MEMBER;
  } else if (role === "maintainer") {
    route = ROUTES.DASHBOARD.MAINTAINER;
  } else if (role === "admin") {
    route = ROUTES.DASHBOARD.ADMIN;
  } else {
    route = ROUTES.DASHBOARD.TRAINER;
  }

  if (isAuthenticated) {
    return <Navigate to={route} replace />;
  }

  return <Outlet />;
}
