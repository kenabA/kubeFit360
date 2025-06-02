import { Link, NavLink } from "react-router";

import kubeFitLogo from "@/assets/shared/svg/kubeFitLogo/kubeFit360-logo-white.svg";
import instagram from "@/assets/website/svg/Footer/instagram.svg";
import facebook from "@/assets/website/svg/Footer/facebook.svg";
import x from "@/assets/website/svg/Footer/x.svg";
import TermsAndCondition from "@/components/legal/TermsAndCondition";
import PrivacyPolicy from "@/components/legal/PrivacyPolicy";
import { GLOBAL_CONTACTS } from "@/constants";

export default function Footer() {
  return (
    <section
      id="footer"
      className="py-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 uni-container gap-12"
    >
      <div className="row-[2/3] lg:row-[1/2] flex flex-col gap-8">
        <div className="flex flex-col items-start gap-[18px]">
          <Link to={"/"} className="hover:cursor-pointer w-fit">
            <img src={kubeFitLogo} alt="Logo of kubeFit" />
          </Link>
          <span className="span text-gray-tertiary block">
            Copyright @ 2024. All rights reserved
          </span>
        </div>
        <div className="flex items-center gap-8">
          <a
            target="_blank"
            href={"https://www.instagram.com/youngphysicalfitness.np/"}
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="Logo of Instagram" />
          </a>
          <a
            target="_blank"
            href={"https://www.facebook.com/youngphysicalfitness/"}
            rel="noopener noreferrer"
          >
            <img src={facebook} alt="Logo of Facebook" />
          </a>
          <a onClick={() => alert("Coming Soon")} rel="noopener noreferrer">
            <img src={x} alt="Logo of X" />
          </a>
        </div>
      </div>

      <div className="gap-6 flex flex-col items-start">
        <p className="para-2xl capitalize font-medium text-gray whitespace-nowrap">
          contact us
        </p>
        <div className="flex items-start flex-col gap-[18px]">
          <a
            href={"https://maps.app.goo.gl/CNUx5Lni45Vj9XzF9"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
            rel="noopener noreferrer"
          >
            {GLOBAL_CONTACTS.companyAddress}
          </a>
          <a
            href={"tel:9842742225"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            {GLOBAL_CONTACTS.companyNumber}
          </a>
          <a
            href={"mailto:kenabkc@gmail.com"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            {GLOBAL_CONTACTS.companyEmail}
          </a>
        </div>
      </div>

      <div className="gap-6 flex flex-col items-start">
        <p className="para-2xl text-gray capitalize font-medium whitespace-nowrap">
          Quick Navigation
        </p>
        <div className="flex items-start flex-col gap-[18px]">
          <NavLink
            to={"/signup"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            Register
          </NavLink>
          <NavLink
            to={"/login"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            Login
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `para-xl cursor-pointer ${
                isActive
                  ? "text-primary"
                  : "text-gray-tertiary hover:text-gray-secondary"
              }`
            }
          >
            About Gym
          </NavLink>
          <NavLink
            to="/testimonial"
            className={({ isActive }) =>
              `para-xl cursor-pointer ${
                isActive
                  ? "text-primary"
                  : "text-gray-tertiary hover:text-gray-secondary"
              }`
            }
          >
            Testimonial
          </NavLink>
          <NavLink
            to="/membership"
            className={({ isActive }) =>
              `para-xl cursor-pointer ${
                isActive
                  ? "text-primary"
                  : "text-gray-tertiary hover:text-gray-secondary"
              }`
            }
          >
            Membership
          </NavLink>
        </div>
      </div>

      <div className="gap-6 flex flex-col items-start">
        <p className="para-2xl capitalize font-medium">Legal</p>
        <div className="flex items-start flex-col gap-[18px]">
          <PrivacyPolicy />
          <TermsAndCondition />
        </div>
      </div>
    </section>
  );
}
