import { Button } from "@/components/ui/button";
import kubeFitLogo from "../../../../public/kubeFit360°-logo-white.svg";
import { Link } from "react-scroll";
import { navItems } from "./data";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Listens to the scroll event on the Y axis and calls the callbackFn
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previousScrollValue = scrollY.getPrevious();
    if (previousScrollValue) {
      if (latest > previousScrollValue && latest > 72) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
  });

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      id="header"
      className="fixed top-0 left-0 w-full flex items-center justify-between px-[32px] py-4 bg-white shadow-elevation"
    >
      <Link
        to="home"
        smooth={true}
        duration={500}
        className="hover:cursor-pointer"
      >
        <img src={kubeFitLogo} alt="kubeFit Logo Light Mode" />
      </Link>
      <nav>
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
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} className="hover:text-primary">
          Login
        </Button>
        <Button variant={"primary"}>Sign Up</Button>
      </div>
    </motion.header>
  );
}
