import {FC} from "react";
import {NumericFormat} from "react-number-format";

import {Slider} from "@nextui-org/react";
import {TOnChangePriceRange} from "@/types";

interface PriceRange {
  range: number[];
  isMobile?: boolean;
  onChange: TOnChangePriceRange;
}

export const PriceRange: FC<PriceRange> = ({range, isMobile, onChange}) => {
  return (
    <>
      <Slider
        size="sm"
        step={10}
        minValue={0}
        value={range}
        maxValue={9999999}
        onChange={onChange}
        className="max-w-md"
        defaultValue={range}
        label="Mahsulot narxi"
        formatOptions={{style: "currency", currency: "UZS"}}
        classNames={{value: "hidden", label: `${isMobile && "hidden"} text-base font-bold`}}
      />
      <div className={`${isMobile && "mt-3"} grid grid-cols-2 gap-2 mb-3`}>
        <NumericFormat
          maxLength={8}
          value={range[0]}
          placeholder="dan"
          thousandSeparator=" "
          suffix={isMobile ? " so'm" : undefined}
          className="border px-2 py-1.5 rounded-md"
          onValueChange={({floatValue}) => onChange(floatValue ?? 0, 'price.gte')}
        />
        <NumericFormat
          maxLength={9}
          value={range[1]}
          placeholder="gacha"
          thousandSeparator=" "
          suffix={isMobile ? " so'm" : undefined}
          className="border px-2 py-1.5 rounded-md"
          onValueChange={({floatValue}) => onChange(floatValue ?? 0, 'price.lte')}
        />
      </div>
    </>
  )
}