'use client';

import Image from 'next/image';
import {useLocale} from 'next-intl';
import {motion} from 'framer-motion';
import {useParams} from 'next/navigation';
import {FC, useEffect, useRef, useState} from 'react';

import {TLocale} from '@/types';
import {setLikedProducts} from "@/features";
import {TProductData} from "@/types/product";
import {TCategoryData} from '@/types/category';
import {Button, Skeleton} from '@nextui-org/react';
import {CatalogCard, useRouter} from '@/components';
import {useAppDispatch, useFetchData} from '@/hooks';
import {catalogFilledIcon, catalogIcon, loadingMockData, yArrowIcon} from '@/constants';

export const TopCatalog: FC = () => {
  const router = useRouter();
  const locale = useLocale() as TLocale;
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {data, isLoading} = useFetchData<TCategoryData>({
    url: '/categories/public',
    params: {isParent: true, limit: 'all'},
  });

  const {data: liked, isLoading: isLoadingLiked} = useFetchData<TProductData>({
    url: "/likes",
  });

  useEffect(() => {
    if (liked?.data?.length) {
      dispatch(setLikedProducts(liked?.data))
    }
  }, [isLoadingLiked]);

  const toggleIsOpen = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div className="relative hidden sm:block shadow">
      <div className="py-3 container flex items-center gap-4">
        <Button
          size="lg"
          radius="sm"
          aria-label="category"
          startContent={<Image src={isOpen ? catalogFilledIcon : catalogIcon} alt="catalog"/>}
          onClick={toggleIsOpen}
          className="bg-transparent min-w-fit hidden md:flex font-semibold"
          endContent={
            <Image className={`${!isOpen && "rotate-180"} w-5 h-5`} src={yArrowIcon} alt="down"/>
          }>
          MAHSULOTLAR KATEGORIYASI
        </Button>
        <span className="h-10 w-px bg-gray-300"/>
        <div className="flex items-center gap-3 overflow-x-auto hide-scroll">
          {isLoading
            ? loadingMockData.map(idx => (
              <Skeleton className="min-w-24 sm:min-w-36 h-11 rounded" key={idx + '-load'}/>
            ))
            : data?.data?.map(({name, slug, _id}) => (
              <Button
                size="lg"
                key={_id}
                className={`${
                  id === _id ? 'font-semibold' : 'font-medium'
                } min-w-fit`}
                aria-label={name[locale]}
                color={id === _id ? 'primary' : 'default'}
                onClick={() => router.push(`/catalog/${_id}`)}
              >
                {name[locale]}
              </Button>
            ))}
        </div>
      </div>
      <motion.div
        variants={{
          initial: {
            opacity: 0,
            height: '0px',
          },
          animate: {
            opacity: 1,
            height: `${(ref.current?.clientHeight ?? 0) + 50}px`,
          }
        }}
        initial="initial"
        animate={isOpen ? "animate" : "initial"}
        transition={{duration: .5, ease: "easeInOut"}}
        className="absolute top-20 shadow-lg z-20 bg-white w-full rounded-b-lg sm:rounded-b-xl lg:rounded-b-2xl overflow-hidden"
      >
        <div
          ref={ref}
          className={`transition-400 container gap-2 grid grid-cols-2 mt-5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5`}
        >
          {data?.data?.map(item => (
            <CatalogCard onClick={toggleIsOpen} key={item._id} {...item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
