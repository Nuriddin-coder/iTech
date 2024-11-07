import {
  homeIcon,
  humoIcon,
  visaIcon,
  payMeIcon,
  clickIcon,
  heartIcon,
  uzCardIcon,
  shieldIcon,
  catalogIcon,
  youTubeIcon,
  telegramIcon,
  bannerOneImg,
  bannerTwoImg,
  uzumLogoIcon,
  alifLogoIcon,
  anorBankIcon,
  deliveryIcon,
  facebookIcon,
  instagramIcon,
  bannerFourImg,
  bannerFiveImg,
  bannerThreeImg,
  homeFilledIcon,
  doubleCheckIcon,
  heartFilledIcon,
  catalogFilledIcon, bannerSixImg, bannerSevenImg,
} from "@/constants";
import {TProvider} from "@/types/payment";
import {StaticImageData} from "next/image";
import {ISelectData, ILink, TLocale, INavLink, TProductType, IAdditionalInfo} from "@/types";

export const locales: TLocale[] = ["uz", 'cyr', 'ru'];

export const socialData: ILink[] = [
  {
    icon: telegramIcon,
    link: "https://t.me/piyola_market",
    text: "Telegram"
  }, {
    icon: instagramIcon,
    link: "https://www.instagram.com/piyola_market",
    text: "Instagram"
  }, {
    icon: facebookIcon,
    link: "https://www.facebook.com",
    text: "Facebook"
  }, {
    icon: youTubeIcon,
    link: "https://www.youTube.com",
    text: "YouTube"
  }
]

export const localesData: ISelectData<TLocale>[] = [
  {value: "uz", label: "O'zbek"},
  // {value: "ru", label: "Русский"},
  // {value: "cyr", label: "Узбек"},
]

export const loadingMockData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const motionVariants = {
  initial: {opacity: 0, y: 25, scale: .95},
  animate: {opacity: 1, y: 0, scale: 1},
}

export const overlayVariants = {
  initial: {
    opacity: 0,
    display: "none",
    zIndex: -1,
  },
  animate: {
    opacity: 1,
    display: "flex",
    zIndex: 51,
  }
}

export const productStatusData: ISelectData<TProductType>[] = [
  {label: 'Barchasi', value: 'ALL'},
  {label: 'Yangi mahsulotlar', value: 'NEW'},
  {label: 'B/U mahsulotlar', value: 'OLD'},
];

export const navLinks: INavLink[] = [
  {
    link: '/catalog',
    text: "Katalog",
    icon: {
      filled: catalogFilledIcon,
      outline: catalogIcon,
    }
  },
  {
    link: '/',
    text: "Asosiy",
    icon: {
      filled: homeFilledIcon,
      outline: homeIcon,
    }
  }, {
    link: '/liked',
    text: "Saqlangan",
    icon: {
      filled: heartFilledIcon,
      outline: heartIcon,
    }
  }
]

