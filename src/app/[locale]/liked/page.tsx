"use server"

import {Metadata, ResolvingMetadata} from "next";

import {LikedProductsPage} from "@/views";

export async function generateMetadata(params: {}, parent: ResolvingMetadata): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const twitterImages = (await parent).twitter?.images || [];

  return {
    title: 'Sevimli Mahsulotlaringiz - Piyola Market',
    description:
      'Sevimli mahsulotlaringizni saqlang va oson xarid qiling! Piyola Marketda tanlagan gadjetlaringizni bir joyda ko‘rib, solishtirish va xarid qilish imkoniyati.',
    keywords: 'sevimli mahsulotlar, like qilingan mahsulotlar, saqlangan elektronika, piyola market, arzon gadjetlar, tez xarid, sevimli gadjetlar',
    metadataBase: new URL(`https://piyolamerket.uz/liked`),
    alternates: {
      canonical: `https://piyolamerket.uz/liked`,
    },
    openGraph: {
      type: 'website',
      url: 'https://piyolamerket.uz/liked',
      title: 'Sevimli Mahsulotlaringiz - Piyola Market',
      description:
        'Sevimli mahsulotlaringizni saqlang va oson xarid qiling! Piyola Marketda tanlagan gadjetlaringizni bir joyda ko‘rib, solishtirish va xarid qilish imkoniyati.',
      images: previousImages,
      siteName: 'Piyola Market',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sevimli Mahsulotlaringiz - Piyola Market',
      description:
        'Sevimli mahsulotlaringizni saqlang va oson xarid qiling! Piyola Marketda tanlagan gadjetlaringizni bir joyda ko‘rib, solishtirish va xarid qilish imkoniyati.',
      images: twitterImages,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  };
}

export default async function LikedProducts() {
  return <LikedProductsPage/>
}