import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import imageOne from "@/assets/images/About/rolling-woman.jpg";
import imageTwo from "@/assets/images/About/deadlifting.jpg";
import imageThree from "@/assets/images/About/stretching-man.jpg";
import { ArrowRight } from "lucide-react";
import useHandleNavigate from "@/hooks/useHandleNavigate";

export default function About() {
  const handleNavigate = useHandleNavigate();

  return (
    <section
      className="px-5 md:max-w-[90%] md:mx-auto py-12 flex flex-col md:flex-row gap-6 md:gap-12"
      id="about"
    >
      <div
        className="grid grid-rows-[224px,134px] md:grid-rows-[244px,184px] gap-y-2 md:gap-y-3 w-full
      "
      >
        <figure className="bg-secondary rounded-3xl overflow-hidden">
          <img
            className="size-full object-cover object-center"
            src={imageOne}
            alt="A woman using a rolling equipment."
          />
        </figure>
        <div className="grid grid-cols-2 gap-x-2 md:gap-x-3">
          <figure className="bg-secondary rounded-3xl overflow-hidden">
            <img
              className="size-full object-cover object-center"
              src={imageTwo}
              alt="A woman using a rolling equipment."
            />
          </figure>
          <figure className="bg-secondary rounded-3xl overflow-hidden">
            <img
              className="size-full object-cover object-center"
              src={imageThree}
              alt="A woman using a rolling equipment."
            />
          </figure>
        </div>
      </div>
      <article className="flex flex-col gap-6 md:gap-8 justify-center items-start w-full">
        <Heading level={2} variant={"secondary"} className="text-primary">
          About
        </Heading>

        <p className="para-sm max-w-[584px]">
          Welcome to{" "}
          <span className="font-medium text-gray-secondary">kubeFit360°</span>,
          your all-in-one fitness solution designed to simplify and enhance your
          fitness journey. Whether you're tracking workouts, managing
          memberships, or shopping for gym essentials, we've got you covered.
          Our platform empowers both gym members and trainers with tools to
          achieve their goals effortlessly.
        </p>

        <Button onClick={() => handleNavigate("/about")}>
          read more <ArrowRight strokeWidth={3} />
        </Button>
      </article>
    </section>
  );
}
