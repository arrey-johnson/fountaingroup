import type {
  Category,
  ContactMessage,
  DistributorApplication,
  Order,
  OrderItem,
  Product,
  ProductImage,
  ProductVariant,
  SiteSettings,
  WholesaleRequest,
  WholesaleRequestItem,
} from "@/types";

type DbCategory = {
  id: string;
  slug: string;
  name_en: string;
  name_fr: string;
  description_en: string | null;
  description_fr: string | null;
};

type DbImage = {
  id: string;
  product_id: string;
  url: string;
  alt_en: string | null;
  alt_fr: string | null;
  sort_order: number;
};

type DbVariant = {
  id: string;
  product_id: string;
  sku: string;
  size: string;
  unit: string;
  price: number | string | null;
  compare_at_price: number | string | null;
  stock: number;
  is_default: boolean;
  active: boolean;
};

type DbProduct = {
  id: string;
  slug: string;
  sku: string;
  name_en: string;
  name_fr: string;
  brand: string;
  tagline_en: string | null;
  tagline_fr: string | null;
  short_description_en: string | null;
  short_description_fr: string | null;
  description_en: string | null;
  description_fr: string | null;
  category_id: string;
  featured: boolean;
  active: boolean;
  wholesale_available: boolean;
  seo_title_en: string | null;
  seo_title_fr: string | null;
  seo_description_en: string | null;
  seo_description_fr: string | null;
  packaging_info_en: string | null;
  packaging_info_fr: string | null;
  storage_info_en: string | null;
  storage_info_fr: string | null;
  usage_info_en: string | null;
  usage_info_fr: string | null;
  created_at: string;
  updated_at: string;
  product_images?: DbImage[];
  product_variants?: DbVariant[];
};

function num(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isNaN(n) ? null : n;
}

export function mapCategory(row: DbCategory): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: { en: row.name_en, fr: row.name_fr },
    description: {
      en: row.description_en ?? "",
      fr: row.description_fr ?? "",
    },
  };
}

export function mapImage(row: DbImage): ProductImage {
  return {
    id: row.id,
    productId: row.product_id,
    url: row.url,
    alt: { en: row.alt_en ?? "", fr: row.alt_fr ?? "" },
    sortOrder: row.sort_order,
  };
}

export function mapVariant(row: DbVariant): ProductVariant {
  return {
    id: row.id,
    productId: row.product_id,
    sku: row.sku,
    size: row.size,
    unit: row.unit,
    price: num(row.price),
    compareAtPrice: num(row.compare_at_price),
    stock: row.stock,
    isDefault: row.is_default,
    active: row.active,
  };
}

