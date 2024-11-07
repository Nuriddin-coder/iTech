import {FC} from "react";
import parse from 'html-react-parser';

import {TLocale} from "@/types";
import {IProduct} from "@/types/product";
import {Tab, Tabs} from "@nextui-org/react";

import {ShowMore} from "../show-more";

interface IProductDescription {
  locale: TLocale;
  data: Partial<Pick<IProduct, "propertyInfo" | "shortDescription">>
}

interface ITab {
  title: string;
  key: keyof IProductDescription['data'];
}

export const ProductDescription: FC<IProductDescription> = ({data, locale}) => {

  const tabs: ITab[] = [
    {
      title: 'Mahsulot xususiyatlari',
      key: 'propertyInfo',
    },
    {
      title: 'Tavsif',
      key: "shortDescription",
    },
  ];

  return (
    <div className="w-full">
      <Tabs
        size="lg"
        items={tabs}
        variant="underlined"
        aria-label="Dynamic tabs"
        className="mt-5 border-b w-full"
        classNames={{
          tabList: "p-0",
          cursor: "w-full",
          tab: 'font-semibold',
          panel: 'w-full sm:w-max max-w-4xl',
        }}
      >
        {({title, key}) => (
          <Tab
            key={key}
            title={title}
          >
            <ShowMore>
              {parse(data?.[key]?.[locale] ?? '<p></p>')}
            </ShowMore>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
