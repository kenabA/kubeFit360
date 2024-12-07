import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import summary from "@/assets/images/CTA/Summary.jpg";

export default function CTA() {
  return (
    <section
      className="
  
  px-5 md:max-w-[90%] md:mx-auto pb-24 pt-12"
    >
      <div className="bg-primary rounded-3xl grid grid-cols-2 py-[92px] px-[72px] relative">
        <div className="space-y-8">
          <div className="flex flex-col items-start gap-7">
            <Heading level={4} variant={"quaternary"} className="text-white">
              Lorem ipsum, dolor sit amet consectetur
            </Heading>
            <p className="para-xl text-white">
              We’re excited to talk to you about your project requirements and
              business goals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant={"primaryReverse"}>join now</Button>
            <Button variant={"ghost"} className="text-white">
              login
            </Button>
          </div>
        </div>
        <div className="rounded-tl-2xl overflow-hidden absolute w-1/2 bottom-0 right-0">
          <img
            className="size-full object-cover object-center"
            src={summary}
            alt="A screen shot of the system that the users will get access of."
          />
        </div>
      </div>
    </section>
  );
}
