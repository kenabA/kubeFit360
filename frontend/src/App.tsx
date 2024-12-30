import { Route, Routes } from "react-router";

import WebsiteLayout from "@/layout/WebsiteLayout";
import LandingPage from "@/website/pages/LandingPage";
import About from "@/website/pages/About";
import Membership from "@/website/layout/sections/Membership/Membership";
import SuccessStories from "@/website/layout/sections/SuccessStories/SuccessStories";

import Login from "@/system/pages/Login";
import Signup from "@/system/pages/SignUp";
import ForgotPassword from "@/system/pages/ForgotPassword";

import ScrollToTop from "@/components/ScrollToTop";
import LoginLayout from "./layout/auth/LoginLayout";
import SignupLayout from "@/layout/auth/SignupLayout";

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
        </Route>
        <Route element={<SignupLayout />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}
