import { Heading } from "@/layout/components/Heading";
import { servicesData } from "./data";
import ServicesCard from "./ServicesCard";

export default function Services() {
  return (
    <section id="services" className="uni-container py-12 space-y-[98px]">
      <div className="space-y-[18px]">
        <Heading
          level={2}
          variant={"secondary"}
          className="text-center text-primary"
        >
          services
        </Heading>
        <p className="subtitle text-center">
          Empowering your journey with expert fitness solutions.
        </p>
      </div>
      <article className="grid md:grid-rows-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10 lg:gap-12">
        {servicesData.map((service) => (
          <ServicesCard key={service.title} data={service} />
        ))}
      </article>
    </section>
  );
}
