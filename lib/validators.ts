import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(6, "Phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Delivery address is required"),
  city: z.string().min(2, "City is required"),
  region: z.string().min(2, "Region is required"),
  notes: z.string().optional(),
  paymentMethod: z.enum([
    "manual",
    "mobile_money",
    "card",
    "bank_transfer",
    "cash_on_delivery",
  ]),
});

export const wholesaleSchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().min(2),
  businessType: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  whatsapp: z.string().optional(),
  country: z.string().min(2),
  city: z.string().min(2),
  productSelection: z.enum([
    "coconut-oil",
    "mamas-red-oil",
    "pure-honey",
    "organic-coconut-flour",
    "multiple",
  ]),
  packaging: z.string().min(1),
  quantity: z.coerce.number().positive(),
  unit: z.enum(["bottles", "cartons", "litres", "other"]),
  frequency: z.enum(["one-time", "weekly", "monthly", "other"]),
  deliveryDate: z.string().optional(),
  deliveryPreference: z.string().min(2),
  additionalRequirements: z.string().optional(),
  destinationPort: z.string().optional(),
  preferredIncoterm: z.enum(["EXW", "FOB", "CIF", "Other", "Not Sure"]).optional(),
  isExport: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  category: z.enum(["retail", "wholesale", "distribution", "partnership", "general"]),
});

export const distributorSchema = z.object({
  fullName: z.string().min(2),
  company: z.string().min(2),
  country: z.string().min(2),
  city: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  businessType: z.string().min(2),
  distributionNetwork: z.string().optional(),
  productsInterested: z.array(z.string()).min(1),
  estimatedMonthlyRequirement: z.string().optional(),
  marketsServed: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type WholesaleInput = z.infer<typeof wholesaleSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type DistributorInput = z.infer<typeof distributorSchema>;
