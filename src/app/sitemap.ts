import {MetadataRoute} from "next";

import {httpClient} from "@/utils";
import {TProductData} from "@/types/product";
import {TCategoryData} from "@/types/category";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const {data} = await httpClient.get<TProductData>(`/products/public?limit=all`);
  const {data: catalog} = await httpClient.get<TCategoryData>("/categories/public?isParent=true&limit=all");

  const singleProductPages: MetadataRoute.Sitemap = data?.data?.map(({slug}) => ({
    url: `https://piyolamarket.uz/products/${slug.uz}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: {
        uz: `https://piyolamarket.uz/products/${slug.uz}`,
        ru: `https://piyolamarket.uz/ru/products/${slug.uz}`,
        en: `https://piyolamarket.uz/en/products/${slug.uz}`,
      },
    },
  }));

  const catalogPages: MetadataRoute.Sitemap = catalog?.data?.map(({_id}) => ({
    url: `https://piyolamarket.uz/catalog/${_id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
    alternates: {
      languages: {
        uz: `https://piyolamarket.uz/catalog/${_id}`,
        ru: `https://piyolamarket.uz/ru/catalog/${_id}`,
        en: `https://piyolamarket.uz/en/catalog/${_id}`,
      },
    },
  }));

  return [
    {
      url: "https://piyolamarket.uz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      alternates: {
        languages: {
          uz: "https://piyolamarket.uz",
          ru: "https://piyolamarket.uz/ru",
          en: "https://piyolamarket.uz/en",
        },
      },
    },
    {
      url: "https://piyolamarket.uz/products",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          uz: "https://piyolamarket.uz/products",
          ru: "https://piyolamarket.uz/ru/products",
          en: "https://piyolamarket.uz/en/products",
        },
      },
    },
    {
      url: "https://piyolamarket.uz/catalog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          uz: "https://piyolamarket.uz/catalog",
          ru: "https://piyolamarket.uz/ru/catalog",
          en: "https://piyolamarket.uz/en/catalog",
        },
      },
    },
    {
      url: "https://piyolamarket.uz/liked",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          uz: "https://piyolamarket.uz/liked",
          ru: "https://piyolamarket.uz/ru/liked",
          en: "https://piyolamarket.uz/en/liked",
        },
      },
    },
    ...(singleProductPages ?? []),
    ...(catalogPages ?? []),
  ];
}
