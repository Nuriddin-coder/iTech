"use server"

import {IChildren} from "@/types";
import {ProductsFilter} from "@/components";

export default async function Layout({children}: Readonly<IChildren>) {
  return (
    <section className="flex pt-11 sm:pt-0 flex-col sm:flex-row page relative container gap-3">
      <ProductsFilter/>
      {children}
    </section>
  )
}