import { NavLink } from "react-router";
import { Link } from "react-scroll";
import kubeFitLogo from "@/assets/svg/kubeFitLogo/kubeFit360°-logo-white.svg";
import instagram from "@/assets/svg/Footer/instagram.svg";
import facebook from "@/assets/svg/Footer/facebook.svg";
import x from "@/assets/svg/Footer/x.svg";

export default function Footer() {
  return (
    <section
      id="footer"
      className="py-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 uni-container gap-12"
    >
      <div className="row-[2/3] lg:row-[1/2] flex flex-col gap-8">
        <figure className="flex flex-col items-start gap-[18px]">
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="hover:cursor-pointer w-fit"
          >
            <img src={kubeFitLogo} alt="Logo of kubeFit" />
          </Link>
          <span className="span text-gray-tertiary block">
            Copyright @ 2024. All rights reserved
          </span>
        </figure>
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
            Kumarigal - 7, Kathmandu, Nepal
          </a>
          <a
            href={"tel:9847162918"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            +977 9847162918
          </a>
          <a
            href={"mailto:kenabkc@gmail.com"}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            kenabkc@gmail.com
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
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="para-xl text-gray-tertiary cursor-pointer hover:text-gray-secondary"
          >
            About Gym
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={500}
            className="para-xl text-gray-tertiary cursor-pointer hover:text-gray-secondary"
          >
            Services
          </Link>
          <Link
            to="membership"
            smooth={true}
            duration={500}
            className="para-xl text-gray-tertiary cursor-pointer hover:text-gray-secondary"
          >
            Membership
          </Link>
        </div>
      </div>

      <div className="gap-6 flex flex-col items-start">
        <p className="para-2xl capitalize font-medium">Legal</p>
        <div className="flex items-start flex-col gap-[18px]">
          <NavLink
            to={""}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to={""}
            className="para-xl text-gray-tertiary hover:text-gray-secondary"
          >
            Terms & Condition
          </NavLink>
        </div>
      </div>
    </section>
  );
}
