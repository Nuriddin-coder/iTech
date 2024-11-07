"use server";

import {Metadata, ResolvingMetadata} from "next";

import {ProductDetailsPage} from "@/views";
import {TProviderData} from "@/types/payment";
import {IData, IParams, TObject} from "@/types";
import {IProduct, TProductData} from "@/types/product";
import {getQueryClient, httpClient, queryFn} from "@/utils";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

interface ISingleProduct {
  params: IParams & {
    slug: string;
  };
  searchParams: TObject;
}

export async function generateMetadata(
  {params}: ISingleProduct,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const {data} = await httpClient.get<IData<IProduct>>(
    `/products/${params.slug}/info`
  );
  const previousImages = (await parent).openGraph?.images || [];
  const twitterImages = (await parent).twitter?.images || [];

  return {
    title: `${data.data?.name[params.locale]} - Piyola Market`,
    description:
      "Piyola Marketning keng mahsulot katalogidan kerakli elektronika mahsulotlarini toping va arzon narxlarda xarid qiling. Eng yangi telefonlar, gadjetlar, aksessuarlar va ko‘proq!",
    keywords:
      "katalog, mahsulot katalogi, elektronika xaridi, gadjetlar, telefonlar, aksessuarlar, arzon elektronika, piyola market katalog",
    metadataBase: new URL(
      `https://piyolamerket.uz/${data?.data?.slug[params.locale]}`
    ),
    openGraph: {
      type: 'website',
      siteName: 'Piyola Market',
      url: `https://piyolamerket.uz/${data?.data?.slug[params.locale]}`,
      title: `${data.data?.name[params.locale]}`,
      description: `Mahsulot narxi ${data?.data?.price.toLocaleString('en')} so'm, oylik to'lov - ${(data.data?.price / 12).toLocaleString('en')} so'm`,
      locale: params.locale,
      images: [
        ...previousImages,
        ...(data?.data?.images?.map(({image}) => image) ?? []),
        data.data?.mainImage,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.data?.name[params.locale]}`,
      description: `Mahsulot narxi ${data?.data?.price.toLocaleString('en')} so'm, oylik to'lov - ${(data.data?.price / 12).toLocaleString('en')} so'm`,
      images: [
        ...twitterImages,
        ...(data?.data?.images?.map(({image}) => image) ?? []),
        data.data?.mainImage,
      ],
    },
    icons: data.data?.mainImage,
    alternates: {
      canonical: `https://piyolamerket.uz/${data?.data?.slug[params.locale]}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  };
}

export default async function SingleProduct({params, searchParams}: Readonly<ISingleProduct>) {
  const queryClient = getQueryClient();

  const brandParams = {
    page: 1,
    limit: 25,
  };

  const calculateParams = {
    price: +(searchParams?.price ?? 0),
    productId: searchParams?.productId,
  };

  await queryClient.prefetchQuery<IData<IProduct>>({
    queryKey: [`/products/${params.slug}/info`],
    queryFn: (context) => queryFn<IData<IProduct>>(context),
  });

  if (searchParams?.productId) {
    await queryClient.prefetchQuery<TProviderData>({
      queryKey: ["/orders/calculate", calculateParams],
      queryFn: (context) => queryFn<TProviderData>(context, calculateParams),
    });
  }

  if (searchParams?.brand && searchParams?.brand !== "undefined") {
    await queryClient.prefetchQuery<TProductData>({
      queryKey: [`/brands/${searchParams?.brand}/products`, brandParams],
      queryFn: (context) => queryFn<TProductData>(context, brandParams),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailsPage/>
    </HydrationBoundary>
  );
}
