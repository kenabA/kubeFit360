import { Heading } from "@/layout/components/Heading";
import { Separator } from "@/components/ui/separator";
import fitnessCoach from "@/assets/images/About/fitnessCoach.jpg";
import gymBg from "@/assets/images/About/deadlifting.jpg";
import Breadcrumbs from "@/layout/components/Breadcrumbs";

export function About() {
  return (
    <section id="services" className="px-5 md:max-w-[90%] md:mx-auto py-24">
      <div className="mb-[92px]">
        <div className="relative mb-8">
          <div
            className="p-12 rounded-3xl bg-gradient-to-bl from-[#EB9447]
       to-[#DC7418]  w-full md:w-[93%]"
          >
            <Heading
              level={2}
              variant={"secondary"}
              className="text-left text-white uppercase"
            >
              about
            </Heading>

            <Heading
              level={3}
              variant={"tertiary"}
              className="text-left text-white font-normal -capitalize"
            >
              kubeFit Nepal🇳🇵
            </Heading>
          </div>
          <figure className="h-full absolute bottom-0 right-0 rounded-3xl overflow-hidden hidden md:block md:translate-y-1/3">
            <div className="bg-primary inset-0 absolute opacity-40"></div>
            <img
              className="size-full object-cover object-center"
              src={gymBg}
              alt="A woman performing a deadlift."
            />
          </figure>
        </div>
        <Breadcrumbs />
      </div>
      <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-0 gap-x-2">
        <div className="w-full flex flex-col items-center gap-4">
          <figure className="shadow-elevation overflow-hidden rounded-3xl aspect-auto">
            <img
              className="size-full object-cover object-center"
              src={fitnessCoach}
              alt="Portrait of the fitness coach"
            />
          </figure>
          <p className="block para-md">
            <span className="text-gray">Mr. Kenab Kushal KC</span> / Fitness
            Coach
          </p>
        </div>
        <article className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-3 items-start">
            <Heading
              variant={"quaternary"}
              level={4}
              className="flex items-center gap-3 -capitalize text-gray-primary"
            >
              Welcome to kubeFit Nepal🇳🇵
            </Heading>
            <p className="para-md text-gray-secondary">
              A Private Gym in Kathmandu
            </p>
          </div>
          <Separator orientation="horizontal" className="bg-slate-400 w-1/5" />
          <div className="flex flex-col items-start gap-4">
            <p className="para-sm text-gray-tertiary">
              kubeFit is a premium commercial gym in Kathmandu, focused on
              modernizing the fitness experience. With advanced technologies and
              personalized services, we make fitness accessible and enjoyable
              for everyone, from beginners to pros, in a supportive and
              motivating environment.
            </p>
            <p className="para-sm text-gray-tertiary">
              Our expert trainers are highly qualified to guide members through
              safe and effective workout routines. Equipped with high-quality
              machines and tools, kubeFit ensures members have access to
              top-notch facilities for achieving their fitness goals.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
