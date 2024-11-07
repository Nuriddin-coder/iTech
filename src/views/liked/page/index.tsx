"use client"

import Link from "next/link";
import Image from "next/image";

import {hoc} from "@/utils";
import {homeFilledIcon} from "@/constants";
import {NoProducts, ProductCard} from "@/components";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";

import {useLikedProductsProps} from "../props";

export const LikedProductsPage = hoc(useLikedProductsProps, ({data, isSM}) => {
  return (
    <section className="page container flex flex-col gap-2">
      <Breadcrumbs size={isSM ? "md" : "sm"} classNames={{list: "flex-nowrap w-max"}} variant="solid">
        <BreadcrumbItem>
          <Link aria-label="home" href="/">
            <Image
              className="opacity-50 min-w-5 hover:opacity-100"
              src={homeFilledIcon}
              alt="home"
            />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem className="font-semibold" isLast>
          Sevimli mahsulotlar
        </BreadcrumbItem>
      </Breadcrumbs>
      <h1 className="text-xl sm:text-2xl font-semibold my-2 sm:my-3 md:my-4">Sevimli mahsulotlar</h1>
      {data?.length ? (
        <div
          className="grid mb-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 gap-3 sm:gap-y-5">
          {data.map(product => (
            <ProductCard key={product._id} data={product}/>
          ))}
        </div>
      ) : (
        <NoProducts
          title="Sevimlilar roʻyxati boʻsh"
          subtitle="Ma'qul kelgan mahsulotlarni keyinroq ko'rish yoki xarid qilish uchun sevimlilar ro'yxatiga kiriting."
        />
      )}
    </section>
  )
})