"use server";

import { cookies } from "next/headers";
import {
  updateOrderStatus,
  updateSettings,
  updateWholesaleStatus,
} from "@/lib/data/repository";
import type { OrderStatus, PaymentStatus, SiteSettings, WholesaleStatus } from "@/types";

export async function adminLoginAction(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "changeme-demo-only";
  if (password !== expected) {
    return { ok: false as const, error: "Invalid credentials." };
  }
  const secret = process.env.DEMO_ADMIN_SESSION_SECRET || "fountain-demo-admin-secret";
  const jar = await cookies();
  jar.set("fg_admin_session", secret, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return { ok: true as const };
}

export async function adminLogoutAction() {
  const jar = await cookies();
  jar.delete("fg_admin_session");
  return { ok: true as const };
}

export async function adminUpdateOrderAction(
  orderNumber: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
) {
  await updateOrderStatus(orderNumber, status, paymentStatus);
  return { ok: true as const };
}

export async function adminUpdateWholesaleAction(
  rfqNumber: string,
  status: WholesaleStatus,
) {
  await updateWholesaleStatus(rfqNumber, status);
  return { ok: true as const };
}

export async function adminUpdateSettingsAction(patch: Partial<SiteSettings>) {
  await updateSettings(patch);
  return { ok: true as const };
}