export function mapProduct(row: DbProduct): Product {
  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: { en: row.name_en, fr: row.name_fr },
    brand: row.brand,
    tagline: { en: row.tagline_en ?? "", fr: row.tagline_fr ?? "" },
    shortDescription: {
      en: row.short_description_en ?? "",
      fr: row.short_description_fr ?? "",
    },
    description: {
      en: row.description_en ?? "",
      fr: row.description_fr ?? "",
    },
    categoryId: row.category_id,
    featured: row.featured,
    active: row.active,
    wholesaleAvailable: row.wholesale_available,
    seoTitle: { en: row.seo_title_en ?? "", fr: row.seo_title_fr ?? "" },
    seoDescription: {
      en: row.seo_description_en ?? "",
      fr: row.seo_description_fr ?? "",
    },
    packagingInfo: {
      en: row.packaging_info_en ?? "",
      fr: row.packaging_info_fr ?? "",
    },
    storageInfo: {
      en: row.storage_info_en ?? "",
      fr: row.storage_info_fr ?? "",
    },
    usageInfo: {
      en: row.usage_info_en ?? "",
      fr: row.usage_info_fr ?? "",
    },
    images: (row.product_images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapImage),
    variants: (row.product_variants ?? []).filter((v) => v.active).map(mapVariant),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapSettings(value: Record<string, unknown>): SiteSettings {
  const social = (value.socialLinks as SiteSettings["socialLinks"]) ?? {};
  const hours = (value.businessHours as SiteSettings["businessHours"]) ?? {
    en: "",
    fr: "",
  };
  const delivery = (value.deliveryInfo as SiteSettings["deliveryInfo"]) ?? {
    en: "",
    fr: "",
  };

  return {
    companyName: String(value.companyName ?? "Fountain Group"),
    logoUrl: String(value.logoUrl ?? "/brand/logo-horizontal.png"),
    email: String(value.email ?? ""),
    phone: String(value.phone ?? ""),
    whatsapp: String(value.whatsapp ?? ""),
    address: String(value.address ?? ""),
    city: String(value.city ?? ""),
    country: String(value.country ?? ""),
    businessHours: hours,
    currencyCode: String(value.currencyCode ?? "XAF"),
    currencyDisplay: String(value.currencyDisplay ?? "FCFA"),
    socialLinks: social,
    deliveryInfo: delivery,
    promptstackUrl: String(value.promptstackUrl ?? "#"),
  };
}

export function mapOrder(
  row: {
    id: string;
    order_number: string;
    customer_name: string;
    phone: string;
    whatsapp: string | null;
    email: string;
    address: string;
    city: string;
    region: string;
    notes: string | null;
    status: Order["status"];
    payment_status: Order["paymentStatus"];
    payment_method: Order["paymentMethod"];
    subtotal: number | string | null;
    total: number | string | null;
    created_at: string;
    updated_at: string;
    order_items?: Array<{
      id: string;
      product_id: string | null;
      variant_id: string | null;
      product_name: string;
      size: string;
      unit_price: number | string | null;
      quantity: number;
    }>;
  },
): Order {
  const items: OrderItem[] = (row.order_items ?? []).map((i) => ({
    id: i.id,
    productId: i.product_id ?? "",
    variantId: i.variant_id ?? "",
    productName: i.product_name,
    size: i.size,
    unitPrice: num(i.unit_price),
    quantity: i.quantity,
  }));

  return {
    id: row.id,
    orderNumber: row.order_number,
    customerName: row.customer_name,
    phone: row.phone,
    whatsapp: row.whatsapp ?? undefined,
    email: row.email,
    address: row.address,
    city: row.city,
    region: row.region,
    notes: row.notes ?? undefined,
    status: row.status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    subtotal: num(row.subtotal),
    total: num(row.total),
    items,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapWholesale(
  row: {
    id: string;
    rfq_number: string;
    full_name: string;
    company_name: string;
    business_type: string;
    email: string;
    phone: string;
    whatsapp: string | null;
    country: string;
    city: string;
    packaging: string | null;
    quantity: number | string | null;
    unit: string | null;
    frequency: string | null;
    delivery_date: string | null;
    delivery_preference: string | null;
    additional_requirements: string | null;
    destination_port: string | null;
    preferred_incoterm: string | null;
    status: WholesaleRequest["status"];
    created_at: string;
    updated_at: string;
    wholesale_request_items?: Array<{
      product_slug: string | null;
      product_name: string;
      packaging: string | null;
      quantity: number | string;
      unit: string;
    }>;
  },
): WholesaleRequest {
  const products: WholesaleRequestItem[] = (row.wholesale_request_items ?? []).map(
    (p) => ({
      productSlug: p.product_slug ?? "",
      productName: p.product_name,
      packaging: p.packaging ?? "",
      quantity: Number(p.quantity),
      unit: p.unit,
    }),
  );

  if (!products.length && row.packaging) {
    products.push({
      productSlug: "",
      productName: "Requested products",
      packaging: row.packaging,
      quantity: Number(row.quantity ?? 0),
      unit: row.unit ?? "other",
    });
  }

  return {
    id: row.id,
    rfqNumber: row.rfq_number,
    fullName: row.full_name,
    companyName: row.company_name,
    businessType: row.business_type,
    email: row.email,
    phone: row.phone,
    whatsapp: row.whatsapp ?? undefined,
    country: row.country,
    city: row.city,
    products,
    frequency: row.frequency ?? "",
    deliveryDate: row.delivery_date ?? undefined,
    deliveryPreference: row.delivery_preference ?? "",
    additionalRequirements: row.additional_requirements ?? undefined,
    destinationPort: row.destination_port ?? undefined,
    preferredIncoterm: row.preferred_incoterm ?? undefined,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapDistributor(row: {
  id: string;
  full_name: string;
  company: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  business_type: string;
  distribution_network: string | null;
  products_interested: string[] | null;
  estimated_monthly_requirement: string | null;
  markets_served: string | null;
  additional_info: string | null;
  status: DistributorApplication["status"];
  created_at: string;
}): DistributorApplication {
  return {
    id: row.id,
    fullName: row.full_name,
    company: row.company,
    country: row.country,
    city: row.city,
    phone: row.phone,
    email: row.email,
    businessType: row.business_type,
    distributionNetwork: row.distribution_network ?? undefined,
    productsInterested: row.products_interested ?? [],
    estimatedMonthlyRequirement: row.estimated_monthly_requirement ?? undefined,
    marketsServed: row.markets_served ?? undefined,
    additionalInfo: row.additional_info ?? undefined,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function mapContact(row: {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  category: ContactMessage["category"];
  status: ContactMessage["status"];
  created_at: string;
}): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    subject: row.subject,
    message: row.message,
    category: row.category,
    status: row.status,
    createdAt: row.created_at,
  };
}
