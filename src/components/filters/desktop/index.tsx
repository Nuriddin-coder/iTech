import {
  FC,
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
} from "react";
import {debounce} from "lodash";
import {useLocale} from "next-intl";

import {IBrand} from "@/types/brand";
import {useQueryParams} from "@/hooks";
import {PriceRange} from "@/components";
import {productStatusData} from "@/constants";
import {IPriceRange, TLocale, TOnChangePriceRange} from "@/types";
import {Checkbox, CheckboxGroup, CheckboxGroupProps, Radio, RadioGroup} from "@nextui-org/react";

import {DesktopFilterLoading} from "./loading";

interface IDesktopFilter {
  data?: IBrand[];
  isLoading: boolean;
}

export const DesktopFilter: FC<IDesktopFilter> = ({data, isLoading}) => {
  const locale = useLocale() as TLocale;
  const {setQueryParams, getQueryParams} = useQueryParams();
  const hasUserInteracted = useRef(false);

  const [priceRange, setPriceRange] = useState<IPriceRange>({
    'price.gte': +(getQueryParams()?.['price.gte'] ?? 0),
    'price.lte': +(getQueryParams()?.['price.lte'] ?? 9999999),
  });

  const handleChangeProductState: ChangeEventHandler<HTMLInputElement> = ({target: {value}}) => {
    setQueryParams(value === "ALL"
      ? {...getQueryParams(['type'])}
      : {...getQueryParams(), type: value}
    );
  };

  const handleChangeBrand = (value: string[]) => {
    if (value?.length) {
      setQueryParams({
        ...getQueryParams(),
        'brand._id': value?.length > 1 ? value.join(',') : value[0]
      });
    } else {
      setQueryParams({...getQueryParams(['brand._id'])})
    }
  };

  const handleChangePriceRange: TOnChangePriceRange = (value, name) => {
    if (!hasUserInteracted.current) {
      hasUserInteracted.current = true;
    }

    if (Array.isArray(value)) {
      setPriceRange({'price.gte': value[0], 'price.lte': value[1]});
    } else if (name) {
      setPriceRange(prev => ({...prev, [name]: value}));
    }
  };

  useEffect(() => {
    const debouncedSetQueryParams = debounce(() => {
      if (hasUserInteracted.current) {
        setQueryParams({...getQueryParams(), ...priceRange});
      }
    }, 200);
    debouncedSetQueryParams();

    return () => debouncedSetQueryParams.cancel();
  }, [priceRange["price.gte"], priceRange["price.lte"]]);

  return (
    <div className="flex mb-3 h-max border-r pr-2 lg:pr-4 flex-col gap-4 sticky top-32 lg:top-20">
      {isLoading ? (
        <DesktopFilterLoading/>
      ) : (
        <>
          <PriceRange
            range={[priceRange["price.gte"], priceRange["price.lte"]]}
            onChange={handleChangePriceRange}
          />
          <RadioGroup
            label="Mahsulot Holati"
            aria-label="Product state"
            onChange={handleChangeProductState}
            value={getQueryParams()?.type || 'ALL'}
            classNames={{label: 'text-black font-bold'}}
          >
            {productStatusData.map(({value, label}) => (
              <Radio
                key={value}
                value={value}
                aria-label={label}
                classNames={{wrapper: 'border-gray-300', label: 'text-sm lg:text-base'}}
              >
                {label}
              </Radio>
            ))}
          </RadioGroup>
          <CheckboxGroup
            className="gap-3"
            label="Mahsulot Brendlari"
            classNames={{label: 'text-black font-bold'}}
            onChange={handleChangeBrand as CheckboxGroupProps['onChange']}
            value={(getQueryParams()?.["brand._id"] ?? '').split(',')?.filter(id => id)}
          >
            {data?.map(({_id, name}) => (
              <Checkbox
                key={_id}
                value={_id}
                aria-label={name[locale]}
                classNames={{wrapper: 'border border-gray-300 rounded-lg', label: 'text-sm lg:text-base'}}
              >
                {name[locale]}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </>
      )}
    </div>
  );
};
