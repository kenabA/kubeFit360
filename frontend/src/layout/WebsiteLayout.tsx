import { ReactLenis } from "lenis/react";
import { Outlet } from "react-router";
import Navbar from "@/website/layout/sections/Navbar/Navbar";
import Footer from "@/website/layout/sections/Footer/Footer";

export default function AppLayout() {
  return (
    <ReactLenis root options={{ lerp: 0.2 }}>
      <Navbar />
      <main className="mt-navbar pb-24">
        <Outlet />
      </main>
      <hr />
      <Footer />
    </ReactLenis>
  );
}
