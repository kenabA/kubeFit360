import CountUp from "react-countup";
import heroBg from "../../../../public/hero-bg.jpg";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex min-h-screen pt-navbar gap-12">
      <div className="ps-[132px] pb-12 pt-[96px] w-full">
        <h1 className="capitalize text-[60px] text-primary font-bold leading-header tracking-sm mb-8">
          shape up & <br /> change your{" "}
          <span className="text-accent">life.</span>
        </h1>
        <p className="text-gray-tertiary text-[18px] leading-[1.8] mb-12">
          Join a gym that’s more than just workouts. Experience expert training,
          cutting-edge equipment, and an all-in-one platform to track and
          achieve your fitness goals.
        </p>
        <div className="flex items-center gap-[14px] mb-12">
          <Button>join now</Button>
          <Button variant={"ghost"} className="hover:text-primary">
            get insights
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 justify-start min-w-[142px]">
            <p className="text-2xl font-bold text-accent">
              <CountUp startOnMount={false} start={0} end={30} duration={2} />+
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
              <CountUp startOnMount={false} start={0} end={10} duration={2} />+
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
      <div className="w-full relative overflow-hidden">
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
