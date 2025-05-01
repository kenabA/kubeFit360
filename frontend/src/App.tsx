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
import PaymentStatus from "./system/pages/admin/payment/payment-success";
import PaymentFailure from "./system/pages/admin/payment/payment-failure";
import CheckNewUser from "./system/components/app-initializer";
import PostPaymentLogin from "./system/pages/post-payment-login/post-payment-login";

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
const Login = lazy(() => import("@/system/pages/login/Login"));
const Signup = lazy(() => import("@/system/pages/signup/SignUp"));
const ForgotPassword = lazy(
  () => import("@/system/pages/forgot-password/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("@/system/pages/reset-password/ResetPassword")
);
const PasswordChanged = lazy(
  () => import("@/system/pages/reset-password/PasswordChanged")
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
  () => import("./system/pages/maintainer/Dashboard/Dashboard")
);
const Equipments = lazy(
  () => import("./system/pages/maintainer/Equipments/Equipments")
);

// ✅ Trainer Pages (lazy)
const TrainerDashboard = lazy(
  () => import("./system/pages/trainer/Dashboard/Dashboard")
);
const WorkoutPlanRequests = lazy(
  () =>
    import("./system/pages/trainer/workout-plan-requests/WorkoutPlanRequests")
);
const CreateWorkoutPlan = lazy(
  () =>
    import(
      "./system/pages/trainer/workout-plan/create-workout-plan/CreateWorkoutPlan"
    )
);

// ✅ Member Pages (lazy)
const MemberDashboard = lazy(
  () => import("./system/pages/member/dashboard/dashboard")
);
const ClientWorkoutPlan = lazy(
  () => import("./system/pages/member/client-workout-plan/client-workout-plan")
);

// ✅ Shared Pages (lazy)
const Settings = lazy(() => import("./system/pages/settings/Settings"));
const Notices = lazy(() => import("./system/pages/notices/notices"));

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
      <CheckNewUser />
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

        <Route
          element={
            <Suspense fallback={<Spinner />}>
              <LoginLayout />
            </Suspense>
          }
        >
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={ROUTES.PASSWORD_CHANGED} element={<PasswordChanged />} />
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
                  <Notices />
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
