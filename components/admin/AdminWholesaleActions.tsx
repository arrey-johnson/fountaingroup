"use client";

import { useTransition } from "react";
import { adminUpdateWholesaleAction } from "@/app/actions/admin";
import type { WholesaleStatus } from "@/types";

const statuses: WholesaleStatus[] = [
  "new",
  "reviewing",
  "quotation_sent",
  "negotiating",
  "approved",
  "rejected",
  "converted",
];

export function AdminWholesaleActions({ rfqNumber }: { rfqNumber: string }) {
  const [pending, start] = useTransition();

  return (
    <select
      className="h-9 rounded border px-2 text-xs"
      disabled={pending}
      defaultValue=""
      onChange={(e) => {
        const status = e.target.value as WholesaleStatus;
        if (!status) return;
        start(async () => {
          await adminUpdateWholesaleAction(rfqNumber, status);
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
