import {createSharedPathnamesNavigation} from 'next-intl/navigation';

import {locales} from "@/constants";

export const {
  Link,
  useRouter,
  usePathname,
} = createSharedPathnamesNavigation({locales});

export {Footer} from './footer';
export {Header} from './header';
export {Slider} from './slider';
export {NoData} from './no-data';
export {BaseLayout} from './layout';
export {MobileNav} from './mobile-nav';
export {PriceRange} from './price-range';
export {TopCatalog} from './top-catalog';
export {NoProducts} from './no-products';
export {ProductsFilter} from './filters';
export {OrderModal} from './order-modal';
export {ProductCard} from './product-card';
export {LocaleSwitcher} from './locale-switcher';
export {ProductCardLoading} from './product-card/loading';
export {CatalogCard, CatalogCardLoading} from './catalog-card';
