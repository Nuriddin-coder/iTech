import {IData} from "@/types/index";
import {StaticImageData} from "next/image";

export type TProvider = "UZUM" | "ALIF"

export interface ICalculate {
  duration: number;
  perMonth: number;
}

export interface IProvider {
  icon: StaticImageData;
  value: TProvider;
}

export interface IPaymentInfo extends ICalculate {
  provider: TProvider;
}

export type TProviderCalculation = Record<TProvider, ICalculate[]>
export type TProviderData = IData<TProviderCalculation>

export const initialPaymentInfo: IPaymentInfo = {
  provider: "UZUM",
  duration: 12,
  perMonth: 0,
}