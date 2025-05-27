import { Navigate, Outlet } from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { ROUTES } from "@/config/appRoutes";
import { TRole } from "@/system/lib/types";
import { TUserDetails } from "@/system/stores/user/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useUserStore from "@/system/stores/user/useUserStore";
import SetPasswordLayout from "@/layout/auth/set-password-layout";
import MembershipPlanLayout from "@/layout/auth/membership-plan-layout";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: TRole[];
}) {
  const isNewUser = useUserStore((state) => state.isNewUser);
  const subscriptionExpired = useUserStore(
    (state) => state.subscriptionExpired
  );
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

  if (user?.role === "member" && subscriptionExpired) {
    return (
      <MembershipPlanLayout>
        <Outlet />
      </MembershipPlanLayout>
    );
  }

  if (user?.role === "member" && isNewUser && !subscriptionExpired) {
    return (
      <SetPasswordLayout>
        <Outlet />
      </SetPasswordLayout>
    );
  }

  return <Outlet />;
}
