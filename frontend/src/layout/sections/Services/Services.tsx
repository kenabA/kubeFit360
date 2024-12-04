import { Heading } from "@/layout/components/Heading";
import { servicesData } from "./data";
import ServicesCard from "./ServicesCard";

export default function Services() {
  return (
    <section
      id="services"
      className="px-5 md:max-w-[90%] md:mx-auto py-12 space-y-[98px]"
    >
      <div className="space-y-[18px]">
        <Heading
          level={2}
          variant={"secondary"}
          className="text-center text-primary"
        >
          services
        </Heading>
        <p className="subtitle text-center">
          Experience seamless living with our product, designed for effortless
          convenience.
        </p>
      </div>
      <article className="grid md:grid-rows-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-10 lg:gap-12">
        {servicesData.map((service) => (
          <ServicesCard data={service} />
        ))}
      </article>
    </section>
  );
}
