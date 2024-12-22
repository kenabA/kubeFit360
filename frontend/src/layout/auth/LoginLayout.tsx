import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360°-logo-white.svg";
import fitnessLady from "@/assets/website/images/About/rolling-woman.webp";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import TermsAndCondition from "@/components/legal/TermsAndCondition";
import { Link, Outlet } from "react-router";

export default function LoginLayout() {
  return (
    <section
      id="login"
      className="lg:grid lg:grid-cols-2 lg:grid-rows-[100%,100%] h-dvh"
    >
      <div className="p-6 flex flex-col justify-between items-center">
        <Link to={"/"} className="hover:cursor-pointer w-fit self-start">
          <img src={kubeFitLogo} alt="Logo of kubeFit" />
        </Link>
        <Outlet />
        <p className="span text-slate-400 text-center leading-[1.8]">
          By creating account you agree to our{" "}
          <TermsAndCondition className="span text-accent underline" /> and{" "}
          <PrivacyPolicy className="span text-accent underline" />
        </p>
      </div>
      <figure className="relative hidden lg:block size-full">
        <img
          className="size-full object-cover object-center"
          src={fitnessLady}
          alt="A fit lady."
        />
        <div className="absolute inset-0 bg-primary opacity-75"></div>
      </figure>
    </section>
  );
}
