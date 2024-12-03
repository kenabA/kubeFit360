import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "./layout/components/TrustedBy";
import About from "./layout/sections/About/About";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <About />
      </main>
    </div>
  );
}
