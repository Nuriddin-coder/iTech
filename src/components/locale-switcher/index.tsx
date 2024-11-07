'use client';

import {FC} from 'react';
import {useLocale} from 'next-intl';
import {useSearchParams} from "next/navigation";

import {TLocale} from '@/types';
import {localesData} from '@/constants';
import {usePathname, useRouter} from '@/components';
import {Select, SelectItem} from '@nextui-org/react';

interface ILocaleSwitcher {
  className?: string;
}

export const LocaleSwitcher: FC<ILocaleSwitcher> = ({className}) => {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();

  const pathnameWithParams = searchParams?.length ? `${pathname}?${searchParams}` : pathname;

  const handleChange = (locale: TLocale) => {
    router.replace(pathnameWithParams, {locale});
  };

  return (
    <Select
      size="sm"
      placeholder="Select"
      classNames={{
        base: `max-w-[100px] ${className}`,
        popoverContent: 'w-min',
        value: 'text-sm font-medium',
        trigger: 'bg-transparent shadow-none',
      }}
      aria-label="language-switch"
      onChange={({target: {value}}) => handleChange(value as TLocale)}
      defaultSelectedKeys={[locale]}>
      {localesData.map(item => (
        <SelectItem key={item.value} value={item.value} color="primary">
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};
