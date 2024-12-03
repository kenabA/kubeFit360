import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";

export default function About() {
  return (
    <section className="max-w-[90%] mx-auto py-12 flex gap-12" id="about">
      <div className="grid">
        <img src="" alt="A woman with a rolling equipment." />
      </div>
      <div>
        <Heading
          level={2}
          variant={"secondary"}
          className="text-left text-primary mb-8"
        >
          About
        </Heading>
        <p className="para-sm mb-8 text-left">
          Experience seamless living with our product, designed for effortless
          convenience. Simplify tasks and reclaim your time with intuitive
          features and sleek design.
        </p>
        <Button>read more</Button>
      </div>
    </section>
  );
}
