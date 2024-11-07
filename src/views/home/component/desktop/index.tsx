import Image from 'next/image';
import {FC, Fragment} from 'react';
import {useLocale} from 'next-intl';

import {TLocale} from '@/types';
import {xArrowIcon} from '@/constants';
import {Button} from '@nextui-org/react';
import {Slider, useRouter} from '@/components';
import {TGroupCatalogData} from '@/types/group-catalog';

interface IDesktopView {
  data?: TGroupCatalogData;
}

export const DesktopView: FC<IDesktopView> = ({data}) => {
  const router = useRouter();
  const locale = useLocale() as TLocale;

  return (
    data?.map(({category, products}, idx) => (
      <Fragment key={category._id}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold sm:text-xl lg:text-2xl">
            {category.name[locale]}
          </p>
          <Button
            endContent={
              <Image
                src={xArrowIcon}
                alt={category.name[locale] + ' products'}
              />
            }
            onClick={() => router.push(`/products?brand._id=${products?.[0]?.brand}`)}
            className="font-medium"
            aria-label={category.name[locale] + ' products'}
          >
            Barchasini ko'rish
          </Button>
        </div>
        <Slider
          isPriority={idx === 0}
          navigation={{
            nextEl: `slideNext-${idx}`,
            prevEl: `slidePrev-${idx}`,
          }}
          sliderData={products}
          className="max-w-[98%] select-none mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        />
      </Fragment>
    ))
  );
};
