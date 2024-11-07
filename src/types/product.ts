import {IBrand} from "@/types/brand";
import {ICatalog} from "@/types/category";
import {IData, IImage, IInitialData, ILocaleData, TProductType} from "@/types";

export interface IProduct extends IInitialData {
  price: number;
  discount: number;
  isSale: boolean;
  status: 'ACTIVE';
  mainImage: string;
  isPopular: boolean;
  subCategory: string;
  brand: IBrand;
  images: IImage[];
  name: ILocaleData;
  slug: ILocaleData;
  category: ICatalog;
  type: TProductType;
  propertyInfo: ILocaleData;
  shortDescription: ILocaleData;
}

export type TProductData = IData<IProduct[]>