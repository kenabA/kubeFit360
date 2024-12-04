import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import { servicesData } from "./data";
import { TServicesData } from "./type";
import { ArrowRight } from "lucide-react";

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
      <article className="grid md:grid-rows-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {servicesData.map((service) => (
          <ServicesCard data={service} />
        ))}
      </article>
    </section>
  );
}

function ServicesCard({ data }: { data: TServicesData }) {
  const { icon, title, description } = data;

  return (
    <div className="bg-white group py-12 px-8 rounded-[18px] shadow-elevation relative">
      <div className="space-y-6 mb-[58px]">
        <p className="para-lg font-semibold capitalize">{title}</p>
        <p className="para-sm">{description}</p>
      </div>
      <Button variant={"accentUnderline"} className="rounded-none p-0 gap-1">
        get service <ArrowRight strokeWidth={3} />
      </Button>
      <div className="absolute transition-all group-hover:-top-1 left-8 top-0 -translate-y-1/2 bg-secondary size-[60px] rounded-3xl p-2">
        <div className="bg-primary size-full rounded-2xl flex items-center justify-center">
          <img src={icon} alt="An icon featuring each service." />
        </div>
      </div>
    </div>
  );
}
