"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { hoc } from "@/utils";
import { homeFilledIcon } from "@/constants";
import { OrderModal, Slider } from "@/components";
import { initialPaymentInfo, IPaymentInfo } from "@/types/payment";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { useProductDetails } from "../props";
import { Payments } from "../component/payments";
import { ProductInfo } from "../component/product-info";
import { SingleProductSlider } from "../component/product-slider";
import { ProductDescription } from "../component/product-description";

export const ProductDetailsPage = hoc(
  useProductDetails,
  ({ data, calculateData, similarProducts, locale, isSM }) => {
    const [paymentInfo, setPaymentInfo] =
      useState<IPaymentInfo>(initialPaymentInfo);
    const { isOpen, onOpenChange, onOpen } = useDisclosure();

    const setDuration = (duration: number) => {
      setPaymentInfo((prev) => ({ ...prev, duration }));
    };

    const setPerMonth = (perMonth: number) => {
      setPaymentInfo((prev) => ({ ...prev, perMonth }));
    };

    return (
      <section className="page flex flex-col gap-2 sm:gap-3 md:gap-5 container">
        <Breadcrumbs
          variant="solid"
          size={isSM ? "md" : "sm"}
          classNames={{ list: "flex-nowrap w-full max-w-max" }}
        >
          <BreadcrumbItem>
            <Link aria-label="home" href="/">
              <Image
                alt="home"
                src={homeFilledIcon}
                className="opacity-50 min-w-5 hover:opacity-100"
              />
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link aria-label="catalog" href={"/products"}>
              Mahsulotlar
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem
            isLast
            className="font-semibold"
            classNames={{
              item: "break-all whitespace-normal !line-clamp-1",
            }}
          >
            {data?.name[locale]}
          </BreadcrumbItem>
        </Breadcrumbs>
        {data && (
          <div className="grid gap-3 relative lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <SingleProductSlider
              images={data?.images}
              discount={data?.discount}
              isPopular={data?.isPopular}
              mainImage={data?.mainImage}
            />
            <ProductInfo
              data={data}
              locale={locale}
              paymentInfo={paymentInfo}
            />
            <Payments
              onOpen={onOpen}
              data={calculateData}
              paymentInfo={paymentInfo}
              setDuration={setDuration}
              setPerMonth={setPerMonth}
            />
          </div>
        )}
        <ProductDescription
          locale={locale}
          data={{
            propertyInfo: data?.propertyInfo,
            shortDescription: data?.shortDescription,
          }}
        />
        {similarProducts && similarProducts?.length > 1 && (
          <div className="mt-3 sm:mt-5">
            <p className="font-semibold mb-3 sm:mb-5 sm:text-xl md:text-2xl">
              Sizni qiziqtirishi mumkin
            </p>
            <Slider
              sliderData={similarProducts}
              className="max-w-[98%] select-none mb-4 sm:mb-6 md:mb-8 lg:mb-10"
            />
          </div>
        )}
        <OrderModal
          productId={data?._id}
          isOpen={isOpen}
          paymentInfo={paymentInfo}
          onOpenChange={onOpenChange}
        />
        <div className="fixed md:hidden w-full px-2 bottom-1 left-0 z-20">
          <Button
            size="lg"
            onClick={onOpen}
            className="w-full bg-green-500 text-white pulse rounded-full"
          >
            Muddatli to'lovga rasmiylashtirish
          </Button>
        </div>
      </section>
    );
  }
);
