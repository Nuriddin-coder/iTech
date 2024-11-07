import {TProductData} from "@/types/product";
import {useFetchData, useQueryParams} from "@/hooks";

export const useProductsProps = () => {
  const {getQueryParams, setQueryParams} = useQueryParams();

  const {data, isLoading} = useFetchData<TProductData>({
    url: `/products/public`,
    params: {
      ...getQueryParams(),
      limit: 15,
      page: +(getQueryParams()?.page ?? 1),
      select: "_id,name,slug,price,mainImage,brand,type,isPopular,discount"
    },
  });

  const setPage = (page: number) => {
    setQueryParams({...getQueryParams(), page})
  }

  return {
    setPage,
    isLoading,
    data: data?.data,
    total: data?.pagesCount ?? 0,
    page: +(getQueryParams()?.page ?? 1),
  }
}