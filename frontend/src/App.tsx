import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "@/layout/components/TrustedBy";
import About from "@/layout/sections/About/About";
import { About as AboutPage } from "@/pages/website/About";
import Services from "@/layout/sections/Services/Services";
import Membership from "@/layout/sections/Membership/Membership";
import Footer from "@/layout/sections/Footer/Footer";
import CTA from "@/layout/sections/CTA/CTA";
import SuccessStories from "@/layout/sections/SuccessStories/SuccessStories";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <AboutPage />
        <Services />
        <Membership variant="website" />
        <SuccessStories />
        <CTA />
        <hr />
        <Footer />
      </main>
    </>
  );
}
