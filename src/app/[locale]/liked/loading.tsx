import {Skeleton} from "@nextui-org/react";
import {loadingMockData} from "@/constants";
import {ProductCardLoading} from "@/components";

export default function Loading() {
  return (
    <section className="page container flex flex-col gap-2">
      <Skeleton className="h-8 sm:h-9 rounded w-full max-w-sm"/>
      <Skeleton className="h-5 sm:h-6 rounded w-full max-w-md my-2 sm:my-3 md:my-4"/>
      <div
        className="grid mb-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 gap-3 sm:gap-y-5">
        {loadingMockData?.map(item => (
          <ProductCardLoading key={item + '-product-card'}/>
        ))}
      </div>
    </section>
  )
}