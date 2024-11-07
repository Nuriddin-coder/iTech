"use server"

import {HomePage} from "@/views";
import {TCategoryData} from "@/types/category";
import {getQueryClient, queryFn} from "@/utils";
import {HydrationBoundary, dehydrate} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();
  const catalogParams = {isParent: true, limit: 'all'};

  await queryClient.prefetchQuery<TCategoryData>({
    queryKey: ['/categories/public', catalogParams],
    queryFn: (context) => queryFn<TCategoryData>(context, catalogParams),
  });

  await queryClient.prefetchQuery({
    queryKey: ['/products/public/group/category'],
    queryFn: (context) => queryFn<TCategoryData>(context)
  })

  await queryClient.prefetchQuery({
    queryKey: ['/products/public/shuffle'],
    queryFn: (context) => queryFn<TCategoryData>(context)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage/>
    </HydrationBoundary>
  );
}
