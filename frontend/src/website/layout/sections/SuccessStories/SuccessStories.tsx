import { Heading } from "@/components/heading/Heading";
import { successStories } from "./data";
import { Swiper, SwiperSlide } from "swiper/react";
import { TSuccessStories } from "./type";
import { ArrowLeft, ArrowRight, QuoteIcon } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Compare } from "@/components/ui/compare";

export default function SuccessStories() {
  return (
    <section
      id="success-stories"
      className="uni-container py-12 space-y-[37px]"
    >
      <div className="space-y-[18px]">
        <Heading
          level={2}
          variant={"secondary"}
          className="text-center text-primary"
        >
          success stories
        </Heading>
        <p className="subtitle text-center">
          Be inspired by the transformative journeys of our members
        </p>
      </div>

      <Swiper
        spaceBetween={80}
        modules={[Navigation]}
        allowTouchMove={false}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        className="!h-full"
      >
        {successStories.map((data) => {
          return (
            // To always ensure that the swiper slide component is the direct child of the swiper component while using the map function.
            <SwiperSlide
              key={data.id}
              className="!overflow-visible relative pt-[37px]"
            >
              <div className="absolute bottom-0 right-0 rotate-180 scale-x-[-1] scale-y-[-1] md:top-0 md:right-0 md:rotate-180 md:scale-x-[-1]">
                <QuoteIcon className="fill-accent stroke-none" size={32} />
              </div>
              <SuccessStory key={data.id} data={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

function SuccessStory({ data }: { data: TSuccessStories }) {
  return (
    <div className="!flex flex-col md:flex-row gap-[32px] lg:gap-[48px]">
      <figure className="w-full bg-secondary rounded-3xl h-[clamp(21.875rem,20.0311rem+7.764vw,25rem)] overflow-hidden shadow-elevation">
        <Compare
          firstImage={data.image[0]}
          secondImage={data.image[1]}
          className="size-full shadow-none"
          firstImageClassName="object-cover object-center"
          secondImageClassname="object-cover object-center"
          slideMode="hover"
          autoplay={true}
          initialSliderPercentage={0}
        />
      </figure>
      <article className="w-full flex flex-col md:justify-between items-start gap-12 md:gap-0">
        <div className="flex flex-col gap-6 md:gap-8 items-start">
          <Heading
            variant={"quinary"}
            level={5}
            className="capitalize text-gray-secondary
      "
          >
            Mr. {data.name}
          </Heading>
          <p className="para-sm">{data.testimonial}</p>
        </div>
        <div className="flex items-center gap-12">
          <Button className="custom-prev rounded-full p-1" variant={"accent"}>
            <ArrowLeft
              style={{ width: "22px", height: "22px" }}
              strokeWidth={2}
            />
          </Button>
          <Button className="custom-next rounded-full p-1" variant={"accent"}>
            <ArrowRight
              style={{ width: "22px", height: "22px" }}
              strokeWidth={2}
            />
          </Button>
        </div>
      </article>
    </div>
  );
}
