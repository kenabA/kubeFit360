import { ROUTES } from "@/config/appRoutes";
import useUserStore from "@/system/stores/user/useUserStore";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  if (isAuthenticated) alert(123);

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}
