// Core React + Routing
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router";

// Hook and utilities (keep normal)
import ScrollToTop from "@/hooks/useScrollToTop";
import { ROUTES } from "@/config/appRoutes";
import ProtectedRoute from "@/system/features/authentication/protected-route.tsx";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "./system/components/spinner/Spinner";
import Trainer from "./system/pages/admin/trainer/trainer";
import SignUpRequest from "./system/pages/admin/client/signup-request/signup-request";
import PaymentStatus from "./system/pages/admin/payment/payment-success";
import PaymentFailure from "./system/pages/admin/payment/payment-failure";
import CheckNewUser from "./system/components/app-initializer";
import PostPaymentLogin from "./system/pages/post-payment-login/post-payment-login";
import ClientMembership from "./system/pages/member/client-membership/client-membership";
import CheckMembership from "./system/components/check-membership";
import Client from "./system/pages/admin/client/client";
import PublicRoute from "./system/features/authentication/public-route.tsx";
import AdminDashboard from "./system/pages/admin/dashboard/dashboard.tsx";

// ✅ Website Pages (lazy)
const LandingPage = lazy(
  () => import("@/website/pages/landing-page/landing-page.tsx")
);
const About = lazy(() => import("@/website/pages/about/about.tsx"));
const SuccessStories = lazy(
  () => import("@/website/layout/sections/success-stories/success-stories.tsx")
);
const Membership = lazy(
  () => import("@/website/layout/sections/membership/membership.tsx")
);

// ✅ Layouts (lazy)
const WebsiteLayout = lazy(() => import("@/layout/website-layout.tsx"));
const LoginLayout = lazy(() => import("./layout/auth/login-layout.tsx"));
const SignupLayout = lazy(() => import("@/layout/auth/sign-layout.tsx"));
const SystemLayout = lazy(() => import("./layout/system-layout.tsx"));

// ✅ Auth Pages (lazy)
const Login = lazy(() => import("./system/pages/login/login.tsx"));
const Signup = lazy(() => import("./system/pages/signup/sign-up.tsx"));
const ForgotPassword = lazy(
  () => import("@/system/pages/forgot-password/forgot-password.tsx")
);
const ResetPassword = lazy(
  () => import("@/system/pages/reset-password/reset-password.tsx")
);
const PasswordChanged = lazy(
  () => import("@/system/pages/reset-password/password-changed.tsx")
);

// ✅ Admin Pages (lazy)
// const AdminDashboard = lazy(() => import(""));
const Maintainer = lazy(
  () => import("./system/pages/admin/maintainer/maintainer.tsx")
);

// ✅ Maintainer Pages (lazy)
const MaintainerDashboard = lazy(
  () => import("./system/pages/maintainer/dashboard/dashboard.tsx")
);
const Equipments = lazy(
  () => import("./system/pages/maintainer/equipments/equipments.tsx")
);

// ✅ Trainer Pages (lazy)
const TrainerDashboard = lazy(
  () => import("./system/pages/trainer/dashboard/dashboard.tsx")
);
const WorkoutPlanRequests = lazy(
  () =>
    import(
      "./system/pages/trainer/workout-plan-requests/workout-plan-requests.tsx"
    )
);
const CreateWorkoutPlan = lazy(
  () =>
    import(
      "./system/pages/trainer/workout-plan/create-workout-plan/create-workout-plan.tsx"
    )
);

// ✅ Member Pages (lazy)
const MemberDashboard = lazy(
  () => import("./system/pages/member/dashboard/dashboard.tsx")
);
const ClientWorkoutPlan = lazy(
  () =>
    import("./system/pages/member/client-workout-plan/client-workout-plan.tsx")
);

// ✅ Shared Pages (lazy)
const Settings = lazy(() => import("./system/pages/settings/settings.tsx"));
const Notices = lazy(() => import("./system/pages/notices/notices.tsx"));

const PageNotFound = lazy(
  () => import("./components/page-not-found/PageNotFound.tsx")
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
      <CheckNewUser />
      <Routes>
        {/* ======= WEBSITE ROUTES ======= */}
        <Route element={<PublicRoute />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <WebsiteLayout />
              </Suspense>
            }
          >
            <Route index element={<LandingPage />} />
            <Route
              path={ROUTES.ABOUT}
              element={
                <Suspense fallback={<Spinner />}>
                  <About />
                </Suspense>
              }
            />
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
        </Route>
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <LoginLayout />
            </Suspense>
          }
        >
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
            <Route
              path={ROUTES.PASSWORD_CHANGED}
              element={<PasswordChanged />}
            />
          </Route>
        </Route>
        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <SignupLayout />
            </Suspense>
          }
        >
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>

        <Route element={<SystemLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["maintainer"]} />}>
            <Route
              path={ROUTES.DASHBOARD.MAINTAINER}
              element={
                <Suspense fallback={<Spinner />}>
                  <MaintainerDashboard />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <>
                <CheckNewUser />
                <ProtectedRoute allowedRoles={["member"]} />
              </>
            }
          >
            <Route
              path={ROUTES.DASHBOARD.MEMBER}
              element={
                <Suspense fallback={<Spinner />}>
                  <CheckMembership />
                  <MemberDashboard />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer", "member"]}
              />
            }
          >
            <Route
              path={ROUTES.NOTICES}
              element={
                <Suspense fallback={<Spinner />}>
                  <CheckMembership />
                  <Notices />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route
              path={ROUTES.CLIENT_MEMBERSHIP}
              element={
                <Suspense fallback={<Spinner />}>
                  <ClientMembership />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["trainer"]} />}>
            <Route
              path={ROUTES.DASHBOARD.TRAINER}
              element={
                <Suspense fallback={<Spinner />}>
                  <TrainerDashboard />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path={ROUTES.DASHBOARD.ADMIN}
              element={
                <Suspense fallback={<Spinner />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path={ROUTES.MAINTAINERS}
              element={
                <Suspense fallback={<Spinner />}>
                  <Maintainer />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path={ROUTES.TRAINERS}
              element={
                <Suspense fallback={<Spinner />}>
                  <Trainer />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path={ROUTES.CLIENTS}
              element={
                <Suspense fallback={<Spinner />}>
                  <Client />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path={ROUTES.SIGNUP_REQUEST}
              element={
                <Suspense fallback={<Spinner />}>
                  <SignUpRequest />
                </Suspense>
              }
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route
              path={ROUTES.WORKOUT_PLAN.MEMBER}
              element={
                <Suspense fallback={<Spinner />}>
                  <ClientWorkoutPlan />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "trainer"]} />}
          >
            <Route
              path={ROUTES.WORKOUT_PLAN_REQUESTS}
              element={
                <Suspense fallback={<Spinner />}>
                  <WorkoutPlanRequests />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "trainer"]} />}
          >
            <Route
              path={ROUTES.WORKOUT_PLAN.CREATE}
              element={
                <Suspense fallback={<Spinner />}>
                  <CreateWorkoutPlan />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer"]}
              />
            }
          >
            <Route
              path={ROUTES.EQUIPMENTS}
              element={
                <Suspense fallback={<Spinner />}>
                  <Equipments />
                </Suspense>
              }
            />
          </Route>
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "maintainer", "trainer", "member"]}
              />
            }
          >
            <Route
              path={ROUTES.SETTINGS}
              element={
                <Suspense fallback={<Spinner />}>
                  <CheckMembership />
                  <Settings />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route path="/post-payment-login" element={<PostPaymentLogin />} />
        <Route
          path="/payment-success"
          element={<PaymentStatus status="success" />}
        />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}
