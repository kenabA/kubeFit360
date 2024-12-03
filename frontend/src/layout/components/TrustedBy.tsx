import gymshark from "../../../public/gymshark.svg";
import muscleblaze from "../../../public/muscleblaze.svg";
import on from "../../../public/omptimumnutrition.svg";
import nike from "../../../public/nike.svg";
import therabody from "../../../public/therabody.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/modules";
import { Autoplay } from "swiper/modules";

export default function TrustedBy() {
  return (
    <section className="max-w-[90%] mx-auto py-12" id="trusted-by">
      <h3 className="uppercase font-semibold text-accent leading-[22px] para-3xl text-center mb-12">
        trusted by
      </h3>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        <SwiperSlide className="!flex justify-center items-center">
          <img
            className="w-auto h-8 filter brightness-0 opacity-50"
            src={gymshark}
            alt="Logo of a company that trusts this business."
          />
        </SwiperSlide>
        <SwiperSlide className="!flex justify-center items-center">
          <img
            className="w-auto h-11 filter brightness-0 opacity-50"
            src={muscleblaze}
            alt="Logo of a company that trusts this business."
          />
        </SwiperSlide>
        <SwiperSlide className="!flex justify-center items-center">
          <img
            className="w-auto h-12 filter brightness-0 opacity-50"
            src={on}
            alt="Logo of a company that trusts this business."
          />
        </SwiperSlide>
        <SwiperSlide className="!flex justify-center items-center">
          <img
            className="w-auto h-10 filter brightness-0 opacity-50"
            src={therabody}
            alt="Logo of a company that trusts this business."
          />
        </SwiperSlide>
        <SwiperSlide className="!flex justify-center items-center">
          <img
            className="w-auto h-8 filter brightness-0 opacity-50"
            src={nike}
            alt="Logo of a company that trusts this business."
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
