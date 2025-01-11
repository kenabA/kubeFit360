import Loading from "@/components/loading/Loading";
import { Navigate, Outlet } from "react-router";
import useAuth from "./useAuth";

export default function ProtectedRoute() {
  const { authResponse, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return authResponse ? <Outlet /> : <Navigate to="/login" replace />;
}
