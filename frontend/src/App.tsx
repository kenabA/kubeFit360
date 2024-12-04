import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "@/layout/components/TrustedBy";
import About from "@/layout/sections/About/About";
import Services from "@/layout/sections/Services/Services";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Services />
      </main>
    </div>
  );
}
