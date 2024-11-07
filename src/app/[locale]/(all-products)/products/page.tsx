"use server"

import {Metadata, ResolvingMetadata} from "next";

import {TObject} from "@/types";
import {ProductsPage} from "@/views";
import {TCategoryData} from "@/types/category";
import {getQueryClient, queryFn} from "@/utils";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

interface IProducts {
  searchParams: TObject,
}

export async function generateMetadata(params: IProducts, parent: ResolvingMetadata): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const twitterImages = (await parent).twitter?.images || [];

  return {
    title: 'Eng Arzon Elektronika Mahsulotlari - Piyola Market',
    description:
      'Elektronika mahsulotlarini osongina toping! Apple, Samsung, Xiaomi va boshqa brendlar. Mahsulotlarni filtrlash, qidirish va eng arzon narxlarda xarid qilish imkoniyati.',
    keywords: 'elektronika mahsulotlari, arzon mahsulotlar, apple, samsung, xiaomi, gadjetlar, elektronika filtrlash, mahsulot qidirish',
    metadataBase: new URL(`https://piyolamerket.uz/products`),
    alternates: {
      canonical: `https://piyolamerket.uz/products`,
    },
    openGraph: {
      type: 'website',
      url: 'https://piyolamerket.uz/products',
      title: 'Eng Arzon Elektronika Mahsulotlari - Piyola Market',
      description:
        'Elektronika mahsulotlarini osongina toping! Apple, Samsung, Xiaomi va boshqa brendlar. Mahsulotlarni filtrlash, qidirish va eng arzon narxlarda xarid qilish imkoniyati.',
      images: previousImages,
      siteName: 'Piyola Market',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Eng Arzon Elektronika Mahsulotlari - Piyola Market',
      description:
        'Elektronika mahsulotlarini osongina toping! Apple, Samsung, Xiaomi va boshqa brendlar. Mahsulotlarni filtrlash, qidirish va eng arzon narxlarda xarid qilish imkoniyati.',
      images: twitterImages,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  };
}

export default async function Products({searchParams}: Readonly<IProducts>) {
  const queryClient = getQueryClient();

  const queryParams = {
    ...searchParams,
    limit: 15,
    page: +(searchParams?.page ?? 1),
    select: "_id,name,slug,price,mainImage,brand,type,isPopular,discount"
  };

  await queryClient.prefetchQuery<TCategoryData>({
    queryKey: [`/products/public`, queryParams],
    queryFn: (context) => queryFn<TCategoryData>(context, queryParams)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage/>
    </HydrationBoundary>
  )
}