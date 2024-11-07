import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { TLocale } from "@/types";
import { locales } from "@/constants";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as TLocale)) notFound();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    timeZone,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
