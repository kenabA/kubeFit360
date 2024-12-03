import CountUp from "react-countup";
import heroBg from "../../../../public/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";

export default function Hero() {
  return (
    <section
      className="flex md:h-screen  flex-col-reverse
       md:flex-row pt-navbar relative"
      id="home"
    >
      <div
        className="pb-12 px-6 pt-6 md:pb-0 md:ps-[32px] w-full flex justify-center
       flex-col"
      >
        <article className="flex flex-col gap-8">
          <Heading variant={"primary"} level={1} className="text-primary">
            shape up & <br /> change your{" "}
            <span className="text-accent">life.</span>
          </Heading>
          <p className="para-md mb-[42px] md:max-w-[484px]">
            Join a gym that’s more than just workouts. Experience expert
            training, cutting-edge equipment, and an all-in-one platform to
            track and achieve your fitness goals.
          </p>
        </article>
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-[14px] flex-col md:flex-row">
            <Button className="w-full md:w-auto">join now</Button>
            <Button
              variant={"ghost"}
              className="hover:text-primary w-full md:w-auto"
            >
              get insights
            </Button>
          </div>
          <div className="flex items-center gap-4 justify-evenly md:justify-normal">
            <div className="flex flex-col gap-2  md:min-w-[142px] text-center">
              <p className="font-bold text-accent numeric">
                <CountUp startOnMount={false} start={0} end={30} duration={2} />
                +
              </p>
              <p
                className="uppercase font-normal
             text-[clamp(0.75rem,0.6025rem+0.6211vw,1rem)] text-gray-tertiary"
              >
                Members
              </p>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="numeric font-bold text-accent">
                <CountUp startOnMount={false} start={0} end={10} duration={2} />
                +
              </p>
              <p
                className="uppercase font-normal
             text-[clamp(0.75rem,0.6025rem+0.6211vw,1rem)] text-gray-tertiary"
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
