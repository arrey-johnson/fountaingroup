import { createAdminClient } from "./admin";
import {
  mapCategory,
  mapContact,
  mapDistributor,
  mapOrder,
  mapProduct,
  mapSettings,
  mapWholesale,
} from "./mappers";
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

const PRODUCT_SELECT = `
  *,
  product_images (*),
  product_variants (*)
`;

function yearPrefix() {
  return new Date().getFullYear();
}

async function nextSequence(name: "order_number_seq" | "rfq_number_seq") {
  const admin = createAdminClient();
  const { data, error } = await admin.rpc("next_ref_number", { seq_name: name });
  if (error || data == null) {
    // Fallback: count + 1
    if (name === "order_number_seq") {
      const { count } = await admin
        .from("orders")
        .select("*", { count: "exact", head: true });
      return (count ?? 0) + 1;
    }
    const { count } = await admin
      .from("wholesale_requests")
      .select("*", { count: "exact", head: true });
    return (count ?? 0) + 1;
  }
  return Number(data);
}

export async function getProducts(): Promise<Product[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("active", true)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) throw error;
  return data ? mapProduct(data) : undefined;
}

export async function getCategories() {
  const admin = createAdminClient();
  const { data, error } = await admin.from("categories").select("*").order("slug");
  if (error) throw error;
  return (data ?? []).map(mapCategory);
}

export async function getSettings(): Promise<SiteSettings> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("site_settings")
    .select("value")
    .eq("key", "main")
    .maybeSingle();
  if (error) throw error;
  if (!data?.value) {
    throw new Error("site_settings.main is missing");
  }
  return mapSettings(data.value as Record<string, unknown>);
}

export async function updateSettings(patch: Partial<SiteSettings>) {
  const admin = createAdminClient();
  const current = await getSettings();
  const next = { ...current, ...patch };
  const { error } = await admin.from("site_settings").upsert({
    key: "main",
    value: next,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return next;
}

export async function getTestimonials() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("testimonials")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    quote: {
      en: row.quote_en as string,
      fr: row.quote_fr as string,
    },
    author: row.author as string,
    role: {
      en: row.role_en as string,
      fr: row.role_fr as string,
    },
    isDemo: Boolean(row.is_demo),
  }));
}

export async function getFaqs() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("faqs")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    question: {
      en: row.question_en as string,
      fr: row.question_fr as string,
    },
    answer: {
      en: row.answer_en as string,
      fr: row.answer_fr as string,
    },
  }));
}

export async function getCertifications() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("certifications")
    .select("*")
    .eq("active", true);
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    name: row.name as string,
    issuer: row.issuer as string,
    imageUrl: (row.image_url as string | null) ?? undefined,
    active: Boolean(row.active),
  }));
}

export async function createOrder(input: CreateOrderInput) {
  const admin = createAdminClient();
  const seq = await nextSequence("order_number_seq");
  const orderNumber = `FG-${yearPrefix()}-${String(seq).padStart(5, "0")}`;

  const { data: order, error } = await admin
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_name: input.customerName,
      phone: input.phone,
      whatsapp: input.whatsapp ?? null,
      email: input.email,
      address: input.address,
      city: input.city,
      region: input.region,
      notes: input.notes ?? null,
      status: input.status ?? "pending",
      payment_status: input.paymentStatus ?? "unpaid",
      payment_method: input.paymentMethod,
      subtotal: input.subtotal,
      total: input.total,
    })
    .select("*")
    .single();
  if (error) throw error;

  if (input.items.length) {
    const { error: itemsError } = await admin.from("order_items").insert(
      input.items.map((i) => ({
        order_id: order.id,
        product_id: i.productId || null,
        variant_id: i.variantId || null,
        product_name: i.productName,
        size: i.size,
        unit_price: i.unitPrice,
        quantity: i.quantity,
      })),
    );
    if (itemsError) throw itemsError;
  }

  await admin.from("payments").insert({
    order_id: order.id,
    provider: "manual",
    method: input.paymentMethod,
    status: input.paymentStatus ?? "unpaid",
    amount: input.total,
    reference: `MANUAL-${orderNumber}`,
  });

  return (await getOrderByNumber(orderNumber))!;
}

export async function getOrders() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapOrder);
}

export async function getOrderByNumber(orderNumber: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (error) throw error;
  return data ? mapOrder(data) : undefined;
}

export async function updateOrderStatus(
  orderNumber: string,
  status: OrderStatus,
  paymentStatus?: PaymentStatus,
) {
  const admin = createAdminClient();
  const patch: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (paymentStatus) patch.payment_status = paymentStatus;
  const { error } = await admin
    .from("orders")
    .update(patch)
    .eq("order_number", orderNumber);
  if (error) throw error;
  return getOrderByNumber(orderNumber);
}

