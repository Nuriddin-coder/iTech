import {FC} from "react";
import Image, {StaticImageData} from "next/image";

import {noDataIcon} from "@/constants";

interface EmptyData {
  title: string;
  subtitle?: string;
  wrapperClass?: string;
  image?: StaticImageData;
}

export const NoData: FC<EmptyData> = ({title, image, subtitle, wrapperClass}) => {
  return (
    <div className={`flex items-center justify-center flex-col ${wrapperClass}`}>
      <Image className="w-32 h-32" src={image ?? noDataIcon} alt="empty"/>
      <p className="font-semibold">{title}</p>
      {subtitle && (
        <p className="text-sm font-medium ">{subtitle}</p>
      )}
    </div>
  )
}
