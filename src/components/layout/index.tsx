'use server';

import {FC} from 'react';
import {IChildren} from '@/types';
import {TCategoryData} from '@/types/category';
import {getQueryClient, queryFn} from '@/utils';
import {Footer, Header, MobileNav, TopCatalog} from '@/components';
import {dehydrate, HydrationBoundary} from '@tanstack/react-query';

export const BaseLayout: FC<IChildren> = async ({children}) => {
  const queryClient = getQueryClient();
  const params = {isParent: true, limit: 'all'};

  await queryClient.prefetchQuery<TCategoryData>({
    queryKey: ['/categories/public', params],
    queryFn: context => queryFn<TCategoryData>(context, params),
  });

  return (
    <>
      <Header/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TopCatalog/>
      </HydrationBoundary>
      <main className="custom-height">{children}</main>
      <MobileNav/>
      <Footer/>
    </>
  );
};
