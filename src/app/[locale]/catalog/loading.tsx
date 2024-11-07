import {loadingMockData} from "@/constants";
import {CatalogCardLoading} from "@/components";

export default function Loading() {
  return (
    <section className="page container">
      <h1 className="text-lg font-medium my-3 md:my-5 md:text-xl">Kategoriyalar</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {loadingMockData.map(item => (
          <CatalogCardLoading key={item + '-catalog-card'}/>
        ))}
      </div>
    </section>
  )
}