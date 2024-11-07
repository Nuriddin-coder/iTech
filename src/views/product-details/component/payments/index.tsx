"use client"

import {FC} from "react";
import Image from "next/image";

import {Badge, Button} from "@nextui-org/react";
import {paymentTerms, tickIcon} from "@/constants";
import {IPaymentInfo, TProvider, TProviderCalculation} from "@/types/payment";

import {PaymentProvider} from "../payment-provider";

interface IPayments {
  onOpen: () => void;
  paymentInfo: IPaymentInfo;
  data?: TProviderCalculation;
  setDuration: (duration: number) => void;
  setPerMonth: (perMonth: number) => void;
}

export const Payments: FC<IPayments> = (props) => {
  const {data, paymentInfo, onOpen, setPerMonth, setDuration} = props;

  return (
    <div className="flex flex-col gap-3 lg:border-l lg:pl-3">
      <p className="text-lg font-semibold">Muddatli to‘lovga rasmiylashtirish</p>
      <div className="grid grid-cols-2">
        {paymentTerms.map(num => (
          <Badge
            key={num}
            content={
              <Image src={tickIcon} alt="selected"/>
            }
            placement="top-right"
            className="bg-white p-0"
            isInvisible={paymentInfo.duration !== num}
          >
            <Button
              onClick={() => setDuration(num)}
              className={`
              ${num === 6 ? "rounded-r-none" : num === 12 ? "rounded-l-none" : "rounded-none"} 
              w-full sm:py-5 font-bold ${paymentInfo.duration === num ? "text-primary border-primary border-2" : "border-1 text-gray-400 border-gray-300"}`}
            >
              {num} {paymentInfo.duration === num ? "oyga bo'lib to'lash" : "oy"}
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {data && Object.entries(data).map(([key, value]) => {
          const perMonth = value.find(item => item.duration === paymentInfo.duration)?.perMonth;

          return perMonth ? (
            <PaymentProvider
              key={key}
              onOpen={onOpen}
              perMonth={perMonth}
              setPerMonth={setPerMonth}
              provider={key as TProvider}
              duration={paymentInfo.duration}
              selectedProvider={paymentInfo.provider}
            />
          ) : null;
        })}
      </div>
    </div>
  )
}