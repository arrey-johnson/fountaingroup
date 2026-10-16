"use client";

import { useTransition } from "react";
import { adminUpdateOrderAction } from "@/app/actions/admin";
import type { OrderStatus } from "@/types";

const statuses: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "ready",
  "shipped",
  "delivered",
  "cancelled",
];

export function AdminOrderActions({ orderNumber }: { orderNumber: string }) {
  const [pending, start] = useTransition();

  return (
    <select
      className="h-9 rounded border px-2 text-xs"
      disabled={pending}
      defaultValue=""
      onChange={(e) => {
        const status = e.target.value as OrderStatus;
        if (!status) return;
        start(async () => {
          await adminUpdateOrderAction(orderNumber, status);
        });
      }}
    >
      <option value="">Update status</option>
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
