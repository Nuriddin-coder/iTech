import {FC} from "react";
import Image from "next/image";
import {useLocale} from "next-intl";
import {motion} from "framer-motion";

import {TLocale} from "@/types";
import {IProduct} from "@/types/product";
import {Skeleton} from "@nextui-org/react";
import {NoData, useRouter} from "@/components";
import {loadingMockData, overlayVariants, searchImg} from "@/constants";

interface ISearch {
  search: string;
  data?: IProduct[];
  isFocused: boolean;
  isLoading: boolean;
}

export const Search: FC<ISearch> = ({isFocused, isLoading, search, data}) => {
  const router = useRouter();
  const locale = useLocale() as TLocale;

  const handleNavigate = ({slug, _id, price, brand, category}: IProduct) => {
    router.push(`/products/${slug[locale]}?price=${price}&productId=${_id}&brand=${brand?.slug?.[locale] ?? category?.slug?.[locale]}`);
  }

  return (
    <motion.div
      variants={{
        initial: {
          ...overlayVariants.initial,
          y: "2rem",
        },
        animate: {
          ...overlayVariants.animate,
          y: 0
        }
      }}
      transition={{duration: .5}}
      animate={isFocused ? "animate" : "initial"}
      className="absolute opacity-0 top-14 left-0 max-h-[calc(100vh-130px)] overflow-y-auto w-full flex flex-col gap-2 py-5 px-3 bg-white rounded-lg"
    >
      {isLoading && loadingMockData.map(num => (
        <button key={num} className="flex text-start items-center gap-3">
          <Skeleton className="h-20 w-20 rounded-lg"/>
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="w-full max-w-sm h-5 rounded"/>
            <Skeleton className="w-full max-w-36 h-4 rounded"/>
          </div>
        </button>
      ))}
      {data?.map(item => (
        <button
          key={item._id}
          onClick={() => handleNavigate(item)}
          className="flex text-start items-center gap-3"
        >
          <Image
            width={100}
            height={100}
            src={item.mainImage}
            alt={item.name[locale]}
            className="h-20 w-20 rounded-lg"
          />
          <div className="flex flex-col flex-1 gap-1">
            <p className="line-clamp-1 break-all font-semibold">{item.name[locale]}</p>
            <p>{item.price.toLocaleString('ru')} so'm</p>
          </div>
        </button>
      ))}
      {!isLoading && !data?.length && (
        <NoData
          image={searchImg}
          title={(search && !data?.length) ? "Mahsulot topilmadi!" : "Istalgan mahsulotni qidiring!"}
          subtitle={(search && !data?.length) ? `Tez orada "${search}" mahsulotini sotuvga chiqaramiz 🫠` : undefined}
        />
      )}
    </motion.div>
  )
}