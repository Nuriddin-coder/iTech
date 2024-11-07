'use client';

import Image from 'next/image';
import {debounce} from "lodash";
import {motion} from 'framer-motion';
import {FC, useEffect, useState} from 'react';

import {useFetchData} from "@/hooks";
import {TProductData} from "@/types/product";
import {Button, Input} from '@nextui-org/react';
import {Link, LocaleSwitcher, usePathname, useRouter} from '@/components';
import {
  logoIcon,
  heartIcon,
  searchIcon,
  heartFilledIcon,
  overlayVariants,
} from '@/constants';

import {Search} from "./search";
import {TopContent} from './top-content';

export const Header: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {data, isLoading} = useFetchData<TProductData>({
    url: "/products/public",
    params: {search},
    enabled: !!search
  });

  useEffect(() => {
    if (isFocused) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [isFocused])

  return (
    <>
      <TopContent/>
      <header className="sticky shadow pt-0 pb-1.5 sm:py-1.5 top-0 left-0 sm:mb-0 mb-3 w-full z-40 bg-white">
        <nav className="container flex flex-col lg:flex-row justify-between gap-x-3 items-center">
          <div className="flex justify-between w-full lg:w-max items-center">
            <Link
              href="/"
              aria-label="home"
              className="text-2xl lg:text-3xl font-extrabold font-sans text-primary gap-1 flex items-center">
              <Image
                priority
                width={60}
                alt="logo"
                height={60}
                src={logoIcon}
                loading="eager"
                className="w-14 h-14"
              />
              market
            </Link>
            <LocaleSwitcher className="lg:hidden"/>
          </div>
          <motion.div
            initial={"initial"}
            variants={overlayVariants}
            animate={isFocused ? "animate" : "initial"}
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 backdrop-blur"
          />
          <div className="lg:max-w-xl z-[52] relative w-full">
            <Input
              size="sm"
              radius="sm"
              variant="bordered"
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
              placeholder="Mahsulotlarni qidirish..."
              onValueChange={debounce((value: string) => setSearch(value.trim()), 1000)}
              classNames={{
                input: "text-base",
                inputWrapper: 'bg-white overflow-hidden p-0 h-10 sm:h-12 border-1 border-gray-300',
              }}
              startContent={
                <Button
                  isIconOnly
                  size="lg"
                  radius="sm"
                  aria-label="search-buton"
                  className="bg-transparent hidden sm:flex">
                  <Image className="opacity-50" src={searchIcon} alt="search"/>
                </Button>
              }
              endContent={
                <>
                  <Button
                    isIconOnly
                    size="lg"
                    radius="sm"
                    aria-label="search-buton"
                    className="bg-transparent sm:hidden">
                    <Image className="opacity-50" src={searchIcon} alt="search"/>
                  </Button>
                  <Button
                    size="lg"
                    radius="sm"
                    className="hidden sm:flex text-sm font-medium"
                    aria-label="search">
                    Izlash
                  </Button>
                </>
              }
            />
            <Search
              search={search}
              data={data?.data}
              isFocused={isFocused}
              isLoading={isLoading}
            />
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <span className="h-10 w-px bg-gray-200"/>
            <Button onClick={() => router.push('/liked')} isIconOnly radius="full" aria-label="favorite">
              <Image src={pathname === '/liked' ? heartFilledIcon : heartIcon} alt="favorites"/>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
};
