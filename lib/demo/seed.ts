import type {
  Certification,
  FaqItem,
  SiteSettings,
  Testimonial,
} from "@/types";
import { categories, products } from "./catalog";

export { categories, products };

export const siteSettings: SiteSettings = {
  companyName: "Fountain Group",
  logoUrl: "/brand/logo-horizontal.png",
  email: "info@fountaeuropeltd.com",
  phone: "682428954",
  whatsapp: "237682428954",
  address: "Rue UTA Bonapriso",
  city: "Douala",
  country: "Cameroon",
  businessHours: {
    en: "Monday – Friday: 8:00 – 17:00 (placeholder)",
    fr: "Lundi – Vendredi : 8h00 – 17h00 (à confirmer)",
  },
  currencyCode: "XAF",
  currencyDisplay: "FCFA",
  socialLinks: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/fountain.group",
    linkedin: "",
  },
  deliveryInfo: {
    en: "Delivery details will be confirmed when your order is processed.",
    fr: "Les détails de livraison seront confirmés lors du traitement de votre commande.",
  },
  promptstackUrl: "#",
};

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote: {
      en: "Demo quote — replace with a verified customer statement when available.",
      fr: "Citation démo — à remplacer par un témoignage client vérifié.",
    },
    author: "Demo Retail Partner",
    role: { en: "Placeholder role", fr: "Rôle placeholder" },
    isDemo: true,
  },
  {
    id: "test-2",
    quote: {
      en: "Demo quote — this content is seed data for layout only.",
      fr: "Citation démo — contenu de démonstration pour la mise en page uniquement.",
    },
    author: "Demo Food Business",
    role: { en: "Placeholder role", fr: "Rôle placeholder" },
    isDemo: true,
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: {
      en: "How do I place an order?",
      fr: "Comment passer une commande ?",
    },
    answer: {
      en: "Browse the shop, add products to your cart, and complete checkout. You can also contact Fountain Group using the details on our Contact page.",
      fr: "Parcourez la boutique, ajoutez des produits au panier et finalisez la commande. Vous pouvez aussi contacter Fountain Group via la page Contact.",
    },
  },
  {
    id: "faq-2",
    question: {
      en: "Can I buy Fountain Group products in bulk?",
      fr: "Puis-je acheter les produits Fountain Group en gros ?",
    },
    answer: {
      en: "Yes. Use the Wholesale page to submit a bulk quote request. Our team will respond based on quantity, packaging and destination.",
      fr: "Oui. Utilisez la page Gros pour demander un devis. Notre équipe répondra selon la quantité, l’emballage et la destination.",
    },
  },
  {
    id: "faq-3",
    question: {
      en: "What products are available?",
      fr: "Quels produits sont disponibles ?",
    },
    answer: {
      en: "Our current range includes cooking oils (coconut oil, Mama’s Red Oil, avocado oil, palm kernel oil, and refined red palm oil) plus fruits (avocados/pear, mangoes, coconuts, and pineapples).",
      fr: "Notre gamme actuelle comprend des huiles (huile de coco, Mama’s Red Oil, huile d’avocat, huile de palmiste et huile de palme rouge raffinée) ainsi que des fruits (avocats/poires, mangues, noix de coco et ananas).",
    },
  },
  {
    id: "faq-4",
    question: {
      en: "How can I request wholesale pricing?",
      fr: "Comment demander un tarif de gros ?",
    },
    answer: {
      en: "Submit a request through the Wholesale RFQ form. Pricing depends on volume and packaging requirements.",
      fr: "Soumettez une demande via le formulaire RFQ Gros. Les tarifs dépendent du volume et des emballages.",
    },
  },
  {
    id: "faq-5",
    question: {
      en: "Where do you deliver?",
      fr: "Où livrez-vous ?",
    },
    answer: {
      en: "Share your destination in checkout or your wholesale request and our team will confirm delivery options.",
      fr: "Indiquez votre destination au checkout ou dans votre demande de gros et notre équipe confirmera les options de livraison.",
    },
  },
  {
    id: "faq-6",
    question: {
      en: "How do I become a distributor?",
      fr: "Comment devenir distributeur ?",
    },
    answer: {
      en: "Complete the Become a Distributor form. This is separate from a one-time bulk order and helps Fountain Group review partnership opportunities.",
      fr: "Remplissez le formulaire Devenir distributeur. C’est distinct d’une commande en volume et permet à Fountain Group d’étudier les opportunités de partenariat.",
    },
  },
];

export const certifications: Certification[] = [];
