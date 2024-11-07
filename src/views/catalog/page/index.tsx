"use client"

import {hoc} from "@/utils";
import {CatalogCard} from "@/components";
import {Metadata} from "next";

import {useCatalogProps} from "../props";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mahsulotlar Katalogi - Piyola Market',
    description:
      'Piyola Marketning keng mahsulot katalogidan kerakli elektronika mahsulotlarini toping va arzon narxlarda xarid qiling. Eng yangi telefonlar, gadjetlar, aksessuarlar va ko‘proq!',
    keywords: 'katalog, mahsulot katalogi, elektronika xaridi, gadjetlar, telefonlar, aksessuarlar, arzon elektronika, piyola market katalog',
    metadataBase: new URL(`https://piyolamerket.uz/catalog`),
    alternates: {
      canonical: `https://piyolamerket.uz/catalog`,
    },
  };
}

export const CatalogPage = hoc(useCatalogProps, ({data}) => {
  return (
    <section className="page container">
      <h1 className="text-lg font-medium my-3 md:my-5 md:text-xl md:font-semibold">Kategoriyalar</h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.map(item => (
          <CatalogCard key={item._id} {...item} />
        ))}
      </div>
    </section>
  )
})