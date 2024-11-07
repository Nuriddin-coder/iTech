import {TProvider} from "@/types/payment";
import {ReactNode} from "react";
import {StaticImageData} from "next/image";

export type TLocale = "uz" | "ru" | "cyr";

export interface IChildren {
  children: ReactNode;
}

export interface IParams {
  locale: TLocale;
}

export interface ILocaleData {
  uz: string;
  ru: string;
  cyr: string;
}

export interface IFetchingProps {
  url: string;
  params?: TObject;
  enabled?: boolean;
}

export type TPrimitive = string | number | boolean;

export type TObject<T = TPrimitive> = Record<string, T>;

export interface IInitialData {
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface IData<T> {
  data: T;
  limit: number;
  totalCount: number;
  pagesCount: number;
  currentPage: number;
  resultCount: number;
}

export interface IPriceRange {
  'price.gte': number;
  'price.lte': number;
}

export type TOnChangePriceRange = (value: number | number[], name?: keyof IPriceRange) => void;

export type IStatus = "ACTIVE" | "INACTIVE";

export type TProductType = "ALL" | "NEW" | "OLD";

export interface ILink {
  icon: StaticImageData,
  text?: string;
  link: string;
}

export interface INavLink extends Omit<ILink, 'icon'> {
  icon: {
    outline: StaticImageData;
    filled: StaticImageData
  }
}

export interface ISelectData<T = string> {
  value: T;
  label: string;
}

export interface IImage {
  image: string;
  _id: string;
}

export interface IAdditionalInfo {
  title: string;
  content: string;
  subtitle: string;
  icon: StaticImageData;
}