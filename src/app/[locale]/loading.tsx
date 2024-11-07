import {Skeleton} from "@nextui-org/react";
import {loadingMockData} from "@/constants";
import {CatalogCardLoading, ProductCardLoading} from "@/components";

export default function Loading() {
  return (
    <section className="page container pb-5">
      <Skeleton className="h-60 sm:h-72 md:h-80 lg:h-[420px] rounded-lg w-full"/>
      <Skeleton className="h-5 w-full my-4 max-w-sm rounded"/>
      <div className="flex gap-3 hide-scroll overflow-x-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        {loadingMockData.map(item => (
          <CatalogCardLoading key={item + '-catalog-card'}/>
        ))}
      </div>
      <Skeleton className="h-5 w-full mb-4 max-w-sm rounded"/>
      <div
        className="grid gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6">
        {loadingMockData?.slice(0, 6).map(item => (
          <ProductCardLoading key={item + '-product-card'}/>
        ))}
      </div>
    </section>
  )
}