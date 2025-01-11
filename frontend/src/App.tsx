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
import Dashboard from "./Dashboard";
import PageNotFound from "@/components/pageNotFound/PageNotFound";
import ProtectedRoute from "@/system/features/authentication/ProtectedRoute";

export default function App() {
  return (
    <>
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

        <Route element={<ProtectedRoute />}>
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Route>

        <Route element={<SignupLayout />}>
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
        </Route>
        <Route
          path="*"
          element={<PageNotFound errMsg="Page could not be found." />}
        />
      </Routes>
    </>
  );
}
