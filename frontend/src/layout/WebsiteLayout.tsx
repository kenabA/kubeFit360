import { Outlet } from "react-router";
import Navbar from "@/layout/sections/Navbar/Navbar";
import Footer from "@/layout/sections/Footer/Footer";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="mt-navbar pb-24">
        <Outlet />
      </main>
      <hr />
      <Footer />
    </>
  );
}
