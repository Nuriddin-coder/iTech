import {FC} from "react";

import {Skeleton} from "@nextui-org/react";

interface IProductCardLoading {
  isHorizontal?: boolean;
}

export const ProductCardLoading: FC<IProductCardLoading> = ({isHorizontal}) => {
  return (
    <div
      className={`${
        isHorizontal && 'flex-row'
      } h-full flex flex-col overflow-hidden justify-between cursor-pointer min-h-60 sm:min-h-64 md:min-h-72 lg:min-h-80 xl:min-h-96 rounded-xl relative group shadow-sm hover:shadow`}>
      <Skeleton className="overflow-hidden flex-1 flex items-center max-h-48 xsm:max-h-60 md:max-h-72"/>
      <div
        className={`${
          isHorizontal ? 'pt-4' : 'py-2'
        } px-2 flex flex-col gap-2 sm:gap-3 justify-between`}>
        <Skeleton className="h-4 w-1/3 rounded"/>
        <Skeleton className="h-4 w-full rounded"/>
        <Skeleton className="h-4 w-2/3 rounded"/>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-8 w-full rounded"/>
          <Skeleton className="h-8 w-full rounded"/>
        </div>
      </div>
    </div>
  )
}