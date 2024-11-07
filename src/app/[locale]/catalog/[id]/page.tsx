"use server"

import {Metadata, ResolvingMetadata} from "next";

import {IParams, TObject} from "@/types";
import {CatalogProductsPage} from "@/views";
import {TCategoryData} from "@/types/category";
import {getQueryClient, httpClient, queryFn} from "@/utils";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

interface ICatalogProducts {
  params: IParams & {
    id: string
  },
  searchParams: TObject,
}

export async function generateMetadata({params}: ICatalogProducts, parent: ResolvingMetadata): Promise<Metadata> {
  const {data} = await httpClient.get<TCategoryData>(`/categories/public?isParent=true&limit=all`);
  const currentCatalog = data?.data.find(item => item._id === params.id);
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${currentCatalog?.name[params.locale] ?? "Mahsulotlar"} Katalogi - Piyola Market`,
    description:
      'Piyola Marketning keng mahsulot katalogidan kerakli elektronika mahsulotlarini toping va arzon narxlarda xarid qiling. Eng yangi telefonlar, gadjetlar, aksessuarlar va ko‘proq!',
    keywords: 'katalog, mahsulot katalogi, elektronika xaridi, gadjetlar, telefonlar, aksessuarlar, arzon elektronika, piyola market katalog',
    metadataBase: new URL(`https://piyolamerket.uz/catalog/${currentCatalog?._id}`),
    openGraph: {
      title: `${currentCatalog?.name[params.locale]}`,
      description: `${currentCatalog?.name[params.locale] ?? "Mahsulotlar"} Katalogi - Piyola Market`,
      locale: params.locale,
      images: [
        currentCatalog?.image ?? '',
        ...previousImages
      ],
    },
    icons: currentCatalog?.image,
    alternates: {
      canonical: `https://piyolamerket.uz/catalog/${currentCatalog?._id}`,
    },
  };
}

export default async function CatalogProducts({params, searchParams}: Readonly<ICatalogProducts>) {
  const queryClient = getQueryClient();

  const queryParams = {
    ...searchParams,
    limit: 15,
    page: +(searchParams?.page ?? 1),
    'category._id': searchParams?.['category._id'] ?? params.id,
    select: "_id,name,slug,price,mainImage,brand,type,isPopular,discount"
  };

  await queryClient.prefetchQuery<TCategoryData>({
    queryKey: [`/products/public`, queryParams],
    queryFn: (context) => queryFn<TCategoryData>(context, queryParams)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogProductsPage/>
    </HydrationBoundary>
  )
}