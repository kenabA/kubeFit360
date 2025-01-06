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

import ScrollToTop from "@/lib/ScrollToTop";
import LoginLayout from "./layout/auth/LoginLayout";
import SignupLayout from "@/layout/auth/SignupLayout";
import PasswordChanged from "@/system/pages/ResetPassword/PasswordChanged";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="testimonial" element={<SuccessStories />} />
          <Route path="membership" element={<Membership />} />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/passwordChanged" element={<PasswordChanged />} />
        </Route>
        <Route element={<SignupLayout />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}
