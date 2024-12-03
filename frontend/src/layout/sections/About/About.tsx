import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import imageOne from "@/assets/images/rolling-woman.jpg";
import imageTwo from "@/assets/images/deadlifting.jpg";
import imageThree from "@/assets/images/stretching-man.jpg";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section
      className="px-5 md:max-w-[90%] md:mx-auto py-12 flex flex-col md:flex-row gap-6 md:gap-12"
      id="about"
    >
      <div
        className="grid grid-rows-[224px,134px] md:grid-rows-[244px,184px] gap-y-2 md:gap-y-3 w-full
      "
      >
        <div className="bg-secondary rounded-3xl overflow-hidden">
          <img
            className="size-full object-cover object-center"
            src={imageOne}
            alt="A woman using a rolling equipment."
          />
        </div>
        <div className="grid grid-cols-2 gap-x-2 md:gap-x-3">
          <div className="bg-secondary rounded-3xl overflow-hidden">
            <img
              className="size-full object-cover object-center"
              src={imageTwo}
              alt="A woman using a rolling equipment."
            />
          </div>
          <div className="bg-secondary rounded-3xl overflow-hidden">
            <img
              className="size-full object-cover object-center"
              src={imageThree}
              alt="A woman using a rolling equipment."
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 md:gap-8 justify-center items-start w-full">
        <Heading level={2} variant={"secondary"} className="text-primary">
          About
        </Heading>

        <p className="para-sm max-w-[584px]">
          Welcome to{" "}
          <span className="font-medium text-gray-secondary">kubeFit 360°</span>,
          your all-in-one fitness solution designed to simplify and enhance your
          fitness journey. Whether you're tracking workouts, managing
          memberships, or shopping for gym essentials, we've got you covered.
          Our platform empowers both gym members and trainers with tools to
          achieve their goals effortlessly.
        </p>

        <Button>
          read more <ArrowRight strokeWidth={3} />
        </Button>
      </div>
    </section>
  );
}
