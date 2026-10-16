import { randomUUID } from "crypto";
import {
  categories,
  certifications,
  faqs,
  products as seedProducts,
  siteSettings as seedSettings,
  testimonials,
} from "./seed";
import type {
  ContactMessage,
  CreateContactInput,
  CreateDistributorInput,
  CreateOrderInput,
  CreateWholesaleInput,
  DistributorApplication,
  NewsletterSubscriber,
  Order,
  OrderStatus,
  PaymentStatus,
  Product,
  SiteSettings,
  WholesaleRequest,
  WholesaleStatus,
} from "@/types";

type DemoStore = {
  products: Product[];
  settings: SiteSettings;
  orders: Order[];
  wholesale: WholesaleRequest[];
  distributors: DistributorApplication[];
  messages: ContactMessage[];
  subscribers: NewsletterSubscriber[];
  orderSeq: number;
  rfqSeq: number;
};

const globalForDemo = globalThis as unknown as { __fgDemoStore?: DemoStore };

function createStore(): DemoStore {
  return {
    products: structuredClone(seedProducts),
    settings: structuredClone(seedSettings),
    orders: [],
    wholesale: [],
    distributors: [],
    messages: [],
    subscribers: [],
    orderSeq: 1,
    rfqSeq: 1,
  };
}

export function getDemoStore(): DemoStore {
  if (!globalForDemo.__fgDemoStore) {
    globalForDemo.__fgDemoStore = createStore();
  }
  return globalForDemo.__fgDemoStore;
}

function yearPrefix() {
  return new Date().getFullYear();
}

export function getDemoProducts() {
  return getDemoStore().products.filter((p) => p.active);
}

export function getDemoProductBySlug(slug: string) {
  return getDemoStore().products.find((p) => p.slug === slug && p.active);
}

export function getDemoCategories() {
  return categories;
}

export function getDemoSettings() {
  return getDemoStore().settings;
}

export function updateDemoSettings(patch: Partial<SiteSettings>) {
  const store = getDemoStore();
  store.settings = { ...store.settings, ...patch };
  return store.settings;
}

export function getDemoTestimonials() {
  return testimonials;
}

export function getDemoFaqs() {
  return faqs;
}

export function getDemoCertifications() {
  return certifications.filter((c) => c.active);
}

export function createDemoOrder(input: CreateOrderInput): Order {
  const store = getDemoStore();
  const orderNumber = `FG-${yearPrefix()}-${String(store.orderSeq).padStart(5, "0")}`;
  store.orderSeq += 1;
  const now = new Date().toISOString();
  const order: Order = {
    id: randomUUID(),
    orderNumber,
    status: input.status ?? "pending",
    paymentStatus: input.paymentStatus ?? "unpaid",
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  store.orders.unshift(order);
  return order;
}

export function getDemoOrders() {
  return getDemoStore().orders;
}

export function getDemoOrderByNumber(orderNumber: string) {
  return getDemoStore().orders.find((o) => o.orderNumber === orderNumber);
}

export function updateDemoOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
) {
  const order = getDemoOrderByNumber(orderNumber);
  if (!order) return null;
  order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  order.updatedAt = new Date().toISOString();
  return order;
}

export function createDemoWholesale(input: CreateWholesaleInput): WholesaleRequest {
  const store = getDemoStore();
  const rfqNumber = `FG-RFQ-${yearPrefix()}-${String(store.rfqSeq).padStart(5, "0")}`;
  store.rfqSeq += 1;
  const now = new Date().toISOString();
  const request: WholesaleRequest = {
    id: randomUUID(),
    rfqNumber,
    status: "new",
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  store.wholesale.unshift(request);
  return request;
}

export function getDemoWholesale() {
  return getDemoStore().wholesale;
}

export function updateDemoWholesaleStatus(rfqNumber: string, status: WholesaleStatus) {
  const item = getDemoStore().wholesale.find((w) => w.rfqNumber === rfqNumber);
  if (!item) return null;
  item.status = status;
  item.updatedAt = new Date().toISOString();
  return item;
}

export function createDemoDistributor(
  input: CreateDistributorInput,
): DistributorApplication {
  const app: DistributorApplication = {
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
    ...input,
  };
  getDemoStore().distributors.unshift(app);
  return app;
}

export function getDemoDistributors() {
  return getDemoStore().distributors;
}

export function createDemoMessage(input: CreateContactInput): ContactMessage {
  const message: ContactMessage = {
    id: randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
    ...input,
  };
  getDemoStore().messages.unshift(message);
  return message;
}

export function getDemoMessages() {
  return getDemoStore().messages;
}

export function subscribeDemoNewsletter(email: string) {
  const store = getDemoStore();
  const existing = store.subscribers.find((s) => s.email === email);
  if (existing) return existing;
  const sub: NewsletterSubscriber = {
    id: randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };
  store.subscribers.push(sub);
  return sub;
}

export function upsertDemoProduct(product: Product) {
  const store = getDemoStore();
  const idx = store.products.findIndex((p) => p.id === product.id);
  if (idx >= 0) store.products[idx] = product;
  else store.products.push(product);
  return product;
}

export function deactivateDemoProduct(id: string) {
  const product = getDemoStore().products.find((p) => p.id === id);
  if (!product) return null;
  product.active = false;
  product.updatedAt = new Date().toISOString();
  return product;
}

export function getDemoDashboardStats() {
  const store = getDemoStore();
  const orders = store.orders;
  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "delivered").length,
    revenue,
    products: store.products.filter((p) => p.active).length,
    customers: new Set(orders.map((o) => o.email)).size,
    wholesaleRequests: store.wholesale.length,
    distributorApplications: store.distributors.length,
    contactMessages: store.messages.length,
  };
}
