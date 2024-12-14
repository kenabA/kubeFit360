import { Route, Routes } from "react-router";

import WebsiteLayout from "@/layout/WebsiteLayout";
import LandingPage from "@/pages/website/LandingPage";
import About from "@/pages/website/About";
import Membership from "@/layout/sections/Membership/Membership";
import SuccessStories from "@/layout/sections/SuccessStories/SuccessStories";

import Login from "@/pages/system/Login";
import SignUp from "@/pages/system/SignUp";

import ScrollToTop from "@/layout/ScrollToTop";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Routes for Management System  */}
      </Routes>
    </>
  );
}
