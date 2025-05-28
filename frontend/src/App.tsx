import { useQueryClient } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import ScrollToTop from "./hooks/useScrollToTop";
import CheckNewUser from "./system/components/app-initializer";
import { Route, Routes } from "react-router";
import PublicRoute from "./system/features/authentication/public-route";
import Spinner from "./system/components/spinner/spinner";
import WebsiteLayout from "./layout/website-layout";
import LandingPage from "./website/pages/landing-page/landing-page";
import { ROUTES } from "./config/appRoutes";
import SuccessStories from "./website/layout/sections/success-stories/success-stories";

import Membership from "./website/layout/sections/membership/membership";
import LoginLayout from "./layout/auth/login-layout";
import Login from "./system/pages/login/login";
import ForgotPassword from "./system/pages/forgot-password/forgot-password";
import ResetPassword from "./system/pages/reset-password/reset-password";
import PasswordChanged from "./system/pages/reset-password/password-changed";
import SignupLayout from "./layout/auth/sign-layout";
import Signup from "./system/pages/signup/sign-up";
import SystemLayout from "./layout/system-layout";
import ProtectedRoute from "./system/features/authentication/protected-route";
import MaintainerDashboard from "./system/pages/maintainer/dashboard/dashboard";
import CheckMembership from "./system/components/check-membership";
import MemberDashboard from "./system/pages/member/dashboard/dashboard";
import Notices from "./system/pages/notices/notices";
import ClientMembership from "./system/pages/member/client-membership/client-membership";
import TrainerDashboard from "./system/pages/trainer/dashboard/dashboard";
import AdminDashboard from "./system/pages/admin/dashboard/dashboard";
import Maintainer from "./system/pages/admin/maintainer/maintainer";
import Trainer from "./system/pages/admin/trainer/trainer";
import Client from "./system/pages/admin/client/client";
import SignUpRequest from "./system/pages/admin/client/signup-request/signup-request";
import ClientWorkoutPlan from "./system/pages/member/client-workout-plan/client-workout-plan";
import WorkoutPlanRequests from "./system/pages/trainer/workout-plan-requests/workout-plan-requests";
import CreateWorkoutPlan from "./system/pages/trainer/workout-plan/create-workout-plan/create-workout-plan";
import Equipments from "./system/pages/maintainer/equipments/equipments";
import Settings from "./system/pages/settings/settings";
import PostPaymentLogin from "./system/pages/post-payment-login/post-payment-login";
import PaymentSuccess from "./system/pages/admin/payment/payment-success";
import PaymentFailure from "./system/pages/admin/payment/payment-failure";
import PageNotFound from "./components/page-not-found/PageNotFound";
import About from "./website/pages/about/about";

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
