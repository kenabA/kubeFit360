import { Route, Routes } from "react-router";

import WebsiteLayout from "./layout/WebsiteLayout";
import LandingPage from "./pages/website/LandingPage";
import { About } from "@/pages/website/About";
import Login from "@/pages/system/Login";
import SignUp from "@/pages/system/SignUp";

export default function App() {
  return (
    <Routes>
      {/* Routes for Website  */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<About />} />
      </Route>
      {/* Routes for Auth  */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Routes for Management System  */}
    </Routes>
  );
}
