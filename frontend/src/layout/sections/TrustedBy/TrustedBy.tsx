import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/modules";
import { Autoplay } from "swiper/modules";
import { Heading } from "../../components/Heading";
import { imageData } from "./data";

export default function TrustedBy() {
  return (
    <section className="uni-container py-12 md:py-20" id="trusted-by">
      <Heading
        variant={"quinary"}
        level={5}
        className="text-center uppercase text-accent
      mb-12 md:mb-16"
      >
        trusted by
      </Heading>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
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
        {imageData.map((data) => (
          <SwiperSlide
            key={data.title}
            className="!flex justify-center items-center"
          >
            <ImageSlide imgPath={data.path} imgHeight={data.imgHeight} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function ImageSlide({
  imgPath,
  imgHeight,
}: {
  imgPath: string;
  imgHeight: string | number;
}) {
  return (
    <img
      className={"w-auto filter brightness-0 opacity-50"}
      style={{ height: imgHeight }}
      src={imgPath}
      alt="Logo of a company that trusts this business."
    />
  );
}
