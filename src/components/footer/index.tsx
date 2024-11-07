import {Button} from "@nextui-org/react";
import {FC} from 'react';
import Image from "next/image";

import {paymentMethods, socialData} from "@/constants";

export const Footer: FC = () => {
  return (
    <footer className="hidden lg:block mt-5 text-white">
      <div className="bg-footer py-9">
        <div className="container grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-3">
            <p>Sizda savol bormi? Unda bizga qo'ng'iroq qiling</p>
            <a className="text-2xl font-semibold" href={`tel:+998336560060`}>+998 33 656 00 60</a>
            <div className="flex my-auto items-center gap-3 flex-wrap">
              {socialData.map(({icon, text, link}) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  className="p-4 bg-icon hover:-translate-y-2 transition-400 rounded-md"
                >
                  <Image className="invert" src={icon} alt={text!}/>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-lg">To'lov usullari</p>
            <div className="grid grid-cols-3 gap-2.5">
              {paymentMethods.map((img, idx) => (
                <Button key={idx + "-payment"} isIconOnly className="w-full h-full p-0 bg-transparent">
                  <Image className="w-full h-full object-cover" src={img} alt={idx + "-payment"}/>
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col pl-5 gap-3">
            <p className="text-lg font-semibold mb-2">Mijozlar uchun</p>
            <p>Yetkazib berish usullari</p>
            <p>Maxfiylik kelishuvi</p>
            <p>Buyurtmani qaytarish tartibi</p>
            <p>Yordam markazi</p>
          </div>
        </div>
      </div>
      <div className="bg-icon py-4 text-gray-400">
        <p className="container text-center font-light text-sm">OOO “PIYOLA MARKET” | Barcha huquqlar himoyalangan</p>
      </div>
    </footer>
  );
};
