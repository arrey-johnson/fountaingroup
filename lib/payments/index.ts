import { manualPaymentProvider } from "./manual";
import type { PaymentProvider } from "./types";

/** Stubs for future providers — disabled until credentials exist. */
const stubs: PaymentProvider[] = [
  {
    id: "cinetpay",
    label: "CinetPay",
    enabled: false,
    async charge() {
      throw new Error("CinetPay is not configured.");
    },
  },
  {
    id: "flutterwave",
    label: "Flutterwave",
    enabled: false,
    async charge() {
      throw new Error("Flutterwave is not configured.");
    },
  },
  {
    id: "paystack",
    label: "Paystack",
    enabled: false,
    async charge() {
      throw new Error("Paystack is not configured.");
    },
  },
  {
    id: "monetbil",
    label: "Monetbil",
    enabled: false,
    async charge() {
      throw new Error("Monetbil is not configured.");
    },
  },
];

export function getPaymentProviders(): PaymentProvider[] {
  return [manualPaymentProvider, ...stubs];
}

export function getActivePaymentProvider(): PaymentProvider {
  const preferred = process.env.PAYMENT_PROVIDER ?? "manual";
  const providers = getPaymentProviders();
  return (
    providers.find((p) => p.id === preferred && p.enabled) ?? manualPaymentProvider
  );
}

export type { PaymentIntent, PaymentResult, PaymentProvider } from "./types";
