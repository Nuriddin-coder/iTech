import {FC} from 'react';
import Image from 'next/image';

import {socialData} from '@/constants';
import {Link, LocaleSwitcher} from '@/components';

export const TopContent: FC = () => {
  return <div className="hidden lg:block bg-default text-sm text-gray-700 font-semibold">
      <div className="hidden container lg:flex items-center justify-between gap-7">
        <div className="flex items-center gap-5">
          <p>Bizga qo'shiling:</p>
          <div className="flex items-center gap-3">
            {socialData.map(({ icon, link, text }) =>
              <Link href={link} key={link} aria-label={text}>
                <Image className="w-5 h-5" src={icon} alt={link} />
              </Link>
            )}
          </div>
          <span className="text-gray-400">|</span>
          <a href={`tel:+998336560060`}>+998 33 656 00 60</a>
        </div>
        <LocaleSwitcher />
      </div>
    </div>;
};
