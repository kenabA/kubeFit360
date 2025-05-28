import Hero from "@/website/layout/sections/Hero/Hero";
import TrustedBy from "@/website/layout/sections/TrustedBy/TrustedBy";
import About from "@/website/layout/sections/About/About";
import Services from "@/website/layout/sections/Services/Services";

import CTA from "@/website/layout/sections/CTA/CTA";
import SuccessStories from "@/website/layout/sections/success-stories/success-stories-section";
import Membership from "@/website/layout/sections/membership/membership-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Membership />
      <SuccessStories />
      <CTA />
    </>
  );
}
