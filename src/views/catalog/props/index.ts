"use client"

import {useFetchData} from "@/hooks";
import {TCategoryData} from "@/types/category";

export const useCatalogProps = () => {
  const {data} = useFetchData<TCategoryData>({
    url: '/categories/public',
    params: {isParent: true, limit: 'all'},
  });

  return {
    data: data?.data,
  }
}