// Core React + Routing
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";

// Hook and utilities (keep normal)
import ScrollToTop from "@/hooks/useScrollToTop";
import { ROUTES } from "@/config/appRoutes";
import ProtectedRoute from "@/system/features/authentication/ProtectedRoute";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./system/components/spinner/Spinner";
import Trainer from "./system/pages/admin/trainer/trainer";
import SignUpRequest from "./system/pages/admin/client/signup-request/signup-request";
import PaymentStatus from "./system/pages/admin/payment/payment-status";

// ✅ Website Pages (lazy)
const LandingPage = lazy(
  () => import("@/website/pages/LandingPage/LandingPage")
);
const About = lazy(() => import("@/website/pages/About/About"));
const SuccessStories = lazy(
  () => import("@/website/layout/sections/SuccessStories/SuccessStories")
);
const Membership = lazy(
  () => import("@/website/layout/sections/Membership/Membership")
);

// ✅ Layouts (lazy)
const WebsiteLayout = lazy(() => import("@/layout/WebsiteLayout"));
const LoginLayout = lazy(() => import("./layout/auth/LoginLayout"));
const SignupLayout = lazy(() => import("@/layout/auth/SignupLayout"));
const SystemLayout = lazy(() => import("./layout/SystemLayout"));

// ✅ Auth Pages (lazy)
const Login = lazy(() => import("@/system/pages/Login/Login"));
const Signup = lazy(() => import("@/system/pages/SignUp/SignUp"));
const ForgotPassword = lazy(
  () => import("@/system/pages/forgot-password/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("@/system/pages/ResetPassword/ResetPassword")
);
const PasswordChanged = lazy(
  () => import("@/system/pages/ResetPassword/PasswordChanged")
);

// ✅ Admin Pages (lazy)
const AdminDashboard = lazy(
  () => import("./system/pages/admin/Dashboard/Dashboard")
);
const Maintainer = lazy(
  () => import("./system/pages/admin/Maintainer/Maintainer")
);

// ✅ Maintainer Pages (lazy)
const MaintainerDashboard = lazy(
  () => import("./system/pages/Maintainer/Dashboard/Dashboard")
);
const Equipments = lazy(
  () => import("./system/pages/Maintainer/Equipments/Equipments")
);

// ✅ Trainer Pages (lazy)
const TrainerDashboard = lazy(
  () => import("./system/pages/Trainer/Dashboard/Dashboard")
);
const WorkoutPlanRequests = lazy(
  () =>
    import("./system/pages/Trainer/workout-plan-requests/WorkoutPlanRequests")
);
const CreateWorkoutPlan = lazy(
  () =>
    import(
      "./system/pages/Trainer/workout-plan/create-workout-plan/CreateWorkoutPlan"
    )
);

// ✅ Member Pages (lazy)
const MemberDashboard = lazy(
  () => import("./system/pages/Member/dashboard/dashboard")
);
const ClientWorkoutPlan = lazy(
  () => import("./system/pages/Member/client-workout-plan/client-workout-plan")
);

// ✅ Shared Pages (lazy)
const Settings = lazy(() => import("./system/pages/settings/Settings"));
const Notices = lazy(() => import("./system/pages/notices/notices"));
const Unauthorized = lazy(
  () => import("./components/unauthorized/Unauthorized")
);
const PageNotFound = lazy(
  () => import("./components/page-not-found/PageNotFound")
);

export default function App() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      queryClient.setQueryData(["user"], JSON.parse(storedUser));
    }
  }, [queryClient]);

  return (
    <React.Fragment>
      <ScrollToTop />
      <Routes>
        {/* ======= WEBSITE ROUTES ======= */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <WebsiteLayout />
            </Suspense>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route
            path={ROUTES.TESTIMONIAL}
            element={
              <Suspense fallback={<Spinner />}>
                <SuccessStories />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.MEMBERSHIP}
            element={
              <Suspense fallback={<Spinner />}>
                <Membership />
              </Suspense>
            }
          />
        </Route>

        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.PASSWORD_CHANGED} element={<PasswordChanged />} />
        </Route>

        <Route element={<SystemLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["maintainer"]} />}>
            <Route
              path={ROUTES.DASHBOARD.MAINTAINER}
              element={<MaintainerDashboard />}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route
              path={ROUTES.DASHBOARD.MEMBER}
              element={<MemberDashboard />}
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer", "member"]}
              />
            }
          >
            <Route path={ROUTES.NOTICES} element={<Notices />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["trainer"]} />}>
            <Route
              path={ROUTES.DASHBOARD.TRAINER}
              element={<TrainerDashboard />}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path={ROUTES.DASHBOARD.ADMIN} element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path={ROUTES.MAINTAINERS} element={<Maintainer />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path={ROUTES.TRAINERS} element={<Trainer />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path={ROUTES.SIGNUP_REQUEST} element={<SignUpRequest />} />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route
              path={ROUTES.WORKOUT_PLAN.MEMBER}
              element={<ClientWorkoutPlan />}
            />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "trainer"]} />}
          >
            <Route
              path={ROUTES.WORKOUT_PLAN_REQUESTS}
              element={<WorkoutPlanRequests />}
            />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "trainer"]} />}
          >
            <Route
              path={ROUTES.WORKOUT_PLAN.CREATE}
              element={<CreateWorkoutPlan />}
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer"]}
              />
            }
          >
            <Route path={ROUTES.EQUIPMENTS} element={<Equipments />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer", "member"]}
              />
            }
          >
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
          </Route>
        </Route>
        <Route element={<SignupLayout />}>
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>

        <Route
          path="/payment-success"
          element={<PaymentStatus status="success" />}
        />
        <Route
          path="/payment-failure"
          element={<PaymentStatus status="failure" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}
