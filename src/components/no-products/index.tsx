"use client"

import {FC} from "react";

import {useRouter} from "@/components";
import {Button} from "@nextui-org/react";

interface NoProducts {
  title?: string;
  subtitle?: string;
}

export const NoProducts: FC<NoProducts> = (props) => {
  const {
    title = "Mahsulot topilmadi",
    subtitle = "Afsuski, qidiruvingiz bo’yicha hech narsa topilmadi. Kiritilgan malumotni tekshiring yoki so'rovni o'zgartirib ko'ring."
  } = props;
  const router = useRouter();

  return (
    <div className="flex flex-col bg-gray-200 py-20 px-3 rounded-md items-center justify-center gap-3 w-full">
      <h1 className="sm:text-md md:text-lg font-bold">
        {title}
      </h1>
      <p className="md:max-w-[40%] text-center">
        {subtitle}
      </p>
      <Button onClick={() => router.push('/')} color="primary">Bosh sahifaga</Button>
    </div>
  )
}