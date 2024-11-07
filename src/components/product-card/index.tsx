'use client';

import Image from 'next/image';
import {v4 as uuid} from 'uuid';
import {FC, useState} from 'react';
import {useLocale} from 'next-intl';
import {motion} from 'framer-motion';

import {TLocale} from '@/types';
import {toggleLike} from "@/features";
import {useRouter} from "@/components";
import {Button} from '@nextui-org/react';
import {IProduct} from '@/types/product';
import {handleLikeProduct} from "@/utils";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {basketIcon, discountIcon, fireIcon, heartFilledIcon, heartIcon, motionVariants} from '@/constants';

interface IProductCard {
  data: IProduct;
  isPriority?: boolean;
  isHorizontal?: boolean;
}

export const ProductCard: FC<IProductCard> = props => {
  const {
    data,
    isPriority,
    isHorizontal,
  } = props;

  const {
    _id,
    name,
    slug,
    price,
    brand,
    category,
    discount,
    isPopular,
    mainImage,
  } = data;

  const router = useRouter();
  const locale = useLocale() as TLocale;
  const dispatch = useAppDispatch();
  const {liked} = useAppSelector(store => store.liked);
  const isLiked = liked.has(_id);

  const [isHovered, setIsHovered] = useState(false);

  const onToggleLike = () => {
    dispatch(toggleLike(data));
  }

  const onLike = () => {
    handleLikeProduct({
      isLiked,
      onToggleLike,
      productId: _id,
      userId: uuid().toString(),
    })
  }

  const toggleHover = () => {
    setIsHovered(prev => !prev);
  };

  const handleNavigate = () => {
    router.push(`/products/${slug[locale]}?price=${price}&productId=${_id}&brand=${brand?.slug?.[locale] ?? category?.slug?.[locale]}`)
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{once: true}}
      variants={motionVariants}
      transition={{
        duration: 0.3,
        ease: 'circOut',
        delay: Math.random() * 0.3,
      }}
      className={`${
        isHorizontal ? 'flex-row' : "flex-col justify-between min-h-52"
      } h-full flex overflow-hidden bg-white cursor-pointer rounded-xl relative group border border-gray-50 shadow-sm hover:shadow hover:border-gray-200 group`}
      onClick={handleNavigate}
    >
      <div
        className={`overflow-hidden ${isHorizontal ? "min-w-28 max-w-28" : 'flex-1'} flex items-center max-h-48 xsm:max-h-60 md:max-h-72`}>
        <Image
          width={300}
          height={500}
          quality={75}
          src={mainImage}
          alt={name[locale]}
          priority={isPriority}
          loading={isPriority ? 'eager' : 'lazy'}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      {isPopular && (
        <div
          className="flex absolute top-1 left-1 bg-gradient-to-r from-[#F2F608] to-[#A5FD0A] rounded-full pr-2 items-center gap-1 p-1">
          <Image src={fireIcon} alt='top product'/>
          <p className="text-primary text-xs sm:text-sm font-bold">KO'P SOTILGAN!</p>
        </div>
      )}
      {!!discount && (
        <div
          className={`${isPopular ? "top-10" : "top-1"} flex absolute left-1 bg-pink-badge rounded-full pl-2 items-center`}>
          <p className="text-white text-sm font-bold">-5</p>
          <Image src={discountIcon} alt='discount'/>
        </div>
      )}
      <div
        className={`${
          isHorizontal ? 'pt-4 pb-2 flex-1' : 'py-2'
        } px-2 flex flex-col gap-2 sm:gap-3 justify-between overflow-hidden`}>
        {category?.name && (
          <p className="text-gray-500 text-xs hidden sm:block">
            {category?.name[locale]}
          </p>
        )}
        <p
          className={`${
            isHorizontal ? 'line-clamp-3' : 'line-clamp-2'
          } text-xs xsm:text-sm !leading-tight sm:text-base font-medium`}>
          {name[locale]}
        </p>
        <p
          className="text-xs line-clamp-1 break-all font-bold sm:text-sm drop-shadow-md text-primary border  px-2 py-1 bg-primary bg-opacity-10 rounded-full text-center">
          {Math.round((Number(price) * 1.44) / 12).toLocaleString('en-US').replace(',', ' ')}{' '}
          so'm/oyiga
        </p>
        <div className="flex items-center justify-between relative product-buttons">
          <Button
            isIconOnly
            variant="bordered"
            aria-label="like"
            onClick={onLike}
            size={isHorizontal ? 'sm' : 'md'}
            color={isLiked ? "primary" : "default"}
            style={{transition: 'all 0.4s ease'}}
            className={`w-[48%] ${isHovered && 'translate-x-[-120%]'}`}
          >
            <Image src={isLiked ? heartFilledIcon : heartIcon} alt="like"/>
          </Button>
          <Button
            isIconOnly
            color="primary"
            onClick={handleNavigate}
            aria-label="buy product"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            style={{transition: 'all 0.4s ease'}}
            size={isHorizontal ? 'sm' : 'md'}
            className={`transition-400 absolute top-0 right-0 ${
              isHovered ? 'w-full' : 'w-[48%]'
            }`}>
            <Image className="invert" src={basketIcon} alt="like"/>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
