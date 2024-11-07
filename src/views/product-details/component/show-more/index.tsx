'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {FC, useEffect, useRef, useState} from 'react';

import {IChildren} from "@/types";
import {Button} from '@nextui-org/react';
import {doubleArrowIcon} from "@/constants";

export const ShowMore: FC<IChildren> = ({children}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [innerContentHeight, setInnerContentHeight] = useState<string>('0px');

  useEffect(() => {
    setInnerContentHeight(getComputedStyle(ref.current!).height);
  }, [children, isExpanded]);

  return (
    <motion.div
      className="w-full overflow-hidden relative"
      variants={{
        initial: {
          height: '250px',
        },
        animate: {
          height: `${parseInt(innerContentHeight) + 80}px`,
        },
      }}
      initial="initial"
      transition={{
        duration: 0.5,
      }}
      animate={isExpanded ? 'animate' : 'initial'}
    >
      <div className="text-sm sm:text-base" ref={ref}>{children}</div>
      {parseInt(innerContentHeight) > 250 && (
        <div className="absolute bottom-0 h-32 left-0 w-full flex items-center justify-center gradient-class">
          <Button
            color="primary"
            className="sm:text-lg font-medium mt-4"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Kamroq' : "Ko'proq"}
            <Image
              src={doubleArrowIcon}
              alt="see-more"
              className={`w-6 h-6 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
            />
          </Button>
        </div>
      )}
    </motion.div>
  );
};
