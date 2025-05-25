import CountUp from "react-countup";
import heroBg from "@/assets/website/images/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading/Heading";
import useHandleNavigate from "@/hooks/useHandleNavigate";
import { Link } from "react-scroll";
import useUsersAnalytics from "@/system/features/users/members/useUsersAnalytics";

export default function Hero() {
  const handleNavigate = useHandleNavigate();

  const { data } = useUsersAnalytics();
  console.log(data);
  const memberCount = data.data.filter((user) => user.role === "member");
  const trainerCount = data.data.filter((user) => user.role === "trainer");

  return (
    <section
      className="flex md:h-[calc(100vh-72px)] flex-col-reverse
    md:flex-row relative gap-2"
      id="home"
    >
      <div className="w-full">
        <div
          className="hero-container h-full flex justify-center
       flex-col"
        >
          <article className="flex flex-col gap-8">
            <Heading variant={"primary"} level={1} className="text-primary">
              shape up & <br /> change your{" "}
              <span className="text-accent">life.</span>
            </Heading>
            <p className="para-md mb-[42px] md:max-w-[584px]">
              Join a gym that’s more than just workouts. Experience expert
              training, cutting-edge equipment, and an all-in-one platform to
              track and achieve your fitness goals.
            </p>
          </article>
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-[14px] flex-col md:flex-row">
              <Button
                className="w-full md:w-auto"
                onClick={() => handleNavigate("/signup")}
              >
                join now
              </Button>
              <Link spy={true} smooth={true} duration={500} to="about">
                <Button
                  variant={"ghost"}
                  className="hover:text-primary w-full md:w-auto"
                >
                  get insights
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 justify-evenly md:justify-normal">
              <div className="flex flex-col gap-2  text-center md:text-left md:min-w-[142px]">
                <p className="font-bold text-accent numeric">
                  <CountUp
                    startOnMount={false}
                    start={0}
                    end={memberCount[0].total - 1 || 30}
                    duration={2}
                  />
                  +
                </p>
                <p
                  className="uppercase font-normal
             text-[clamp(0.75rem,0.6025rem+0.6211vw,1rem)] text-gray-tertiary"
                >
                  Members
                </p>
              </div>
              <div className="flex flex-col gap-2 text-center md:text-left">
                <p className="numeric font-bold text-accent">
                  <CountUp
                    startOnMount={false}
                    start={0}
                    end={trainerCount[0].total - 1 || 30}
                    duration={2}
                  />
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
      </div>
      <figure className="size-full relative">
        <img
          className="size-full object-cover object-center"
          src={heroBg}
          alt="A couple talking to each other while doing cardio."
        />
        <div className="absolute inset-0 bg-primary opacity-75"></div>
      </figure>
    </section>
  );
}
