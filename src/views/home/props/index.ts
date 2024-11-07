import {TProductData} from "@/types/product";
import {TCategoryData} from "@/types/category";
import {useFetchData, useMatchMedia} from "@/hooks";
import {TGroupCatalogData} from "@/types/group-catalog";

export const useHomePageProps = () => {
  const isSM = useMatchMedia(640);

  const {data} = useFetchData<TCategoryData>({
    url: '/categories/public',
    params: {isParent: true, limit: 'all'},
  });
  const {data: shuffle} = useFetchData<TProductData>({url: "/products/public/shuffle"});
  const {
    data: groupCatalogData,
  } = useFetchData<TGroupCatalogData>({url: '/products/public/group/category'})

  return {
    isSM,
    data: data?.data,
    groupCatalogData,
    shuffleData: shuffle?.data,
  }
}