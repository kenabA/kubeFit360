import { NavLink } from "react-router";
import kubeFitLogo from "@/assets/svg/kubeFitLogo/kubeFit360°-logo-white.svg";

export default function Footer() {
  return (
    <section className="py-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 md:max-w-[90%] md:mx-auto gap-12">
      <div className="row-[2/3] lg:row-[1/2]">
        <img src={kubeFitLogo} alt="Logo of kubeFit" className="mb-[18px]" />
        <span className="span text-gray-tertiary block mb-8">
          Copyright @ 2024. All rights reserved
        </span>
        <div className="flex items-center gap-8">
          <NavLink to={""}>O</NavLink>
          <NavLink to={""}>O</NavLink>
          <NavLink to={""}>O</NavLink>
        </div>
      </div>
      <div>
        <p className="para-2xl capitalize font-medium mb-6">contact us</p>
        <div className="flex items-start flex-col gap-[18px]">
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Kumarigal - 7, Kathmandu, Nepal
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            +977 9847162918
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            kenabkc@gmail.com
          </NavLink>
        </div>
      </div>
      <div>
        <p className="para-2xl capitalize font-medium mb-6 whitespace-nowrap">
          Quick Navigation
        </p>
        <div className="flex items-start flex-col gap-[18px]">
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Register
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Login
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            About Gym
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Services
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Memberships
          </NavLink>
        </div>
      </div>
      <div>
        <p className="para-2xl capitalize font-medium mb-6">Legal</p>
        <div className="flex items-start flex-col gap-[18px]">
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Privacy Policy
          </NavLink>
          <NavLink to={""} className="para-xl text-gray-tertiary">
            Terms & Condition
          </NavLink>
        </div>
      </div>
    </section>
  );
}
