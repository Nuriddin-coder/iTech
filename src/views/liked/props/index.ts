import {useAppSelector, useMatchMedia} from "@/hooks";

export const useLikedProductsProps = () => {
  const isSM = useMatchMedia(640);
  const {data} = useAppSelector(state => state.liked);

  return {
    isSM,
    data,
  }
}