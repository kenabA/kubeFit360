import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "@/layout/components/TrustedBy";
import About from "@/layout/sections/About/About";
import Services from "@/layout/sections/Services/Services";
import Membership from "@/layout/sections/Membership/Membership";
import Footer from "@/layout/sections/Footer/Footer";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
        <Membership variant="website" />
        <hr />
        <Footer />
      </main>
    </div>
  );
}
