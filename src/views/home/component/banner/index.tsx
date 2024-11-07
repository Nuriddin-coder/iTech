import {FC} from "react";
import Image from "next/image";
import {Swiper, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs, Pagination, Autoplay} from 'swiper/modules';

import {bannerData} from "@/constants";

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Banner: FC = () => {
  return (
    <Swiper
      loop={true}
      pagination
      speed={600}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      spaceBetween={5}
      className="w-full lg:h-[430px] mySwiper border rounded-lg"
      modules={[FreeMode, Thumbs, Pagination, Navigation, Autoplay]}
    >
      {bannerData?.map((image, idx) => (
        <SwiperSlide
          className="!h-auto"
          key={idx + '-banner'}
        >
          <Image
            priority
            src={image}
            width={1000}
            height={500}
            quality={75}
            alt="main-image"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}