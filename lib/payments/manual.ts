import type { PaymentIntent, PaymentProvider, PaymentResult } from "./types";

export const manualPaymentProvider: PaymentProvider = {
  id: "manual",
  label: "Manual / Order Review",
  enabled: true,
  async charge(intent: PaymentIntent): Promise<PaymentResult> {
    return {
      success: true,
      status: "unpaid",
      provider: "manual",
      reference: `MANUAL-${intent.orderNumber}`,
      message:
        "Order recorded for manual confirmation. No live payment gateway is configured.",
    };
  },
};
