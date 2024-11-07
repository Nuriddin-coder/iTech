import {loadingMockData} from "@/constants";
import {Skeleton} from "@nextui-org/react";

export default function Loading() {
  return (
    <section className="page flex min-h-screen flex-col gap-2 sm:gap-3 md:gap-5 container">
      <Skeleton className="h-8 sm:h-9 rounded w-full max-w-sm"/>
      <div className="grid gap-3 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex gap-2 h-full w-full min-h-96 lg:min-h-[500px]">
          <div className="w-1/5 flex flex-col gap-3 h-full">
            {loadingMockData?.slice(0, 4).map(item => (
              <Skeleton key={item + "-img"} className="w-full h-1/4"/>
            ))}
          </div>
          <Skeleton className="w-4/5 h-full rounded"/>
        </div>
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-5">
          <Skeleton className="h-7 rounded w-full max-w-sm"/>
          <Skeleton className="h-9 rounded-xl w-36 mb-1 sm:mb-2 md:mb-3"/>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 rounded w-40"/>
            <Skeleton className="h-7 rounded w-full max-w-md"/>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 rounded w-40"/>
            <Skeleton className="h-7 rounded w-full max-w-md"/>
          </div>
          <div className="rounded-md border-2 flex flex-col w-full">
            <div className="flex p-2 items-center gap-2">
              <Skeleton className="h-10 rounded-full w-10"/>
              <Skeleton className="h-10 w-full"/>
            </div>
            <div className="flex p-2 items-center gap-2">
              <Skeleton className="h-10 rounded-full w-10"/>
              <Skeleton className="h-10 w-full"/>
            </div>
            <div className="flex p-2 items-center gap-2">
              <Skeleton className="h-10 rounded-full w-10"/>
              <Skeleton className="h-10 w-full"/>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center">
            <Skeleton className="w-full h-10 rounded-l-xl border-r border-solid border-gray-400"/>
            <Skeleton className="w-full h-10 border-r border-solid border-gray-400"/>
            <Skeleton className="w-full h-10 border-r border-solid border-gray-400"/>
            <Skeleton className="w-full h-10 rounded-r-xl"/>
          </div>
          <div className="flex flex-col gap-3 rounded-lg p-3 border-2 border-gray-200">
            <Skeleton className="w-1/2 h-4 rounded-lg"/>
            <div className="flex items-center gap-3">
              <Skeleton className="w-2/3 h-9 rounded-xl"/>
              <Skeleton className="w-1/3 h-9 rounded-xl"/>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg p-3 border-2 border-gray-200">
            <Skeleton className="w-1/2 h-4 rounded-lg"/>
            <div className="flex items-center gap-3">
              <Skeleton className="w-2/3 h-9 rounded-xl"/>
              <Skeleton className="w-1/3 h-9 rounded-xl"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}