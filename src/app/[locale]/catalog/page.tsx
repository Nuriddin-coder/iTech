"use server"

import {Metadata, ResolvingMetadata} from "next";

import {CatalogPage} from "@/views";
import {TCategoryData} from "@/types/category";
import {getQueryClient, queryFn} from "@/utils";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

export async function generateMetadata(params: {}, parent: ResolvingMetadata): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const twitterImages = (await parent).twitter?.images || [];

  return {
    title: 'Mahsulotlar katalogi - Piyola Market',
    description:
      'Elektronika mahsulotlarini osongina toping! Apple, Samsung, Xiaomi va boshqa brendlar. Mahsulotlarni filtrlash, qidirish va eng arzon narxlarda xarid qilish imkoniyati.',
    keywords: 'elektronika mahsulotlari, arzon mahsulotlar, apple, samsung, xiaomi, gadjetlar, elektronika filtrlash, mahsulot qidirish',
    metadataBase: new URL(`https://piyolamerket.uz/catalog`),
    alternates: {
      canonical: `https://piyolamerket.uz/catalog`,
    },
    openGraph: {
      type: 'website',
      url: 'https://piyolamerket.uz/catalog',
      title: 'Mahsulotlar katalogi - Piyola Market',
      description:
        'Elektronika mahsulotlarini osongina toping! Apple, Samsung, Xiaomi va boshqa brendlar. Mahsulotlarni filtrlash, qidirish va eng arzon narxlarda xarid qilish imkoniyati.',
      images: previousImages,
      siteName: 'Piyola Market',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mahsulotlar katalogi - Piyola Market',
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

export default async function Catalog() {
  const queryClient = getQueryClient();
  const catalogParams = {isParent: true, limit: 'all'};

  await queryClient.prefetchQuery<TCategoryData>({
    queryKey: ['/categories/public', catalogParams],
    queryFn: (context) => queryFn<TCategoryData>(context, catalogParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPage/>
    </HydrationBoundary>
  )
}