export const additionalInfoData: IAdditionalInfo[] = [
  {
    title: "Mahsulot do'konda mavjud!",
    subtitle: "Sifat va mavjudlik kafolati",
    icon: doubleCheckIcon,
    content: `
       <h3>Bo'lib to'lash imkoniyatlari:</h3>
        <p>
          Siz mahsulotni 6, 12, 18 yoki 24 oylik bo'lib to'lash asosida xarid qilishingiz mumkin.
          Ushbu imkoniyat sizga mahsulotni qulay va oson usulda xarid qilish imkonini beradi.
        </p>
        <ul>
          <li>
            <strong>6 oylik bo'lib to'lash:</strong> Har oyda qulay miqdorda to'lov amalga oshiring
            va mahsulotdan hoziroq bahramand bo'ling.
          </li>
          <li>
            <strong>12 oylik bo'lib to'lash:</strong> Har oyda kichik miqdorda to'lov bilan katta
            xarajatlarni bo'lib-bo'lib qoplang.
          </li>
          <li>
            <strong>18 oylik bo'lib to'lash:</strong> Uzoq muddatli va qulay to'lov shartlari bilan
            mahsulotni hoziroq sotib oling.
          </li>
          <li>
            <strong>24 oylik bo'lib to'lash:</strong> Minimal to'lovlar bilan mahsulotni uzoq
            muddatga bo'lib to'lash imkoniyati.
          </li>
        </ul>
        <p>
          Bo'lib to'lash imkoniyati mahsulotni xarid qilishni yanada qulay va oson qiladi.
          Mahsulotni hoziroq sotib olib, to'lovlarni kelgusida amalga oshiring!
        </p>
    `
  }, {
    title: "Rasmiy kafolat",
    subtitle: "1 yil",
    icon: shieldIcon,
    content: `
      <p>Ushbu mahsulot rasmiy 1 yillik kafolat bilan ta'minlanadi.</p>
      <p>
        Mahsulotda har qanday nuqson yoki muammolar yuzaga kelganda, siz kafolat asosida bepul
        xizmat yoki almashtirish imkoniyatidan foydalanishingiz mumkin.
      </p>
      <h3>Kafolat shartlari:</h3>
      <ul>
        <li>
          <strong>Bepul ta'mirlash:</strong> Mahsulotda ishlab chiqarish nuqsonlari bo'lsa, bepul
          ta'mirlash xizmatlari taqdim etiladi.
        </li>
        <li>
          <strong>Mahsulotni almashtirish:</strong> Ta'mirlash imkoni bo'lmagan holatlarda
          mahsulotni yangi nusxasi bilan almashtirish imkoniyati mavjud.
        </li>
        <li>
          <strong>Kafolat shartlari:</strong> Kafolat faqat ishlab chiqarish nuqsonlariga nisbatan
          qo'llaniladi. Foydalanuvchi tomonidan noto'g'ri ishlatish natijasida yuzaga kelgan
          muammolar kafolat doirasiga kirmaydi.
        </li>
      </ul>
      <p>
        Kafolat shartlari haqida qo'shimcha ma'lumot olish uchun bizning mijozlarga xizmat
        ko'rsatish markazimizga murojaat qiling.
      </p>
    `
  }, {
    title: "Yetkazib berish xizmati",
    subtitle: "O'zbekiston bo'ylab bepul",
    icon: deliveryIcon,
    content: `
      <p>Ushbu mahsulot O'zbekiston bo'ylab bepul yetkazib beriladi.</p>
      <h3>Yetkazib berish haqida:</h3>
      <ul>
        <li>
          <strong>Bepul yetkazib berish:</strong> Sizga hech qanday qo'shimcha to'lovsiz
          mahsulotingizni manzilingizga yetkazib beramiz.
        </li>
        <li>
          <strong>Tezkor yetkazib berish:</strong> Buyurtmangizni qisqa vaqt ichida yetkazib
          berishni ta'minlaymiz.
        </li>
        <li>
          <strong>Xavfsiz yetkazib berish:</strong> Mahsulotingizni xavfsiz va zarar ko'rmagan
          holda yetkazib beramiz.
        </li>
      </ul>
      <p>
        Yetkazib berish xizmati haqida qo'shimcha ma'lumot olish uchun bizning mijozlarga xizmat
        ko'rsatish markazimizga murojaat qiling.
      </p>
    `
  }
]

export const paymentMethods: StaticImageData[] = [
  anorBankIcon,
  payMeIcon,
  clickIcon,
  humoIcon,
  uzCardIcon,
  visaIcon
]

export const paymentTerms: number[] = [6, 12]

export const providerIcons: Record<TProvider, StaticImageData> = {
  ALIF: alifLogoIcon,
  UZUM: uzumLogoIcon,
}

export const bannerData: StaticImageData[] = [
  bannerSixImg,
  bannerSevenImg,
  bannerThreeImg,
  bannerOneImg,
  bannerFourImg,
  bannerTwoImg,
  bannerFiveImg,
]

