import {FC} from "react";
import Image from "next/image";
import {v4 as uuid} from "uuid";

import {TLocale} from "@/types";
import {Chip} from "@nextui-org/chip";
import {toggleLike} from "@/features";
import {Button} from "@nextui-org/react";
import {IProduct} from "@/types/product";
import {handleLikeProduct} from "@/utils";
import {IPaymentInfo} from "@/types/payment";
import {heartFilledIcon, heartIcon} from "@/constants";
import {useAppDispatch, useAppSelector} from "@/hooks";

import {AdditionalInfo} from "../additional-info";

interface IProductInfo {
  data: IProduct;
  locale: TLocale;
  paymentInfo: IPaymentInfo;
}

export const ProductInfo: FC<IProductInfo> = ({locale, paymentInfo, data}) => {
  const {_id, name, type, price} = data;

  const {liked} = useAppSelector(store => store.liked);

  const dispatch = useAppDispatch();
  const isLiked = liked.has(_id);

  const onToggleLike = () => {
    dispatch(toggleLike(data));
  }

  const onLike = () => {
    handleLikeProduct({
      isLiked,
      onToggleLike,
      productId: _id,
      userId: uuid().toString(),
    })
  }

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <h1 className="text-xl sm:text-2xl font-semibold">{name[locale]}</h1>
      <Chip
        size="lg"
        radius="md"
        className="bg-green-100 text-green-600 mb-1 sm:mb-2 md:mb-3"
        classNames={{
          content: "text-sm sm:text-lg font-semibold",
        }}
      >
        {type === "NEW" ? "Yangi Mahsulot" : "Foydalanilgan (B/U)"}
      </Chip>
      <div>
        <p className="text-xs sm:text-sm text-gray-400">Muddatli to'lovga sotib olish</p>
        <p className="text-xl sm:text-2xl font-bold">
          {(paymentInfo?.perMonth ?? price).toLocaleString('ru')} so'm
        </p>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-xs sm:text-sm text-gray-400">Mahsulot narxi</p>
          <p className="text-lg sm:text-xl font-bold">{price.toLocaleString('ru')} so'm</p>
        </div>
        <Button
          isIconOnly
          variant="bordered"
          aria-label="like"
          onClick={onLike}
          className="flex-1 max-w-20 absolute md:relative top-2 z-10 right-2"
          color={isLiked ? "primary" : "default"}
          style={{transition: 'all 0.4s ease'}}
        >
          <Image src={isLiked ? heartFilledIcon : heartIcon} alt="like"/>
        </Button>
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-400">Yetkazib berish</p>
        <p className="text-xl sm:text-2xl font-bold">
          {price <= 300000 ? "30 000 so'm" : "Tekin"}
        </p>
      </div>
      <AdditionalInfo className="hidden md:block"/>
    </div>
  )
}