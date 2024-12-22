import { AnimatePresence, motion } from "framer-motion";
import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-white.svg";
import heroBg from "@/assets/website/images/hero-bg.jpg";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import TermsAndCondition from "@/components/legal/TermsAndCondition";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { useShowStore } from "@/system/stores/useShowStore";

export default function AuthLayout() {
  const { show } = useShowStore();
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  const [isLgScreen, setIsLgScreen] = useState<boolean>(false);

  useEffect(() => {
    setHasAnimated(true);
    const checkScreenSize = () => {
      // 768px is the default 'lg' breakpoint in Tailwind
      setIsLgScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const DynamicMotionDiv = isLgScreen ? motion.div : "div";

  return (
    <section className="h-dvh overflow-hidden flex">
      <DynamicMotionDiv
        {...(isLgScreen && {
          initial: false,
          animate: { width: show ? "50%" : "100%" },
          transition: { duration: 0.5, ease: "easeInOut" },
        })}
        className={`p-6 flex flex-col justify-between items-center h-full ${
          !isLgScreen && "w-full"
        }`}
      >
        <Link to="/" className="hover:cursor-pointer w-fit self-start">
          <img src={kubeFitLogo} alt="Logo of kubeFit" />
        </Link>

        <Outlet />
        <p className="span text-slate-400 text-center leading-[1.8]">
          By creating account you agree to our{" "}
          <TermsAndCondition className="span text-accent underline" /> and
          <PrivacyPolicy className="span text-accent underline" />
        </p>
      </DynamicMotionDiv>
      <AnimatePresence initial={false}>
        {show && (
          <motion.figure
            className={`relative flex-1 `}
            {...(isLgScreen && {
              initial: hasAnimated ? { opacity: 0, x: "100%" } : false,
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: "100%" },
              transition: { duration: 0.5, ease: "easeInOut" },
            })}
          >
            <img
              className="size-full object-cover object-center"
              src={heroBg}
              alt="A couple talking to each other while doing cardio."
            />
            <div className="absolute inset-0 bg-primary opacity-75"></div>
          </motion.figure>
        )}
      </AnimatePresence>
    </section>
  );
}
