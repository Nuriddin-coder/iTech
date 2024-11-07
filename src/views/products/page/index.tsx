"use client"

import {hoc} from "@/utils";
import {Pagination} from "@nextui-org/react";
import {NoProducts, ProductCard} from "@/components";

import {useProductsProps} from "../props";

export const ProductsPage = hoc(useProductsProps, (props) => {
  const {setPage, page, isLoading, total, data} = props;

  return (
    <div className="sm:flex-1 sm:pt-12">
      {data?.length && !isLoading ? (
        <>
          <div className="grid mb-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-y-5">
            {data?.map(product => (
              <ProductCard key={product._id} data={product}/>
            ))}
          </div>
          {total > 1 && (
            <Pagination
              showControls
              total={total}
              initialPage={page}
              aria-label="pagination"
              onChange={page => setPage(page)}
              classNames={{wrapper: 'mx-auto', base: 'mt-auto mb-4 md:mb-0'}}
            />
          )}
        </>
      ) : (
        <NoProducts/>
      )}
    </div>
  )
})