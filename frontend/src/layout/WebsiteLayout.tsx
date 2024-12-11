import { Outlet } from "react-router";
import Navbar from "@/layout/sections/Navbar/Navbar";
import Footer from "@/layout/sections/Footer/Footer";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <hr />
      <Footer />
    </>
  );
}
