import {FC} from "react";
import Image from "next/image";

import {IBrand} from "@/types/brand";
import {Chip} from "@nextui-org/chip";
import {useQueryParams} from "@/hooks";
import {ICatalog} from "@/types/category";
import {loadingMockData, yArrowIcon} from "@/constants";
import {Skeleton, useDisclosure} from "@nextui-org/react";

import {ProductTypeFilter} from "./type-filter";
import {ProductBrandFilter} from "./brand-filter";
import {ProductPriceFilter} from "./price-filter";
import {ProductCatalogFilter} from "./catalog-filter";

interface IMobile {
  brands?: IBrand[];
  isLoading?: boolean;
  catalog?: ICatalog[];
}

export const MobileFilter: FC<IMobile> = ({brands, isLoading, catalog}) => {
  const {setQueryParams, getQueryParams} = useQueryParams();

  const {onOpen, onOpenChange, isOpen} = useDisclosure();
  const {onOpen: onOpenBrand, onOpenChange: onOpenChangeBrand, isOpen: isOpenBrand} = useDisclosure();
  const {onOpen: onOpenPrice, onOpenChange: onOpenChangePrice, isOpen: isOpenPrice} = useDisclosure();
  const {onOpen: onOpenCatalog, onOpenChange: onOpenChangeCatalog, isOpen: isOpenCatalog} = useDisclosure();

  const clearQuery = (excludeKeys: string[]) => {
    setQueryParams({...getQueryParams(excludeKeys)});
  };

  return (
    <div
      className="fixed top-[102px] left-0 w-full py-2 bg-white border-y shadow z-50">
      <div className="hide-scroll container overflow-x-auto flex items-center gap-2 ">
        {isLoading ? (
          loadingMockData?.slice(0, 4).map(item => (
            <Skeleton key={item + '-chip'} className="h-7 w-1/4 rounded-lg"/>
          ))
        ) : (
          <>
            <Chip
              onClick={onOpen}
              className="cursor-pointer bg-gray-200 min-w-20 px-1.5"
              onClose={
                getQueryParams()?.['type']
                  ? () => clearQuery(['type'])
                  : undefined
              }
              endContent={getQueryParams()?.['type'] ? undefined : (
                <Image
                  src={yArrowIcon}
                  alt="bottom arrow"
                  className="h-4 w-4"
                />
              )}
            >
              Holat
            </Chip>
            <Chip
              onClick={onOpenBrand}
              className="cursor-pointer bg-gray-200 min-w-20 px-1.5"
              onClose={
                getQueryParams()?.['brand._id']
                  ? () => clearQuery(['brand._id'])
                  : undefined
              }
              endContent={getQueryParams()?.['brand._id'] ? undefined : (
                <Image
                  src={yArrowIcon}
                  alt="bottom arrow"
                  className="h-4 w-4"
                />
              )}
            >
              Brend
            </Chip>
            <Chip
              onClick={onOpenCatalog}
              className="cursor-pointer bg-gray-200 min-w-24 px-1.5"
              onClose={
                getQueryParams()?.['category._id']
                  ? () => clearQuery(['category._id'])
                  : undefined
              }
              endContent={getQueryParams()?.['category._id'] ? undefined : (
                <Image
                  src={yArrowIcon}
                  alt="bottom arrow"
                  className="h-4 w-4"
                />
              )}
            >
              Katalog
            </Chip>
            <Chip
              onClick={onOpenPrice}
              className="cursor-pointer bg-gray-200 min-w-20 px-1.5"
              onClose={
                getQueryParams()?.['price.gte'] || getQueryParams()?.['price.lte']
                  ? () => clearQuery(['price.gte', 'price.lte'])
                  : undefined
              }
              endContent={getQueryParams()?.['price.gte'] || getQueryParams()?.['price.lte']
                ? undefined : (
                  <Image
                    src={yArrowIcon}
                    alt="bottom arrow"
                    className="h-4 w-4"
                  />
                )}
            >
              Narx
            </Chip>
          </>
        )}
      </div>
      <ProductTypeFilter
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <ProductBrandFilter
        data={brands}
        isOpen={isOpenBrand}
        onOpenChange={onOpenChangeBrand}
      />
      <ProductCatalogFilter
        data={catalog}
        isOpen={isOpenCatalog}
        onOpenChange={onOpenChangeCatalog}
      />
      <ProductPriceFilter
        isOpen={isOpenPrice}
        onOpenChange={onOpenChangePrice}
      />
    </div>
  )
}