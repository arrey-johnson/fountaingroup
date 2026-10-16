import { hasSupabaseConfig } from "@/lib/supabase/admin";
import * as demo from "@/lib/demo/store";
import * as sb from "@/lib/supabase/repository";
import type {
  CreateContactInput,
  CreateDistributorInput,
  CreateOrderInput,
  CreateWholesaleInput,
  OrderStatus,
  PaymentStatus,
  Product,
  SiteSettings,
  WholesaleStatus,
} from "@/types";

export function isDemoMode() {
  return !hasSupabaseConfig();
}

export function usingDemoBackend() {
  return isDemoMode();
}

async function withFallback<T>(fn: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  if (isDemoMode()) return fallback();
  try {
    return await fn();
  } catch (error) {
    console.error("[supabase]", error);
    return fallback();
  }
}

export async function getProducts() {
  return withFallback(() => sb.getProducts(), () => demo.getDemoProducts());
}

export async function getFeaturedProducts() {
  return (await getProducts()).filter((p) => p.featured);
}

export async function getProductBySlug(slug: string) {
  return withFallback(
    () => sb.getProductBySlug(slug),
    () => demo.getDemoProductBySlug(slug),
  );
}

export async function getCategories() {
  return withFallback(() => sb.getCategories(), () => demo.getDemoCategories());
}

export async function getSettings(): Promise<SiteSettings> {
  return withFallback(() => sb.getSettings(), () => demo.getDemoSettings());
}

export async function updateSettings(patch: Partial<SiteSettings>) {
  if (isDemoMode()) return demo.updateDemoSettings(patch);
  return sb.updateSettings(patch);
}

export async function getTestimonials() {
  return withFallback(() => sb.getTestimonials(), () => demo.getDemoTestimonials());
}

export async function getFaqs() {
  return withFallback(() => sb.getFaqs(), () => demo.getDemoFaqs());
}

export async function getCertifications() {
  return withFallback(() => sb.getCertifications(), () => demo.getDemoCertifications());
}

export async function createOrder(input: CreateOrderInput) {
  if (isDemoMode()) return demo.createDemoOrder(input);
  return sb.createOrder(input);
}

export async function getOrders() {
  return withFallback(() => sb.getOrders(), () => demo.getDemoOrders());
}

export async function getOrderByNumber(orderNumber: string) {
  return withFallback(
    () => sb.getOrderByNumber(orderNumber),
    () => demo.getDemoOrderByNumber(orderNumber),
  );
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
) {
  if (isDemoMode()) {
    return demo.updateDemoOrderStatus(orderNumber, status, paymentStatus);
  }
  return sb.updateOrderStatus(orderNumber, status, paymentStatus);
}

export async function createWholesaleRequest(input: CreateWholesaleInput) {
  if (isDemoMode()) return demo.createDemoWholesale(input);
  return sb.createWholesaleRequest(input);
}

export async function getWholesaleRequests() {
  return withFallback(() => sb.getWholesaleRequests(), () => demo.getDemoWholesale());
}

export async function updateWholesaleStatus(
  rfqNumber: string,
  status: WholesaleStatus,
) {
  if (isDemoMode()) return demo.updateDemoWholesaleStatus(rfqNumber, status);
  return sb.updateWholesaleStatus(rfqNumber, status);
}

export async function createDistributorApplication(input: CreateDistributorInput) {
  if (isDemoMode()) return demo.createDemoDistributor(input);
  return sb.createDistributorApplication(input);
}

export async function getDistributorApplications() {
  return withFallback(
    () => sb.getDistributorApplications(),
    () => demo.getDemoDistributors(),
  );
}

export async function createContactMessage(input: CreateContactInput) {
  if (isDemoMode()) return demo.createDemoMessage(input);
  return sb.createContactMessage(input);
}

export async function getContactMessages() {
  return withFallback(() => sb.getContactMessages(), () => demo.getDemoMessages());
}

export async function subscribeNewsletter(email: string) {
  if (isDemoMode()) return demo.subscribeDemoNewsletter(email);
  return sb.subscribeNewsletter(email);
}

export async function upsertProduct(product: Product) {
  if (isDemoMode()) return demo.upsertDemoProduct(product);
  return sb.upsertProduct(product);
}

export async function deactivateProduct(id: string) {
  if (isDemoMode()) return demo.deactivateDemoProduct(id);
  return sb.deactivateProduct(id);
}

export async function getDashboardStats() {
  return withFallback(() => sb.getDashboardStats(), () => demo.getDemoDashboardStats());
}
