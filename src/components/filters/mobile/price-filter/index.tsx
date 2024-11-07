import {FC, useEffect, useState} from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalProps,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import {useQueryParams} from "@/hooks";
import {PriceRange} from "@/components";
import {IPriceRange, TOnChangePriceRange} from "@/types";

export const ProductPriceFilter: FC<Omit<ModalProps, 'children'>> = ({isOpen, onOpenChange}) => {
  const {getQueryParams, setQueryParams} = useQueryParams();

  const initialState = {
    'price.gte': +(getQueryParams()?.['price.gte'] ?? 0),
    'price.lte': +(getQueryParams()?.['price.lte'] ?? 5000000),
  }

  const [priceRange, setPriceRange] = useState<IPriceRange>(initialState);

  const handleChangePriceRange: TOnChangePriceRange = (value, name) => {
    if (Array.isArray(value)) {
      setPriceRange({'price.gte': value[0], 'price.lte': value[1]});
    } else if (name) {
      setPriceRange(prev => ({...prev, [name]: value}));
    }
  };

  useEffect(() => {
    setPriceRange(initialState)
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="bg-gray-100 py-2 px-4">Narx</ModalHeader>
            <ModalBody className="p-4 gap-1">
              <PriceRange
                isMobile
                range={[priceRange["price.gte"], priceRange["price.lte"]]}
                onChange={handleChangePriceRange}
              />
            </ModalBody>
            <ModalFooter className="flex flex-col p-3 mt-5">
              <Button
                color="primary"
                onClick={() => {
                  setQueryParams({...getQueryParams(), ...priceRange});
                  onClose();
                }}
              >
                Ko'rsatish
              </Button>
              <Button
                className="bg-gray-300"
                onClick={() => {
                  onClose();
                }}
              >
                Filterni tozalash
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}