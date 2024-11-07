'use client';

import Image from 'next/image';
import {FC, useState} from 'react';
import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperProps, SwiperSlide} from 'swiper/react';

import {xArrowIcon} from '@/constants';
import {Button} from '@nextui-org/react';
import {ProductCard} from '@/components';
import {IProduct} from '@/types/product';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISlider extends SwiperProps {
  navigation?: {
    prevEl: string;
    nextEl: string;
  };
  isArrow?: boolean;
  isPriority?: boolean;
  wrapperClass?: string;
  sliderData?: IProduct[];

  [key: string]: any;
}

export const Slider: FC<ISlider> = props => {
  const {
    isArrow = true,
    sliderData = [],
    isPriority,
    wrapperClass = 'relative',
    navigation = {
      nextEl: 'slideNext',
      prevEl: 'slidePrevious',
    },
    breakpoints = {
      640: {
        slidesPerView: 3,
        spaceBetween: 5,
        slidesPerGroup: 3,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 15,
        slidesPerGroup: 4,
      },
      1300: {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 5,
      },
      1600: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
    },
    ...config
  } = props;

  const [slideStatus, setSlideStatus] = useState<'start' | 'end' | 'middle'>(
    'start',
  );

  const swiperConfig: SwiperProps = {
    speed: 700,
    breakpoints,
    allowSlideNext: true,
    allowSlidePrev: true,
    spaceBetween: 10,
    slidesPerView: 2,
    slidesPerGroup: 2,
    modules: [Navigation, Pagination],
    navigation: {
      prevEl: `.${navigation.prevEl}`,
      nextEl: `.${navigation.nextEl}`,
    },
    onSlideChange: swiper => {
      if (swiper.isBeginning || swiper.isEnd) {
        setSlideStatus(swiper.isEnd ? 'end' : 'start');
      } else if (slideStatus !== 'middle') {
        setSlideStatus('middle');
      }
    },
    ...config,
  };
  return (
    <div className={wrapperClass}>
      <Swiper {...swiperConfig}>
        {sliderData?.map((item, idx) => (
          <SwiperSlide className="!h-auto py-1" key={idx + '-slide'}>
            <ProductCard isPriority={isPriority && idx < 5} data={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
      {isArrow && (
        <>
          <Button
            size="sm"
            isIconOnly
            radius="full"
            aria-label="prev slide"
            className={`${navigation.prevEl} ${
              slideStatus === 'start' && 'hidden'
            } sm:h-10 sm:w-10 border border-gray-300 -left-2 absolute top-1/2 -translate-y-1/2 z-10`}>
            <Image src={xArrowIcon} alt="arrow left" className="rotate-180"/>
          </Button>
          <Button
            size="sm"
            isIconOnly
            radius="full"
            aria-label="next slide"
            className={`${navigation.nextEl} ${
              slideStatus === 'end' && 'hidden'
            } sm:h-10 sm:w-10 border border-gray-300 -right-2 absolute top-1/2 -translate-y-1/2 z-10`}>
            <Image src={xArrowIcon} alt="arrow left"/>
          </Button>
        </>
      )}
    </div>
  );
};
