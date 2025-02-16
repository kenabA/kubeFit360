import { Navigate, Outlet } from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { ROUTES } from "@/config/appRoutes";
import { TRole } from "@/system/lib/types";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: TRole[];
}) {
  const user = useAuthUser<TUserDetails>();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (
    !user?.role ||
    (allowedRoles.length > 0 && !allowedRoles.includes(user?.role))
  ) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}
