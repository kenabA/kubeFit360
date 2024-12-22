import Hero from "@/website/layout/sections/Hero/Hero";
import TrustedBy from "@/website/layout/sections/TrustedBy/TrustedBy";
import About from "@/website/layout/sections/About/About";
import Services from "@/website/layout/sections/Services/Services";
import Membership from "@/website/layout/sections/Membership/Membership";
import CTA from "@/website/layout/sections/CTA/CTA";
import SuccessStories from "@/website/layout/sections/SuccessStories/SuccessStories";

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
