import {IProduct} from "@/types/product";
import {ICatalog} from "@/types/category";
import {IInitialData} from "@/types/index";

export interface IGroupCatalog extends IInitialData {
  products: IProduct[];
  category: ICatalog;
}

export type TGroupCatalogData = Array<IGroupCatalog>