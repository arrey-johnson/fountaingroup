export type Locale = "en" | "fr";

export type LocalizedString = {
  en: string;
  fr: string;
};

export type UserRole = "customer" | "admin";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "ready"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "refunded";

export type PaymentMethod =
  | "manual"
  | "mobile_money"
  | "card"
  | "bank_transfer"
  | "cash_on_delivery";

export type WholesaleStatus =
  | "new"
  | "reviewing"
  | "quotation_sent"
  | "negotiating"
  | "approved"
  | "rejected"
  | "converted";

export type Category = {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  size: string;
  unit: string;
  price: number | null;
  compareAtPrice: number | null;
  stock: number;
  isDefault: boolean;
  active: boolean;
};

export type ProductImage = {
  id: string;
  productId: string;
  url: string;
  alt: LocalizedString;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: LocalizedString;
  brand: string;
  tagline: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  categoryId: string;
  featured: boolean;
  active: boolean;
  wholesaleAvailable: boolean;
  seoTitle: LocalizedString;
  seoDescription: LocalizedString;
  packagingInfo: LocalizedString;
  storageInfo: LocalizedString;
  usageInfo: LocalizedString;
  images: ProductImage[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};

export type SiteSettings = {
  companyName: string;
  logoUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  country: string;
  businessHours: LocalizedString;
  currencyCode: string;
  currencyDisplay: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  deliveryInfo: LocalizedString;
  promptstackUrl: string;
};

export type CartItem = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  size: string;
  unit: string;
  price: number | null;
  quantity: number;
  imageUrl: string;
};

export type OrderItem = {
  id: string;
  productId: string;
  variantId: string;
  productName: string;
  size: string;
  unitPrice: number | null;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  city: string;
  region: string;
  notes?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number | null;
  total: number | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type WholesaleRequestItem = {
  productSlug: string;
  productName: string;
  packaging: string;
  quantity: number;
  unit: string;
};

export type WholesaleRequest = {
  id: string;
  rfqNumber: string;
  fullName: string;
  companyName: string;
  businessType: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  city: string;
  products: WholesaleRequestItem[];
  frequency: string;
  deliveryDate?: string;
  deliveryPreference: string;
  additionalRequirements?: string;
  destinationPort?: string;
  preferredIncoterm?: string;
  status: WholesaleStatus;
  createdAt: string;
  updatedAt: string;
};

export type DistributorApplication = {
  id: string;
  fullName: string;
  company: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  businessType: string;
  distributionNetwork?: string;
  productsInterested: string[];
  estimatedMonthlyRequirement?: string;
  marketsServed?: string;
  additionalInfo?: string;
  status: "new" | "reviewing" | "approved" | "rejected";
  createdAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  category: "retail" | "wholesale" | "distribution" | "partnership" | "general";
  status: "new" | "read" | "replied";
  createdAt: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  imageUrl?: string;
  active: boolean;
};

export type Testimonial = {
  id: string;
  quote: LocalizedString;
  author: string;
  role: LocalizedString;
  isDemo: boolean;
};

export type FaqItem = {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
};

export type CreateOrderInput = Omit<
  Order,
  "id" | "orderNumber" | "createdAt" | "updatedAt" | "status" | "paymentStatus"
> & {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
};

export type CreateWholesaleInput = Omit<
  WholesaleRequest,
  "id" | "rfqNumber" | "status" | "createdAt" | "updatedAt"
>;

export type CreateDistributorInput = Omit<
  DistributorApplication,
  "id" | "status" | "createdAt"
>;

export type CreateContactInput = Omit<
  ContactMessage,
  "id" | "status" | "createdAt"
>;
