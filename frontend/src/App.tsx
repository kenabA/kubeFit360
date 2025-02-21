import { Route, Routes } from "react-router";

import WebsiteLayout from "@/layout/WebsiteLayout";
import LandingPage from "@/website/pages/LandingPage/LandingPage";
import About from "@/website/pages/About/About";
import Membership from "@/website/layout/sections/Membership/Membership";
import SuccessStories from "@/website/layout/sections/SuccessStories/SuccessStories";

import Login from "@/system/pages/Login/Login";
import Signup from "@/system/pages/SignUp/SignUp";
import ForgotPassword from "@/system/pages/ForgotPassword/ForgotPassword";
import ResetPassword from "@/system/pages/ResetPassword/ResetPassword";

import ScrollToTop from "@/hooks/useScrollToTop";
import LoginLayout from "./layout/auth/LoginLayout";
import SignupLayout from "@/layout/auth/SignupLayout";
import PasswordChanged from "@/system/pages/ResetPassword/PasswordChanged";
import { ROUTES } from "@/config/appRoutes";

import ProtectedRoute from "@/system/features/authentication/ProtectedRoute";
import React from "react";
import SystemLayout from "./layout/SystemLayout";

import AdminDashboard from "./system/pages/Admin/Dashboard/Dashboard";
import Equipments from "./system/pages/Maintainer/Equipments/Equipments";
import MaintainerDashboard from "./system/pages/Maintainer/Dashboard/Dashboard";
import Maintainer from "./system/pages/Admin/Maintainer/Maintainer";
import Unauthorized from "./components/unauthorized/Unauthorized";
import PageNotFound from "./components/page-not-found/PageNotFound";
import TrainerDashboard from "./system/pages/Trainer/Dashboard/Dashboard";
import WorkoutPlanRequests from "./system/pages/Trainer/WorkoutPlanRequests/WorkoutPlanRequests";
import CreateWorkoutPlan from "./system/pages/Trainer/workout-plan/create-workout-plan/CreateWorkoutPlan";

export default function App() {
  return (
    <React.Fragment>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.TESTIMONIAL} element={<SuccessStories />} />
          <Route path={ROUTES.MEMBERSHIP} element={<Membership />} />
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
        </Route>
        <Route element={<SignupLayout />}>
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </React.Fragment>
  );
}
