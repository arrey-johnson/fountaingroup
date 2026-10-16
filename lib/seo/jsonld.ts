import type { FaqItem, Locale, Product, SiteSettings } from "@/types";
import { t } from "@/lib/utils";

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.companyName,
    email: settings.email.includes("[") ? undefined : settings.email,
    telephone: settings.phone.includes("[") ? undefined : settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.includes("[") ? undefined : settings.address,
      addressLocality: settings.city.includes("[") ? undefined : settings.city,
      addressCountry: settings.country.includes("[") ? undefined : settings.country,
    },
  };
}

export function productJsonLd(product: Product, locale: Locale) {
  const variant = product.variants.find((v) => v.isDefault) ?? product.variants[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t(product.name, locale),
    description: t(product.shortDescription, locale),
    image: product.images.map((i) => i.url),
    brand: { "@type": "Brand", name: product.brand },
    sku: product.sku,
    offers: variant?.price != null
      ? {
          "@type": "Offer",
          priceCurrency: "XAF",
          price: variant.price,
          availability: "https://schema.org/InStock",
        }
      : {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "XAF",
          },
        },
  };
}

export function faqJsonLd(faqs: FaqItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: t(f.question, locale),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(f.answer, locale),
      },
    })),
  };
}
