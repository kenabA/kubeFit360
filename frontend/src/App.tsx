import { Route, Routes } from "react-router";

import WebsiteLayout from "@/layout/WebsiteLayout";
import LandingPage from "@/website/pages/LandingPage";
import About from "@/website/pages/About";
import Membership from "@/website/layout/sections/Membership/Membership";
import SuccessStories from "@/website/layout/sections/SuccessStories/SuccessStories";

import Login from "@/system/pages/Login";
import Signup from "@/system/pages/SignUp";

import ScrollToTop from "@/components/ScrollToTop";
import AuthLayout from "@/layout/AuthLayout";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes for Website  */}
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="testimonial" element={<SuccessStories />} />
          <Route path="membership" element={<Membership variant="website" />} />
        </Route>
        {/* Routes for Auth  */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* Routes for Management System  */}
      </Routes>
    </>
  );
}
