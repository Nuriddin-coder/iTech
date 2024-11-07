import {FC} from "react";
import {loadingMockData} from "@/constants";

import {Skeleton} from "@nextui-org/react";

export const DesktopFilterLoading: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-3/5 rounded h-4"/>
      <Skeleton className="w-full rounded h-2 mb-2"/>
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="w-full rounded h-9"/>
        <Skeleton className="w-full rounded h-9"/>
      </div>
      <Skeleton className="w-3/5 rounded h-4 mt-3 mb-2"/>
      {loadingMockData.slice(0, 5).map(item => (
        <div key={item + "-checkbox"} className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-md"/>
          <Skeleton className="h-5 flex-1 rounded"/>
        </div>
      ))}
      <Skeleton className="w-3/5 rounded h-4 my-2"/>
      {loadingMockData.slice(0, 5).map(item => (
        <div key={item + "-checkbox"} className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-md"/>
          <Skeleton className="h-5 flex-1 rounded"/>
        </div>
      ))}
    </div>
  )
}