'use client';

import Image from "next/image";
import {FC, useEffect, useState} from "react";
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';
import {FreeMode, Navigation, Thumbs, Pagination} from 'swiper/modules';

import {Fancybox} from "@fancyapps/ui";
import {IProduct} from "@/types/product";
import {discountIcon, fireIcon} from "@/constants";

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

type ISingleProductSlider = Pick<IProduct, "images" | "mainImage" | "isPopular" | "discount">

export const SingleProductSlider: FC<ISingleProductSlider> = ({mainImage, images, isPopular, discount}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {defaultType: "image"});

    return () => {
      Fancybox.destroy();
    };
  }, [images, mainImage]);

  return (
    <div className="flex gap-2 h-full max-h-96 md:max-h-[500px] w-full">
      <div className="w-1/5 h-full">
        <Swiper
          speed={500}
          freeMode={true}
          spaceBetween={10}
          slidesPerView="auto"
          direction="vertical"
          loop={images?.length > 5}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          className="max-h-full h-full w-full min-h-full"
        >
          <SwiperSlide className="!h-max cursor-pointer">
            <Image
              src={mainImage}
              alt="main-image"
              width={80}
              className="w-full border min-h-20 h-auto rounded object-contain"
              height={100}
              quality={75}
            />
          </SwiperSlide>
          {images?.map(({image, _id}) => (
            <SwiperSlide className="!h-max cursor-pointer" key={_id}>
              <Image
                src={image}
                alt="product-image"
                className="w-full border min-h-20 h-auto rounded object-contain"
                width={300}
                height={500}
                quality={75}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-4/5 h-full relative">
        {isPopular && (
          <div
            className="flex absolute z-10 top-1 left-1 bg-gradient-to-r from-[#F2F608] to-[#A5FD0A] rounded-full pr-2 items-center gap-1 p-1">
            <Image src={fireIcon} alt='top product'/>
            <p className="text-primary text-xs sm:text-sm font-bold">KO'P SOTILGAN!</p>
          </div>
        )}
        {!!discount && (
          <div
            className={`${isPopular ? "top-10" : "top-1"} z-10 flex absolute left-1 bg-pink-badge rounded-full pl-2 items-center`}>
            <p className="text-white text-sm font-bold">-5</p>
            <Image src={discountIcon} alt='discount'/>
          </div>
        )}
        <Swiper
          loop={true}
          pagination
          speed={600}
          spaceBetween={0}
          className="w-full mySwiper max-h-full h-full border rounded-lg"
          modules={[FreeMode, Thumbs, Pagination, Navigation]}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        >
          <SwiperSlide className="!h-auto !flex items-center">
            <a className="fancybox" data-fancybox-type="image" data-fancybox="gallery"
               href={mainImage}> {/* Fancybox anchor */}
              <Image
                src={mainImage}
                alt="main-image"
                width={300}
                height={500}
                className="my-auto w-full object-contain"
                quality={75}
              />
            </a>
          </SwiperSlide>
          {images?.map(({image, _id}) => (
            <SwiperSlide className="!h-auto !flex items-center" key={_id}>
              <a className="fancybox" data-fancybox-type="image" data-fancybox="gallery"
                 href={image}> {/* Fancybox anchor */}
                <Image
                  src={image}
                  alt="product-image"
                  width={300}
                  height={500}
                  className="my-auto w-full object-contain"
                  quality={75}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
