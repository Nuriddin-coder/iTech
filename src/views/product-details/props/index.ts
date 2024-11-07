import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

import { IData, TLocale } from "@/types";
import { TProviderData } from "@/types/payment";
import { useFetchData, useMatchMedia } from "@/hooks";
import { IProduct, TProductData } from "@/types/product";

export const useProductDetails = () => {
  const { slug } = useParams();
  const locale = useLocale() as TLocale;
  const isSM = useMatchMedia(640);

  const { data } = useFetchData<IData<IProduct>>({
    url: `/products/${slug}/info`,
  });

  const { data: calculateData } = useFetchData<TProviderData>({
    url: "/orders/calculate",
    params: {
      price: data?.data?.price!,
      productId: data?.data?._id!,
    },
    enabled: !!data?.data?._id,
  });

  const { data: similar } = useFetchData<TProductData>({
    url: `/brands/${data?.data?.brand.slug[locale]}/products`,
    params: {
      page: 1,
      limit: 25,
    },
    enabled: !!data?.data?.brand.slug[locale],
  });

  return {
    isSM,
    locale,
    data: data?.data,
    similarProducts: similar?.data,
    calculateData: calculateData?.data,
  };
};
