import { Button } from "@/components/ui/button";
import { Heading } from "@/layout/components/Heading";
import summary from "@/assets/images/CTA/Summary.jpg";
import { useNavigate } from "react-router";

export default function CTA() {
  const navigate = useNavigate();
  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <section className="uni-container pt-12" id="cta">
      <div
        className="shadow-cta lg:shadow-elevation overflow-hidden bg-gradient-to-br to-[#EB9447]
       from-[#DC7418] rounded-3xl grid grid-rows-[1fr,clamp(15.625rem,10.0932rem+23.2919vw,25rem)] lg:grid-rows-none lg:grid-cols-2"
      >
        <div className="flex flex-col gap-8 justify-center py-[clamp(4rem,2.9674rem+4.3478vw,5.75rem)] ps-[clamp(3.625rem,3.1087rem+2.1739vw,4.5rem)] pe-[24px]">
          <div className="flex flex-col items-start gap-7 justify-center">
            <Heading
              level={4}
              variant={"quaternary"}
              className="text-white capitalize max-w-[410px]"
            >
              achieve your fitness goals like never before
            </Heading>
            <p className="para-xl text-white leading-[180%] max-w-[470px]">
              Your all-in-one platform for managing workouts, memberships, and{" "}
              personal goals effortlessly.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={"primaryReverse"}
              onClick={() => handleNavigate("/signup")}
            >
              join now
            </Button>
            <Button
              variant={"ghost"}
              className="text-white"
              onClick={() => handleNavigate("/login")}
            >
              login
            </Button>
          </div>
        </div>
        <figure
          className="lg:col-[2/3] lg:pt-[92px] relative
         ps-[42px] lg:ps-1 overflow-hidden"
        >
          <img
            className="size-full object-cover object-left-top  rounded-tl-2xl  shadow-cta"
            src={summary}
            alt="A screen shot of the system that the users will get access of."
          />
        </figure>
      </div>
    </section>
  );
}
