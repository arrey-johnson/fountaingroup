import type { PaymentMethod, PaymentStatus } from "@/types";

export type PaymentIntent = {
  orderId: string;
  orderNumber: string;
  amount: number | null;
  currency: string;
  method: PaymentMethod;
  customerEmail: string;
};

export type PaymentResult = {
  success: boolean;
  status: PaymentStatus;
  provider: string;
  reference?: string;
  message: string;
};

export interface PaymentProvider {
  readonly id: string;
  readonly label: string;
  readonly enabled: boolean;
  charge(intent: PaymentIntent): Promise<PaymentResult>;
}
