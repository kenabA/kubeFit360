import CountUp from "react-countup";
import heroBg from "../../../../public/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";

export default function Hero() {
  return (
    <section
      className="flex h-screen gap-12 flex-col-reverse
       lg:flex-row pt-navbar"
      id="home"
    >
      <div
        className="px-[32px] lg:px-[0px] lg:ps-[132px] w-full flex justify-center
       flex-col"
      >
        <article className="flex flex-col gap-8">
          <Heading variant={"primary"} level={1} className="text-primary">
            shape up & <br /> change your{" "}
            <span className="text-accent">life.</span>
          </Heading>
          <p className="para-md mb-[42px] max-w-[484px]">
            Join a gym that’s more than just workouts. Experience expert
            training, cutting-edge equipment, and an all-in-one platform to
            track and achieve your fitness goals.
          </p>
        </article>
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-[14px] flex-col lg:flex-row">
            <Button>join now</Button>
            <Button variant={"ghost"} className="hover:text-primary">
              get insights
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 justify-start min-w-[142px]">
              <p className="text-2xl font-bold text-accent">
                <CountUp startOnMount={false} start={0} end={30} duration={2} />
                +
              </p>
              <p
                className="uppercase font-normal
             text-[16px] text-gray-tertiary"
              >
                Members
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-start">
              <p className="text-2xl font-bold text-accent">
                <CountUp startOnMount={false} start={0} end={10} duration={2} />
                +
              </p>
              <p
                className="uppercase font-normal
             text-[16px] text-gray-tertiary"
              >
                trainers
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="size-full relative">
        <img
          className="size-full object-cover object-center"
          src={heroBg}
          alt="A couple talking to each other while doing cardio."
        />
        <div className="absolute inset-0 bg-primary opacity-75"></div>
      </div>
    </section>
  );
}
