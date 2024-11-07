'use client';

import {FC, useState} from 'react';
import {useLocale} from "next-intl";
import {useParams} from "next/navigation";

import {
  Modal,
  Radio,
  Button,
  ModalBody,
  ModalProps,
  RadioGroup,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import {TLocale} from "@/types";
import {useQueryParams} from "@/hooks";
import {ICatalog} from "@/types/category";

interface IProductCatalogFilter extends Omit<ModalProps, 'children'> {
  data?: ICatalog[];
}

export const ProductCatalogFilter: FC<IProductCatalogFilter> = ({isOpen, data, onOpenChange}) => {
  const {id} = useParams();
  const locale = useLocale() as TLocale;
  const {setQueryParams, getQueryParams} = useQueryParams();

  const [catalogId, setCatalogId] = useState<string>(getQueryParams()?.['category._id'] ?? id);

  const handleFilter = () => {
    if (catalogId !== id) {
      setQueryParams({...getQueryParams(), "category._id": catalogId});
    } else {
      setQueryParams({...getQueryParams(['category._id'])});
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setCatalogId(getQueryParams()?.['category._id'] ?? id)}
    >
      <ModalContent className="max-h-[98%]">
        {(onClose) => (
          <>
            <ModalHeader className="bg-gray-100 py-2 px-4">Katalog</ModalHeader>
            <ModalBody className="flex-1 overflow-y-auto p-4 gap-1">
              <RadioGroup
                size="lg"
                label="Katalog"
                className="gap-3"
                value={catalogId}
                aria-label="katalog"
                classNames={{label: 'hidden', wrapper: 'gap-3'}}
                onChange={({target: {value}}) => setCatalogId(value)}
              >
                {data?.map(({_id, name}) => (
                  <Radio
                    key={_id}
                    value={_id}
                    classNames={{wrapper: 'border-gray-300', base: "max-w-none", label: "text-lg"}}
                  >
                    {name[locale]}
                  </Radio>
                ))}
              </RadioGroup>
            </ModalBody>
            <ModalFooter className="flex flex-col p-3 mt-5">
              <Button
                color="primary"
                onClick={() => {
                  handleFilter()
                  onClose();
                }}
              >
                Ko'rsatish
              </Button>
              <Button
                onClick={() => {
                  setCatalogId(id as string);
                  handleFilter()
                  onClose();
                }}
                className="bg-gray-300"
              >
                Filterni tozalash
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
