"use client"

import {FC} from "react";
import Image from "next/image";

import {navLinks} from "@/constants";
import {Link, usePathname} from "@/components";

export const MobileNav: FC = () => {
  const pathname = usePathname();
  const splitted = pathname.split("/");

  return (
    <nav
      className={`${splitted.length === 3 && splitted[1] === 'products' && "hidden"} fixed w-full pt-2 pb-3 sm:py-3 top-shadow overflow-hidden left-0 bottom-0 bg-white z-50 lg:hidden`}>
      <div className="container grid grid-cols-3 items-center gap-2">
        {navLinks.map(({link, text, icon: {filled, outline}}) => (
          <Link
            key={link}
            href={link}
            aria-labelledby={link}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={pathname === link ? filled : outline}
              alt={text!}
            />
            <p className="text-xs sm:text-base font-medium" id={link}>{text}</p>
          </Link>
        ))}
      </div>
    </nav>
  )
}