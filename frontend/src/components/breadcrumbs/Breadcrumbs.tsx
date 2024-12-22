import { Home } from "lucide-react";
import { NavLink } from "react-router";

export default function Breadcrumbs() {
  return (
    <div className="ps-12 flex items-center gap-3">
      <NavLink to={"/"}>
        <Home className="stroke-gray-tertiary" style={{ width: "18px" }} />
      </NavLink>
      <span className="text-gray-tertiary">/</span>
      <NavLink
        to={"/about"}
        className={({ isActive }) =>
          isActive ? "text-primary" : "text-gray-tertiary"
        }
      >
        About
      </NavLink>
    </div>
  );
}