export const regions = [
  {
    id: 1,
    label: 'Andijon',
    value: 'Andijon',
  },
  {
    id: 2,
    label: 'Buxoro',
    value: 'Buxoro',
  },
  {
    id: 3,
    label: "Farg'ona",
    value: "Farg'ona",
  },
  {
    id: 4,
    label: 'Jizzax',
    value: 'Jizzax',
  },
  {
    id: 5,
    label: 'Namangan',
    value: 'Namangan',
  },
  {
    id: 6,
    label: 'Navoiy',
    value: 'Navoiy',
  },
  {
    id: 7,
    label: 'Qashqadaryo',
    value: 'Qashqadaryo',
  },
  {
    id: 8,
    label: "Qoraqalpog'iston",
    value: "Qoraqalpog'iston",
  },
  {
    id: 9,
    label: 'Samarqand',
    value: 'Samarqand',
  },
  {
    id: 10,
    label: 'Sirdaryo',
    value: 'Sirdaryo',
  },
  {
    id: 11,
    label: 'Surxondaryo',
    value: 'Surkhandarya',
  },
  {
    id: 13,
    label: 'Toshkent viloyati',
    value: 'Toshkent viloyati',
  },
  {
    id: 12,
    label: 'Toshkent shahri',
    value: 'Toshkent shahri',
  },
  {
    id: 14,
    label: 'Xorazm',
    value: 'Xorazm',
  },
];
export const subRegions = [
  {
    id: 'Andijon',
    subregion: [
      {
        id: 1,
        label: 'PAXTAOBOD BTS',
        value: 'PAXTAOBOD BTS',
      },
      {
        id: 2,
        label: 'ANDIJON ESKI SHAHAR',
        value: 'ANDIJON ESKI SHAHAR',
      },
      {
        id: 3,
        label: 'IZBOSKAN',
        value: 'IZBOSKAN',
      },
      {
        id: 4,
        label: 'ASAKA BTS',
        value: 'ASAKA BTS',
      },
      {
        id: 5,
        label: 'SHAXRIXON BTS',
        value: 'SHAXRIXON BTS',
      },
      {
        id: 6,
        label: 'ANDIJON AVTOVOKZAL',
        value: 'ANDIJON AVTOVOKZAL',
      },
    ],
  },
  {
    id: 'Buxoro',
    subregion: [
      {
        id: 1,
        label: 'BUXORO GORGAZ',
        value: 'BUXORO GORGAZ',
      },
      {
        id: 2,
        label: 'KOGON BTS',
        value: 'KOGON BTS',
      },
      {
        id: 3,
        label: 'BUXORO BTS',
        value: 'BUXORO BTS',
      },
      {
        id: 4,
        label: 'BUXORO 5-MKR',
        value: 'BUXORO 5-MKR',
      },
    ],
  },
  {
    id: "Farg'ona",
    subregion: [
      {
        id: 1,
        label: 'BESHARIQ BTS',
        value: 'BESHARIQ BTS',
      },
      {
        id: 2,
        label: 'QO`QON (CAVUM)',
        value: 'QO`QON (CAVUM)',
      },
      {
        id: 3,
        label: 'QO`QON BTS',
        value: 'QO`QON BTS',
      },
      {
        id: 4,
        label: 'QO`QON YANGI BOZOR',
        value: 'QO`QON YANGI BOZOR',
      },
      {
        id: 5,
        label: 'QUVASOY BTS',
        value: 'QUVASOY BTS',
      },
      {
        id: 6,
        label: 'TOSHLOQ',
        value: 'TOSHLOQ',
      },
      {
        id: 7,
        label: "MARG'ILON BTS",
        value: "MARG'ILON BTS",
      },
      {
        id: 8,
        label: 'FARG`ONA BTS',
        value: 'FARG`ONA BTS',
      },
    ],
  },
  {
    id: 'Jizzax',
    subregion: [
      {
        id: 1,
        label: 'JIZZAX',
        value: 'JIZZAX',
      },
    ],
  },
  {
    id: 'Namangan',
    subregion: [
      {
        id: 1,
        label: 'KOSONSOY BTS',
        value: 'KOSONSOY BTS',
      },
      {
        id: 2,
        label: 'CHUST BTS',
        value: 'CHUST BTS',
      },
      {
        id: 3,
        label: "TO'RAQO'RG'ON BTS",
        value: "TO'RAQO'RG'ON BTS",
      },
      {
        id: 4,
        label: 'NAMANGAN BTS',
        value: 'NAMANGAN BTS',
      },
    ],
  },
  {
    id: 'Navoiy',
    subregion: [
      {
        id: 1,
        label: 'NAVOI (VOSXOD)',
        value: 'NAVOI (VOSXOD)',
      },
      {
        id: 2,
        label: 'ZARAFSHON BTS',
        value: 'ZARAFSHON BTS',
      },
      {
        id: 3,
        label: 'NAVOI BTS',
        value: 'NAVOI BTS',
      },
    ],
  },
  {
    id: 'Qashqadaryo',
    subregion: [
      {
        id: 1,
        label: 'SHAHRISABZ BTS',
        value: 'SHAHRISABZ BTS',
      },
      {
        id: 2,
        label: "G'UZOR BTS",
        value: "G'UZOR BTS",
      },
      {
        id: 3,
        label: 'KARSHI BTS',
        value: 'KARSHI BTS',
      },
    ],
  },
  {
    id: "Qoraqalpog'iston",
    subregion: [
      {
        id: 1,
        label: 'NUKUS BTS',
        value: 'NUKUS BTS',
      },
      {
        id: 2,
        label: "QO'NG'IROT BTS",
        value: "QO'NG'IROT BTS",
      },
    ],
  },
  {
    id: 'Samarqand',
    subregion: [
      {
        id: 1,
        label: 'JOMBOY BTS',
        value: 'JOMBOY BTS',
      },
      {
        id: 2,
        label: 'PAYARIQ BTS',
        value: 'PAYARIQ BTS',
      },
      {
        id: 3,
        label: "KATTAQO'RG'ON BTS",
        value: "KATTAQO'RG'ON BTS",
      },
      {
        id: 4,
        label: 'URGUT BTS NEW',
        value: 'URGUT BTS NEW',
      },
      {
        id: 5,
        label: 'BULUNG`UR',
        value: 'BULUNG`UR',
      },
      {
        id: 6,
        label: 'SAMARKAND BTS',
        value: 'SAMARKAND BTS',
      },
      {
        id: 7,
        label: 'BTS DAHBET PVZ',
        value: 'BTS DAHBET PVZ',
      },
      {
        id: 8,
        label: 'SAMARKAND (M BARAKA)',
        value: 'SAMARKAND (M BARAKA)',
      },
      {
        id: 9,
        label: 'OQDARYO',
        value: 'OQDARYO',
      },
    ],
  },
  {
    id: 'Sirdaryo',
    subregion: [
      {
        id: 1,
        label: 'GULISTON BTS',
        value: 'GULISTON BTS',
      },
    ],
  },
  {
    id: 'Surxondaryo',
    subregion: [
      {
        id: 1,
        label: 'TERMEZ BTS',
        value: 'TERMEZ BTS',
      },
      {
        id: 2,
        label: 'DENOV BTS',
        value: 'DENOV BTS',
      },
    ],
  },
  {
    id: 'Toshkent shahri',
    subregion: [
      {
        id: 1,
        label: 'CHILONZOR',
        value: 'CHILONZOR',
      },
      {
        id: 2,
        label: 'QUSHBEGI BTS',
        value: 'QUSHBEGI BTS',
      },
      {
        id: 3,
        label: 'FARHOD BTS',
        value: 'FARHOD BTS',
      },
      {
        id: 4,
        label: 'YUNUSOBOD (UNIVERSAM)',
        value: 'YUNUSOBOD (UNIVERSAM)',
      },
      {
        id: 5,
        label: 'PARKENT BTS',
        value: 'PARKENT BTS',
      },
      {
        id: 6,
        label: 'SHAYXONTOHUR BTS',
        value: 'SHAYXONTOHUR BTS',
      },
      {
        id: 7,
        label: 'OLMAZOR BTS',
        value: 'OLMAZOR BTS',
      },
      {
        id: 8,
        label: 'ABU SAXIY',
        value: 'ABU SAXIY',
      },
      {
        id: 9,
        label: 'BEK BARAKA',
        value: 'BEK BARAKA',
      },
      {
        id: 10,
        label: 'MALIKA BOZOR',
        value: 'MALIKA BOZOR',
      },
      {
        id: 11,
        label: "O'RIKZOR1 BTS",
        value: "O'RIKZOR1 BTS",
      },
      {
        id: 12,
        label: 'UCHTEPA BTS',
        value: 'UCHTEPA BTS',
      },
      {
        id: 13,
        label: 'YAKKASAROY BTS',
        value: 'YAKKASAROY BTS',
      },
      {
        id: 14,
        label: 'MIROBOD BTS',
        value: 'MIROBOD BTS',
      },
      {
        id: 15,
        label: 'SERGELI BTS',
        value: 'SERGELI BTS',
      },
      {
        id: 16,
        label: 'OQTEPA BTS',
        value: 'OQTEPA BTS',
      },
      {
        id: 17,
        label: "QO'YLIQ BTS",
        value: "QO'YLIQ BTS",
      },
      {
        id: 18,
        label: 'MAKSIM GORKIY BTS',
        value: 'MAKSIM GORKIY BTS',
      },
      {
        id: 19,
        label: 'YUNUSOBOD (SHAXRISTON)',
        value: 'YUNUSOBOD (SHAXRISTON)',
      },
    ],
  },
  {
    id: 'Toshkent viloyati',
    subregion: [
      {
        id: 1,
        label: 'ANGREN BTS',
        value: 'ANGREN BTS',
      },
      {
        id: 2,
        label: 'OLMALIQ BTS',
        value: 'OLMALIQ BTS',
      },
      {
        id: 3,
        label: 'CHIRCHIQ BTS',
        value: 'CHIRCHIQ BTS',
      },
    ],
  },
  {
    id: 'Xorazm',
    subregion: [
      {
        id: 1,
        label: 'XIVA',
        value: 'XIVA',
      },
      {
        id: 2,
        label: 'URGENCH BTS',
        value: 'URGENCH BTS',
      },
    ],
  },
];
