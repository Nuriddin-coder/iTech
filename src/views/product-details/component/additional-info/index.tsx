import {FC} from "react";
import Image from "next/image";
import parse from 'html-react-parser';

import {additionalInfoData} from "@/constants";
import {Accordion, AccordionItem} from "@nextui-org/react";

export const AdditionalInfo: FC<{ className: string }> = ({className}) => {
  return (
    <Accordion
      isCompact
      variant="bordered"
      className={className}
      selectionMode="single"
    >
      {additionalInfoData.map((item) => (
        <AccordionItem
          aria-label="alif"
          title={item.title}
          key={item.subtitle}
          subtitle={item.subtitle}
          classNames={{
            subtitle: 'text-xs',
            content: 'text-sm',
          }}
          startContent={
            <Image
              src={item.icon}
              alt="icon"
              className="w-7 h-7"
            />
          }
        >
          {parse(item.content)}
        </AccordionItem>
      ))}
    </Accordion>
  )
}