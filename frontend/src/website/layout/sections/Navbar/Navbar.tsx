import { Button } from "@/components/ui/button";
import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-white.svg";

import { navItems } from "./data";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import { Link, NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [navbarHidden, setNavbarHidden] = useState<boolean>(false);
  const navigate = useNavigate();

  // Listens to the scroll event on the Y axis and calls the callbackFn
  useMotionValueEvent<number, "change">(scrollY, "change", (latest) => {
    const previousScrollValue = scrollY.getPrevious();
    if (previousScrollValue) {
      if (latest > previousScrollValue && latest > 72) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }
    }
  });

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={navbarHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      id="header"
      className="fixed top-0 left-0 w-full flex items-center justify-between px-[32px] py-4 bg-white shadow-elevation h-[72px] z-50"
    >
      <Link to={"/"} className="hover:cursor-pointer w-fit">
        <img src={kubeFitLogo} alt="Logo of kubeFit" />
      </Link>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `para-xl cursor-pointer ${
                    isActive
                      ? "text-primary"
                      : "text-gray-tertiary hover:text-gray-secondary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="items-center gap-2 hidden md:flex">
        <Button
          variant={"ghost"}
          className="hover:text-primary"
          onClick={() => handleNavigate("/login")}
        >
          Login
        </Button>
        <Button variant={"primary"} onClick={() => handleNavigate("/signup")}>
          Sign Up
        </Button>
      </div>
      <NavbarMenu />
    </motion.header>
  );
}
