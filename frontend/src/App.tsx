import Navbar from "@/layout/components/Navbar/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="h-full">
        <section className="h-screen bg-white" id="home"></section>
        <section className="h-screen bg-destructive" id="about"></section>
        <section className="h-screen bg-success" id="pricing"></section>
        <section className="h-screen bg-info" id="services"></section>
      </main>
    </div>
  );
}
