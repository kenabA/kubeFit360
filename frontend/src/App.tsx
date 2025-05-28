import { useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import ScrollToTop from "./hooks/useScrollToTop";
import CheckNewUser from "./system/components/app-initializer";
import { Route, Routes } from "react-router";
import PublicRoute from "./system/features/authentication/public-route";
import Spinner from "./system/components/spinner";
import WebsiteLayout from "./layout/website-layout";
import LandingPage from "./website/pages/landing-page";
import { ROUTES } from "./config/appRoutes";
import SuccessStories from "./website/layout/sections/success-stories/success-stories-section";

import Membership from "./website/layout/sections/membership/membership-section";
import LoginLayout from "./layout/auth/login-layout";
import Login from "./system/pages/login/login-page";
import ForgotPassword from "./system/pages/forgot-password/forgot-password-page";
import ResetPassword from "./system/pages/reset-password/reset-password-page";
import PasswordChanged from "./system/pages/reset-password/password-changed";
import SignupLayout from "./layout/auth/sign-layout";
import Signup from "./system/pages/signup/sign-up";
import SystemLayout from "./layout/system-layout";
import ProtectedRoute from "./system/features/authentication/protected-route";
import MaintainerDashboard from "./system/pages/maintainer/maintainer-dashboard/dashboard";
import CheckMembership from "./system/components/check-membership";
import MemberDashboard from "./system/pages/member/member-dashboard/dashboard";
import Notices from "./system/pages/notices/notices-page";
import ClientMembership from "./system/pages/member/client-membership/client-membership-page";
import TrainerDashboard from "./system/pages/trainer/trainer-dashboard/dashboard";
import AdminDashboard from "./system/pages/admin/admin-dashboard/dashboard";
import Maintainer from "./system/pages/admin/maintainer/maintainer-page";
import Trainer from "./system/pages/admin/trainer/trainer-page";
import Client from "./system/pages/admin/client/client-page";
import SignUpRequest from "./system/pages/admin/client/signup-request/signup-request-page";
import ClientWorkoutPlan from "./system/pages/member/client-workout-plan/client-workout-plan-page";
import WorkoutPlanRequests from "./system/pages/trainer/workout-plan-requests/workout-plan-requests-page";
import CreateWorkoutPlan from "./system/pages/trainer/workout-plan/create-workout-plan/create-workout-plan-page";
import Equipments from "./system/pages/maintainer/equipments/equipments-page";
import Settings from "./system/pages/settings/settings-page";
import PostPaymentLogin from "./system/pages/post-payment-login/post-payment-login-page";
import PaymentSuccess from "./system/pages/admin/payment/payment-success";
import PaymentFailure from "./system/pages/admin/payment/payment-failure";
import PageNotFound from "./components/page-not-found/PageNotFound";
import About from "./website/pages/about";

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
          element={<PaymentSuccess status="success" />}
        />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}
