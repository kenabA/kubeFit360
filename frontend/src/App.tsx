import Navbar from "@/layout/sections/Navbar/Navbar";
import Hero from "@/layout/sections/Hero/Hero";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <section className="h-screen bg-white" id="home"></section>
        <section className="h-screen bg-destructive" id="about"></section>
        <section className="h-screen bg-success" id="pricing"></section>
        <section className="h-screen bg-info" id="services"></section>
      </main>
    </div>
  );
}
