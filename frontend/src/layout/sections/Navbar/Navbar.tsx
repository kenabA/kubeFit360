import { Button } from "@/components/ui/button";
import kubeFitLogo from "@/assets/svg/kubeFitLogo/kubeFit360°-logo-white.svg";
import { Link } from "react-scroll";
import { navItems } from "./data";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [navbarHidden, setNavbarHidden] = useState<boolean>(false);

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

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={navbarHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      id="header"
      className="fixed top-0 left-0 w-full flex items-center justify-between px-[32px] py-4 bg-white shadow-elevation h-[72px] z-50"
    >
      <Link
        to="home"
        smooth={true}
        duration={500}
        className="hover:cursor-pointer"
      >
        <img src={kubeFitLogo} alt="kubeFit Logo Light Mode" />
      </Link>
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                spy={true}
                to={item.to}
                smooth={true}
                duration={500}
                className="cursor-pointer transition-all text-gray-tertiary"
                activeClass=" text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="items-center gap-2 hidden md:flex">
        <Button variant={"ghost"} className="hover:text-primary">
          Login
        </Button>
        <Button variant={"primary"}>Sign Up</Button>
      </div>
      <NavbarMenu />
    </motion.header>
  );
}
