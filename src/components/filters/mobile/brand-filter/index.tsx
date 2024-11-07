'use client';

import {useLocale} from "next-intl";
import {FC, useEffect, useState} from 'react';

import {
  Modal,
  Button,
  Checkbox,
  ModalBody,
  ModalProps,
  ModalFooter,
  ModalHeader,
  ModalContent,
  CheckboxGroup,
} from '@nextui-org/react';
import {TLocale} from "@/types";
import {IBrand} from "@/types/brand";
import {useQueryParams} from "@/hooks";

interface IProductBrandFilter extends Omit<ModalProps, 'children'> {
  data?: IBrand[];
}

export const ProductBrandFilter: FC<IProductBrandFilter> = ({isOpen, data, onOpenChange}) => {
  const locale = useLocale() as TLocale;
  const {setQueryParams, getQueryParams} = useQueryParams();
  const filteredBrands = getQueryParams()?.['brand._id'] ?? '';

  const [brands, setBrands] = useState<string[]>(filteredBrands?.split(',')?.filter(id => id));

  useEffect(() => {
    setBrands(filteredBrands.split(',')?.filter(id => id));
  }, [filteredBrands]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent className="max-h-[98%]">
        {(onClose) => (
          <>
            <ModalHeader className="bg-gray-100 py-2 px-4">Mahsulot brendlari</ModalHeader>
            <ModalBody className="flex-1 overflow-y-auto p-4 gap-1">
              <CheckboxGroup
                size="lg"
                value={brands}
                label="Brendlar"
                className="gap-3"
                classNames={{label: 'hidden', wrapper: 'gap-3'}}
                onChange={(value) => setBrands(value as string[])}
              >
                {data?.map(({_id, name}) => (
                  <Checkbox
                    key={_id}
                    value={_id}
                    classNames={{wrapper: 'border border-gray-300 rounded-lg', base: "max-w-none", label: "text-lg"}}
                  >
                    {name[locale]}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </ModalBody>
            <ModalFooter className="flex flex-col p-3">
              <Button
                color="primary"
                onClick={() => {
                  onClose();
                  setQueryParams({
                    ...getQueryParams(),
                    'brand._id': brands?.length > 1 ? brands.join(',') : brands[0]
                  });
                }}
              >
                Ko'rsatish
              </Button>
              <Button
                onClick={() => {
                  setBrands([]);
                  setQueryParams({...getQueryParams(['brand._id'])})
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
