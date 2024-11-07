'use client';

import {hoc} from '@/utils';
import {CatalogCard} from '@/components';

import {useHomePageProps} from '../props';
import {DesktopView, Banner, MobileView} from '../component';

export const HomePage = hoc(useHomePageProps, props => {
  const {data, shuffleData, isSM, groupCatalogData} = props;

  return (
    <section className="page container">
      <Banner/>
      <p className="sm:text-xl mt-4 md:text-2xl mb-3 sm:mb-6 font-bold">
        Mahsulotlar kategoriyasi
      </p>
      <div className="flex gap-3 hide-scroll overflow-x-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        {data?.map(item => (
          <CatalogCard key={item._id} {...item} />
        )).reverse()}
      </div>
      {isSM === true && (
        <DesktopView data={groupCatalogData}/>
      )}
      {isSM === false && (
        <MobileView shuffleData={shuffleData}/>
      )}
    </section>
  );
});
