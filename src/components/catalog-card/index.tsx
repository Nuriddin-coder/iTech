"use client"

import {FC} from 'react';
import Image from 'next/image';
import {useLocale} from 'next-intl';

import {TLocale} from '@/types';
import {Link} from '@/components';
import {ICatalog} from '@/types/category';
import {Skeleton} from '@nextui-org/react';

interface IICatalogCard extends ICatalog {
  onClick?: () => void;
}

export const CatalogCard: FC<IICatalogCard> = ({image, _id, onClick, name}) => {
  const locale = useLocale() as TLocale;

  return (
    <Link
      onClick={onClick}
      href={'/catalog/[id]'}
      as={`/catalog/${_id}`}
      aria-labelledby="catalogLabel"
      className="flex flex-col-reverse text-center sm:text-start sm:flex-row sm:gap-3 bg-gray-100 py-1 px-2 rounded sm:rounded-xl min-w-20 sm:min-w-40 md:min-w-52">
      <p
        id="catalogLabel"
        className="flex-1 mt-1 md:pl-1 h-max text-xs line-clamp-1 break-all sm:text-sm md:text-base font-semibold">
        {name[locale]}
      </p>
      <Image
        src={image}
        alt={name[locale]}
        width={100}
        height={100}
        quality={100}
        className="h-14 w-14 sm:h-16 sm:w-16 object-contain md:h-20 md:w-20"
      />
    </Link>
  );
};

export const CatalogCardLoading: FC = () => {
  return <Skeleton className="max-w-52 min-w-20 sm:min-w-40 md:min-w-48 w-full h-24 rounded sm:rounded-xl"/>;
};
