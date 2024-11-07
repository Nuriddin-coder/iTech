"use client";

import { FC } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { PhoneInput } from "react-international-phone";
import parsePhoneNumberFromString from "libphonenumber-js";

import {
  Input,
  Modal,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { IData } from "@/types";
import { mutationFn } from "@/utils";
import { useRouter } from "@/components";
import { IPaymentInfo } from "@/types/payment";
import { regions, subRegions } from "@/constants";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import "react-international-phone/style.css";

interface IOrderModal extends Partial<UseDisclosureReturn> {
  productId?: string;
  paymentInfo: IPaymentInfo;
}

export const OrderModal: FC<IOrderModal> = ({
  isOpen,
  paymentInfo,
  productId,
  onOpenChange,
}) => {
  const router = useRouter();

  const validationSchema = yup.object().shape({
    address: yup.string().required("Viloyat kiritish majburiy!"),
    region: yup.string().required("Shahar/Tuman kiritish majburiy!"),
    fullName: yup
      .string()
      .required("Ism-familiya kiritish majburiy!")
      .max(64, "Ism-familiya 64 ta belgidan oshmasligi kerak!")
      .min(5, "Ism-familiya kamida 5 ta harfdan iborat bo'lishi kerak"),
    phone: yup
      .string()
      .test("isValidPhoneNumber", "Telefon raqam noto'g'ri!", (value) => {
        const phoneNumber = parsePhoneNumberFromString(value ?? "");
        return phoneNumber ? phoneNumber.isValid() : false;
      }),
    plan: yup.number().required(),
    products: yup
      .array()
      .of(
        yup.object().shape({
          count: yup.number().required().min(1),
          product: yup.string().required("Mahsulot kiritish majburiy!"),
        })
      )
      .min(1, "Mahsulot kiritish majburiy!"),
  });

  const formik = useFormik<yup.InferType<typeof validationSchema>>({
    validationSchema,
    initialValues: {
      phone: "",
      region: "",
      address: "",
      fullName: "",
      products: [
        {
          count: 1,
          product: productId!,
        },
      ],
      plan: paymentInfo.duration,
    },
    enableReinitialize: !!(productId || paymentInfo.duration),
    onSubmit: (data) => {
      toast
        .promise(
          mutationFn<IData<{ url: string }>>({
            data,
            method: "POST",
            url: "/orders/uzum",
          }),
          {
            success: "Buyurtma muvaffaqqiyatli qoldirildi!",
            loading: "Buyurtma yuborilmoqda...",
            error: (err) => err?.message || "Buyurtma qoldirishda xatolik!",
          }
        )
        .then(({ data }) => {
          onOpenChange && onOpenChange();
          router.replace(data.url);
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => formik.setSubmitting(false));
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      isDismissable={false}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Rasmiylashtirish</ModalHeader>
            <ModalBody className="px-4 sm:px-5">
              <div>
                <p className={`mb-1`}>
                  Telefon raqam <span className="text-red-600">*</span>
                </p>
                <PhoneInput
                  className="w-full"
                  defaultCountry="uz"
                  inputClassName="w-full"
                  inputProps={{
                    inputMode: "numeric",
                  }}
                  value={formik.values.phone}
                  countries={[["Uzbekistan", "uz", "998", ".. ... .. .."]]}
                  onChange={(phone) => formik.setFieldValue("phone", phone)}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-600 text-xs font-medium">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
              <Input
                isRequired
                size="lg"
                variant="bordered"
                placeholder="Ismingizni kiriting"
                labelPlacement="outside"
                label="Ism va familiyangiz"
                isInvalid={
                  !!(formik.touched.fullName && formik.errors.fullName)
                }
                classNames={{
                  inputWrapper: "border-1 shadow-none",
                  input: "text-black",
                }}
                errorMessage={
                  formik.touched.fullName ? formik.errors.fullName : undefined
                }
                onValueChange={(value) =>
                  formik.setFieldValue("fullName", value)
                }
              />
              <Select
                isRequired
                size="lg"
                className="w-full"
                variant="bordered"
                placeholder="Tanlang"
                labelPlacement="outside"
                label="Viloyatni tanlang"
                isInvalid={!!(formik.touched.region && formik.errors.region)}
                classNames={{
                  trigger: "shadow-none border-1",
                  value: "text-black",
                }}
                errorMessage={
                  formik.touched.region ? formik.errors.region : undefined
                }
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("region", value)
                }
              >
                {regions.map(({ value, label }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    classNames={{ title: "text-base" }}
                  >
                    {label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                isRequired
                size="lg"
                className="w-full"
                variant="bordered"
                placeholder="Tanlang"
                labelPlacement="outside"
                label="Shahar/tumanni tanlang"
                isInvalid={!!(formik.touched.address && formik.errors.address)}
                classNames={{
                  trigger: "shadow-none border-1",
                  value: "text-black",
                }}
                errorMessage={
                  formik.touched.address ? formik.errors.address : undefined
                }
                onChange={({ target: { value } }) =>
                  formik.setFieldValue("address", value)
                }
              >
                {(
                  subRegions.find((sub) => sub.id === formik.values.region)
                    ?.subregion ?? []
                )?.map(({ value, label }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    classNames={{ title: "text-base" }}
                  >
                    {label}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter className="grid mt-5 grid-cols-2">
              <Button size="lg" color="danger" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button
                size="lg"
                isLoading={formik.isSubmitting}
                onClick={() => formik.handleSubmit()}
                color="primary"
              >
                Buyurtma berish
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
