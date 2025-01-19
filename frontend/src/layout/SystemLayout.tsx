import { Outlet } from "react-router";
import { Sidebar, Topbar } from "@/system/components";

export default function SystemLayout() {
  return (
    <div className="flex h-dvh">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
