import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "@/layout/sections/TrustedBy/TrustedBy";
import About from "@/layout/sections/About/About";
import Services from "@/layout/sections/Services/Services";
import Membership from "@/layout/sections/Membership/Membership";
import CTA from "@/layout/sections/CTA/CTA";
import SuccessStories from "@/layout/sections/SuccessStories/SuccessStories";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <About />
      <Services />
      <Membership variant="website" />
      <SuccessStories />
      <CTA />
    </>
  );
}
