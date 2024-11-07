import {FC, useEffect, useState} from "react";

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
} from "@nextui-org/react";
import {TProductType} from "@/types";
import {useQueryParams} from "@/hooks";
import {productStatusData} from "@/constants";

export const ProductTypeFilter: FC<Omit<ModalProps, 'children'>> = ({isOpen, onOpenChange}) => {
  const {setQueryParams, getQueryParams} = useQueryParams();
  const [type, setType] = useState<TProductType>((getQueryParams()?.type || "ALL") as TProductType);

  const handleFilter = () => {
    if (type === "ALL") {
      setQueryParams({...getQueryParams(['type'])});
    } else {
      setQueryParams({...getQueryParams(), type});
    }
  }

  useEffect(() => {
    setType((getQueryParams()?.type || "ALL") as TProductType)
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="bg-gray-100 py-2 px-4">Mahsulot holati</ModalHeader>
            <ModalBody className="p-4 gap-1">
              <RadioGroup
                size="lg"
                value={type}
                label="Mahsulot Holati"
                aria-label="Product state"
                classNames={{label: 'hidden', wrapper: "gap-3"}}
                onChange={({target: {value}}) => setType(value as TProductType)}
              >
                {productStatusData.map(({value, label}) => (
                  <Radio
                    key={value}
                    value={value}
                    aria-label={label}
                    classNames={{wrapper: 'border-gray-300', base: "max-w-none", label: "text-lg"}}
                  >
                    {label}
                  </Radio>
                ))}
              </RadioGroup>
            </ModalBody>
            <ModalFooter className="flex flex-col p-3 mt-5">
              <Button
                color="primary"
                onClick={() => {
                  handleFilter();
                  onClose();
                }}
              >
                Ko'rsatish
              </Button>
              <Button
                className="bg-gray-300"
                onClick={() => {
                  handleFilter();
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