import {IData, IInitialData, ILocaleData, IStatus} from "@/types/index";

export interface IBrand extends IInitialData {
  name: ILocaleData;
  slug: ILocaleData;
  status: IStatus;
}

export type TBrandData = IData<IBrand[]>