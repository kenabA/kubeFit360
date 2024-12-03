import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";
import TrustedBy from "./layout/components/TrustedBy";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
      </main>
    </div>
  );
}
