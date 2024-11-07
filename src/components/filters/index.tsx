"use client"

import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {useLocale} from "next-intl";
import {useParams} from "next/navigation";

import {TLocale} from "@/types";
import {TBrandData} from "@/types/brand";
import {homeFilledIcon} from "@/constants";
import {TCategoryData} from "@/types/category";
import {useFetchData, useMatchMedia} from "@/hooks";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

import {MobileFilter} from "./mobile";
import {DesktopFilter} from "./desktop";

export const ProductsFilter: FC = () => {
  const {id} = useParams();
  const locale = useLocale() as TLocale;
  const isSM = useMatchMedia(640);

  const {data, isLoading} = useFetchData<TCategoryData>({
    url: '/categories/public',
    params: {isParent: true, limit: 'all'},
  });

  const {data: brands, isLoading: brandLoading} = useFetchData<TBrandData>({
    url: '/brands/public',
    params: {limit: "all"}
  });

  const thisCatalog = data?.data?.find(({_id}) => _id === id);

  return (
    <aside className="flex flex-1 min-w-52 sm:max-w-56 lg:max-w-64 overflow-visible flex-col gap-5">
      {isSM === false && (
        <MobileFilter isLoading={isLoading || brandLoading} brands={brands?.data} catalog={data?.data}/>
      )}
      <div className="flex items-center gap-4">
        {id ? (
          <Breadcrumbs size={isSM ? "md" : "sm"} classNames={{list: "flex-nowrap w-max"}} variant="solid">
            <BreadcrumbItem>
              <Link aria-label="home" href="/">
                <Image
                  className="opacity-50 min-w-5 hover:opacity-100"
                  src={homeFilledIcon}
                  alt="home"
                />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link aria-label="catalog" href={'/catalog'}>
                Katalog
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem
              isLast
              className="font-semibold"
            >
              {thisCatalog?.name[locale]}
            </BreadcrumbItem>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs size={isSM ? "md" : "sm"} classNames={{list: "flex-nowrap w-max"}} variant="solid">
            <BreadcrumbItem>
              <Link aria-label="home" href="/">
                <Image
                  className="opacity-50 min-w-5 hover:opacity-100"
                  src={homeFilledIcon}
                  alt="home"
                />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem className="font-semibold" isLast>
              Products
            </BreadcrumbItem>
          </Breadcrumbs>
        )}
      </div>
      {isSM === true && (
        <DesktopFilter
          data={brands?.data}
          isLoading={brandLoading}
        />
      )}
    </aside>
  )
}