export async function createWholesaleRequest(input: CreateWholesaleInput) {
  const admin = createAdminClient();
  const seq = await nextSequence("rfq_number_seq");
  const rfqNumber = `FG-RFQ-${yearPrefix()}-${String(seq).padStart(5, "0")}`;
  const primary = input.products[0];

  const { data, error } = await admin
    .from("wholesale_requests")
    .insert({
      rfq_number: rfqNumber,
      full_name: input.fullName,
      company_name: input.companyName,
      business_type: input.businessType,
      email: input.email,
      phone: input.phone,
      whatsapp: input.whatsapp ?? null,
      country: input.country,
      city: input.city,
      packaging: primary?.packaging ?? null,
      quantity: primary?.quantity ?? null,
      unit: primary?.unit ?? null,
      frequency: input.frequency,
      delivery_date: input.deliveryDate || null,
      delivery_preference: input.deliveryPreference,
      additional_requirements: input.additionalRequirements ?? null,
      destination_port: input.destinationPort ?? null,
      preferred_incoterm: input.preferredIncoterm ?? null,
      status: "new",
    })
    .select("*")
    .single();
  if (error) throw error;

  if (input.products.length) {
    const { error: itemsError } = await admin.from("wholesale_request_items").insert(
      input.products.map((p) => ({
        request_id: data.id,
        product_slug: p.productSlug,
        product_name: p.productName,
        packaging: p.packaging,
        quantity: p.quantity,
        unit: p.unit,
      })),
    );
    if (itemsError) throw itemsError;
  }

  return (await getWholesaleByNumber(rfqNumber))!;
}

async function getWholesaleByNumber(rfqNumber: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("wholesale_requests")
    .select("*, wholesale_request_items(*)")
    .eq("rfq_number", rfqNumber)
    .maybeSingle();
  if (error) throw error;
  return data ? mapWholesale(data) : undefined;
}

export async function getWholesaleRequests() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("wholesale_requests")
    .select("*, wholesale_request_items(*)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapWholesale);
}

export async function updateWholesaleStatus(
  rfqNumber: string,
  status: WholesaleStatus,
) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("wholesale_requests")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("rfq_number", rfqNumber);
  if (error) throw error;
  return getWholesaleByNumber(rfqNumber);
}

export async function createDistributorApplication(input: CreateDistributorInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("distributor_applications")
    .insert({
      full_name: input.fullName,
      company: input.company,
      country: input.country,
      city: input.city,
      phone: input.phone,
      email: input.email,
      business_type: input.businessType,
      distribution_network: input.distributionNetwork ?? null,
      products_interested: input.productsInterested,
      estimated_monthly_requirement: input.estimatedMonthlyRequirement ?? null,
      markets_served: input.marketsServed ?? null,
      additional_info: input.additionalInfo ?? null,
      status: "new",
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapDistributor(data);
}

export async function getDistributorApplications() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("distributor_applications")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapDistributor);
}

export async function createContactMessage(input: CreateContactInput) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contact_messages")
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email,
      subject: input.subject,
      message: input.message,
      category: input.category,
      status: "new",
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapContact(data);
}

export async function getContactMessages() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapContact);
}

export async function subscribeNewsletter(email: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("newsletter_subscribers")
    .upsert({ email }, { onConflict: "email" })
    .select("*")
    .single();
  if (error) throw error;
  return {
    id: data.id as string,
    email: data.email as string,
    createdAt: data.created_at as string,
  };
}

export async function upsertProduct(product: Product) {
  const admin = createAdminClient();
  const { error } = await admin.from("products").upsert({
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    name_en: product.name.en,
    name_fr: product.name.fr,
    brand: product.brand,
    tagline_en: product.tagline.en,
    tagline_fr: product.tagline.fr,
    short_description_en: product.shortDescription.en,
    short_description_fr: product.shortDescription.fr,
    description_en: product.description.en,
    description_fr: product.description.fr,
    category_id: product.categoryId,
    featured: product.featured,
    active: product.active,
    wholesale_available: product.wholesaleAvailable,
    seo_title_en: product.seoTitle.en,
    seo_title_fr: product.seoTitle.fr,
    seo_description_en: product.seoDescription.en,
    seo_description_fr: product.seoDescription.fr,
    packaging_info_en: product.packagingInfo.en,
    packaging_info_fr: product.packagingInfo.fr,
    storage_info_en: product.storageInfo.en,
    storage_info_fr: product.storageInfo.fr,
    usage_info_en: product.usageInfo.en,
    usage_info_fr: product.usageInfo.fr,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return product;
}

export async function deactivateProduct(id: string) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("products")
    .update({ active: false, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  const product = await getProducts().then((list) => list.find((p) => p.id === id));
  return product ?? null;
}

export async function getDashboardStats() {
  const admin = createAdminClient();
  const [orders, products, wholesale, distributors, messages] = await Promise.all([
    admin.from("orders").select("status, payment_status, total, email"),
    admin.from("products").select("id", { count: "exact", head: true }).eq("active", true),
    admin.from("wholesale_requests").select("id", { count: "exact", head: true }),
    admin.from("distributor_applications").select("id", { count: "exact", head: true }),
    admin.from("contact_messages").select("id", { count: "exact", head: true }),
  ]);

  const orderRows = orders.data ?? [];
  const revenue = orderRows
    .filter((o) => o.payment_status === "paid")
    .reduce((sum, o) => sum + Number(o.total ?? 0), 0);

  return {
    totalOrders: orderRows.length,
    pendingOrders: orderRows.filter((o) => o.status === "pending").length,
    completedOrders: orderRows.filter((o) => o.status === "delivered").length,
    revenue,
    products: products.count ?? 0,
    customers: new Set(orderRows.map((o) => o.email as string)).size,
    wholesaleRequests: wholesale.count ?? 0,
    distributorApplications: distributors.count ?? 0,
    contactMessages: messages.count ?? 0,
  };
}
