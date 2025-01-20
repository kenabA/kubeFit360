import { Navigate, Outlet } from "react-router";
import useAuth from "./useAuth";
import { ROUTES } from "@/config/appRoutes";

export default function ProtectedRoute() {
  const { authResponse } = useAuth();

  return authResponse ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
}
