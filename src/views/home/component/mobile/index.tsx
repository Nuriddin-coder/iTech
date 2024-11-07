import Image from "next/image";
import {useInView} from 'framer-motion'
import {FC, useEffect, useRef, useState} from "react";

import {
  listIcon,
  galleryIcon,
  listFilledIcon,
  loadingMockData,
  galleryFilledIcon,
} from "@/constants";
import {useQueryParams} from "@/hooks";
import {IProduct} from "@/types/product";
import {Button} from "@nextui-org/react";
import {NoData, ProductCard, ProductCardLoading} from "@/components";

interface IMobileView {
  shuffleData?: IProduct[];
}

export const MobileView: FC<IMobileView> = ({shuffleData}) => {
  const [data, setData] = useState<IProduct[] | []>(shuffleData?.slice(0, 20) ?? []);
  const [isList, setIsList] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (shuffleData?.length && isInView) {
      if (data?.length && data?.length < shuffleData?.length) {
        const nextData = shuffleData.slice(data?.length, data.length + 20);
        setData(prev => ([...prev, ...nextData]));
      } else if (!data?.length) {
        setData(shuffleData?.slice(0, 20));
      }
    }
  }, [isInView, shuffleData]);

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-2">
        <h1 className="text-lg font-semibold">Mahsulotlar</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsList(false)} isIconOnly>
            <Image className="w-7 h-7" src={isList ? galleryIcon : galleryFilledIcon} alt="gallery"/>
          </Button>
          <Button onClick={() => setIsList(true)} isIconOnly>
            <Image className="w-7 h-7" src={isList ? listFilledIcon : listIcon} alt="gallery"/>
          </Button>
        </div>
      </div>
      <div className={`grid ${isList ? "grid-cols-1" : "grid-cols-2"}  gap-2 mt-2`}>
        {data?.map((item, idx) => (
          <ProductCard data={item} isPriority={idx < 5} isHorizontal={isList} key={item._id}/>
        ))}
      </div>
      {data?.length === shuffleData?.length ? (
        <NoData wrapperClass="mb-10" title="Tugadi 😉"/>
      ) : (
        <div
          ref={ref}
          className={`grid ${isList ? "grid-cols-1" : "grid-cols-2"}  gap-2 mt-2`}
        >
          {loadingMockData.map(item => (
            <ProductCardLoading isHorizontal={isList} key={item + '-card'}/>
          ))}
        </div>
      )}
    </>
  )
}