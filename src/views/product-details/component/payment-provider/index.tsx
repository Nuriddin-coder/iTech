"use client"

import Image from "next/image";
import {FC, useEffect} from "react";

import {TProvider} from "@/types/payment";
import {Badge, Button} from "@nextui-org/react";
import {logoIcon, tickIcon} from "@/constants";

interface IPaymentProvider {
  duration: number;
  perMonth: number;
  onOpen: () => void;
  provider: TProvider;
  selectedProvider: TProvider;
  setPerMonth: (perMonth: number) => void;
}

export const PaymentProvider: FC<IPaymentProvider> = (props) => {
  const {
    onOpen,
    duration,
    provider,
    perMonth,
    setPerMonth,
    selectedProvider,
  } = props;

  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + duration);

  useEffect(() => {
    if (selectedProvider === provider) {
      setPerMonth(perMonth)
    }
  }, [duration])

  return (
    <Badge
      content={
        <Image src={tickIcon} alt="selected"/>
      }
      classNames={{
        base: "w-full",
        badge: "bg-white p-0 top-1 right-1 w-7 h-7"
      }}
      isInvisible={selectedProvider !== provider}
    >
      <div
        className={`border-primary border-2 overflow-hidden cursor-pointer w-full rounded-lg px-3 pb-3`}
      >
        <div className="flex items-center pt-3 justify-between">
          <Image src={logoIcon} className="h-8 w-auto" alt={provider}/>
          <p className="text-sm xl:text-base font-semibold">{perMonth.toLocaleString('ru')} so'mdan x {duration}</p>
        </div>
        <div
          className={`overflow-hidden grid grid-cols-2 pl-2 gap-y-1 text-xs sm:text-sm xl:text-base font-medium mt-3`}>
          <p className="break-all line-clamp-1">To’lov muddati</p>
          <p className="break-all line-clamp-1">{duration} oy</p>
          <p className="break-all line-clamp-1">Oylik to’lov</p>
          <p className="break-all line-clamp-1">{perMonth.toLocaleString('ru')} so’m</p>
          <p className="break-all line-clamp-1">To’lovning oxirgi sanasi</p>
          <p className="break-all line-clamp-1">{currentDate.toLocaleDateString('ru')}</p>
        </div>
        <Button onClick={onOpen} radius="sm" color="primary"
                className="break-all hidden md:flex w-full mt-3 text line-clamp-1 flex-1">
          Muddatli to'lovga sotib olish
        </Button>
      </div>
    </Badge>
  )
}