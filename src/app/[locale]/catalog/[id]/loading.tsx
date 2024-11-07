import {loadingMockData} from "@/constants";
import {ProductCardLoading} from "@/components";

export default function Loading() {
  return (
    <div className="grid pt-12 flex-1 mb-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-3 gap-y-5">
      {loadingMockData?.map(item => (
        <ProductCardLoading key={item + '-product-card'}/>
      ))}
    </div>
  )
}

