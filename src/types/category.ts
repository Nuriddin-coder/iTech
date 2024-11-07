import { IData, IInitialData, ILocaleData } from "@/types/index";

export interface ICatalog extends IInitialData {
  image: string;
  isParent: boolean;
  name: ILocaleData;
  slug: ILocaleData;
}

export type TCategoryData = IData<ICatalog[]>;