import type {
  Category,
  Certification,
  FaqItem,
  Product,
  SiteSettings,
  Testimonial,
} from "@/types";

export const siteSettings: SiteSettings = {
  companyName: "Fountain Group",
  logoUrl: "/brand/logo.png",
  email: "info@fountaingroupltd.com",
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
    instagram: "https://www.instagram.com/fountaingroupltd",
    linkedin: "",
  },
  deliveryInfo: {
    en: "Delivery details will be confirmed when your order is processed.",
    fr: "Les détails de livraison seront confirmés lors du traitement de votre commande.",
  },
  promptstackUrl: "#",
};

export const categories: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "coconut-products",
    name: { en: "Coconut Products", fr: "Produits à base de coco" },
    description: {
      en: "Coconut oil and coconut flour for everyday cooking.",
      fr: "Huile de coco et farine de coco pour la cuisine du quotidien.",
    },
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "palm-red-oil-products",
    name: { en: "Palm / Red Oil Products", fr: "Produits d’huile de palme / rouge" },
    description: {
      en: "Mama’s Red Oil in retail and family packaging.",
      fr: "Mama’s Red Oil en emballage détail et familial.",
    },
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "honey-products",
    name: { en: "Honey Products", fr: "Produits à base de miel" },
    description: {
      en: "Pure honey from Fountain Group.",
      fr: "Miel pur Fountain Group.",
    },
  },
];

export const products: Product[] = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    slug: "coconut-oil",
    sku: "FG-CO-001",
    name: {
      en: "Fountain Group Coconut Oil",
      fr: "Huile de Coco Fountain Group",
    },
    brand: "Fountain Group",
    tagline: { en: "Pure & Natural", fr: "Pure & Naturelle" },
    shortDescription: {
      en: "Pure & natural coconut oil in a 1L glass bottle for everyday cooking.",
      fr: "Huile de coco pure et naturelle en bouteille en verre 1L pour la cuisine du quotidien.",
    },
    description: {
      en: "Fountain Group Coconut Oil is presented in a 1L glass bottle with our Pure & Natural positioning. Produced and packed for homes, retailers and food businesses.",
      fr: "L’huile de coco Fountain Group est présentée en bouteille en verre 1L, Pure & Naturelle. Produite et conditionnée pour les foyers, détaillants et entreprises alimentaires.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesaleAvailable: true,
    seoTitle: {
      en: "Fountain Group Coconut Oil | Pure & Natural 1L",
      fr: "Huile de Coco Fountain Group | Pure & Naturelle 1L",
    },
    seoDescription: {
      en: "Shop Fountain Group Coconut Oil — pure & natural 1L glass bottle for retail and bulk supply.",
      fr: "Huile de coco Fountain Group — pure et naturelle, bouteille 1L, détail et gros.",
    },
    packagingInfo: {
      en: "1L glass bottle.",
      fr: "Bouteille en verre de 1L.",
    },
    storageInfo: {
      en: "Store in a cool, dry place away from direct sunlight.",
      fr: "Conserver dans un endroit frais et sec, à l’abri de la lumière directe.",
    },
    usageInfo: {
      en: "Suitable for cooking and food preparation.",
      fr: "Convient à la cuisine et à la préparation des aliments.",
    },
    images: [
      {
        id: "img-co-1",
        productId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        url: "/products/coconut-oil.png",
        alt: {
          en: "Fountain Group Coconut Oil 1L glass bottle",
          fr: "Huile de coco Fountain Group en bouteille en verre 1L",
        },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "a2222222-2222-2222-2222-222222222222",
        productId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        sku: "FG-CO-1L",
        size: "1L",
        unit: "bottle",
        price: null,
        compareAtPrice: null,
        stock: 100,
        isDefault: true,
        active: true,
      },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    slug: "mamas-red-oil",
    sku: "FG-MRO-001",
    name: { en: "Mama's Red Oil", fr: "Mama's Red Oil" },
    brand: "Fountain Group",
    tagline: { en: "Organic & Natural", fr: "Biologique & Naturelle" },
    shortDescription: {
      en: "Organic & natural red oil available in 1L bottles and 5L family jugs.",
      fr: "Huile rouge biologique et naturelle, disponible en 1L et en bidon familial 5L.",
    },
    description: {
      en: "Mama’s Red Oil is Fountain Group’s organic & natural red oil for traditional and everyday cooking. Available in 1L retail bottles and 5L containers. Produced and distributed by Fountain Group Ltd, Limbe – Cameroon.",
      fr: "Mama’s Red Oil est l’huile rouge biologique et naturelle de Fountain Group pour la cuisine traditionnelle et quotidienne. Disponible en bouteilles 1L et bidons 5L. Produite et distribuée par Fountain Group Ltd, Limbé – Cameroun.",
    },
    categoryId: "22222222-2222-2222-2222-222222222222",
    featured: true,
    active: true,
    wholesaleAvailable: true,
    seoTitle: {
      en: "Mama's Red Oil | Organic & Natural | 1L & 5L",
      fr: "Mama's Red Oil | Biologique & Naturelle | 1L & 5L",
    },
    seoDescription: {
      en: "Shop Mama’s Red Oil from Fountain Group — organic & natural red oil in 1L and 5L packaging.",
      fr: "Mama’s Red Oil Fountain Group — huile rouge biologique et naturelle en 1L et 5L.",
    },
    packagingInfo: {
      en: "1L plastic bottle and 5L jug with handle.",
      fr: "Bouteille plastique 1L et bidon 5L avec poignée.",
    },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Ideal for traditional and everyday cooking.",
      fr: "Idéale pour la cuisine traditionnelle et quotidienne.",
    },
    images: [
      {
        id: "img-mro-1",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        url: "/products/mamas-red-oil.png",
        alt: {
          en: "Mama's Red Oil 1L and 5L packaging",
          fr: "Mama's Red Oil en formats 1L et 5L",
        },
        sortOrder: 0,
      },
      {
        id: "img-mro-2",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        url: "/products/mamas-red-oil-1l.png",
        alt: {
          en: "Mama's Red Oil 1L bottle",
          fr: "Mama's Red Oil bouteille 1L",
        },
        sortOrder: 1,
      },
      {
        id: "img-mro-3",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        url: "/products/mamas-red-oil-5l.png",
        alt: {
          en: "Mama's Red Oil 5L jug",
          fr: "Mama's Red Oil bidon 5L",
        },
        sortOrder: 2,
      },
      {
        id: "img-mro-4",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        url: "/products/mamas-red-oil-pair.png",
        alt: {
          en: "Mama's Red Oil bottle pair",
          fr: "Mama's Red Oil paire de bouteilles",
        },
        sortOrder: 3,
      },
    ],
    variants: [
      {
        id: "b2222222-2222-2222-2222-222222222221",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        sku: "FG-MRO-1L",
        size: "1L",
        unit: "bottle",
        price: null,
        compareAtPrice: null,
        stock: 100,
        isDefault: true,
        active: true,
      },
      {
        id: "b2222222-2222-2222-2222-222222222225",
        productId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        sku: "FG-MRO-5L",
        size: "5L",
        unit: "container",
        price: null,
        compareAtPrice: null,
        stock: 50,
        isDefault: false,
        active: true,
      },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    slug: "pure-honey",
    sku: "FG-HN-001",
    name: { en: "Fountain Group Pure Honey", fr: "Miel Pur Fountain Group" },
    brand: "Fountain Group",
    tagline: { en: "Pure Honey", fr: "Miel Pur" },
    shortDescription: {
      en: "Pure honey marketed and distributed by Fountain Group Ltd.",
      fr: "Miel pur commercialisé et distribué par Fountain Group Ltd.",
    },
    description: {
      en: "Fountain Group Pure Honey is part of our organic-focused product range. Marketed and distributed by Fountain Group Ltd. Made in CEMAC. Bottled in Limbe by Fountain Group Ltd.",
      fr: "Le miel pur Fountain Group fait partie de notre gamme axée sur les produits naturels. Commercialisé et distribué par Fountain Group Ltd. Made in CEMAC. Mis en bouteille à Limbé par Fountain Group Ltd.",
    },
    categoryId: "33333333-3333-3333-3333-333333333333",
    featured: true,
    active: true,
    wholesaleAvailable: true,
    seoTitle: {
      en: "Fountain Group Pure Honey",
      fr: "Miel Pur Fountain Group",
    },
    seoDescription: {
      en: "Discover Fountain Group Pure Honey — available for retail and bulk inquiry.",
      fr: "Découvrez le miel pur Fountain Group — disponible au détail et en demande de gros.",
    },
    packagingInfo: {
      en: "Plastic jug with handle (as photographed).",
      fr: "Bidon plastique avec poignée (selon photo produit).",
    },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Enjoy as a natural sweetener in food and drinks.",
      fr: "À utiliser comme édulcorant naturel dans les aliments et boissons.",
    },
    images: [
      {
        id: "img-hn-1",
        productId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        url: "/products/pure-honey.png",
        alt: {
          en: "Fountain Group Pure Honey jug",
          fr: "Bidon de miel pur Fountain Group",
        },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "c2222222-2222-2222-2222-222222222222",
        productId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
        sku: "FG-HN-JUG",
        size: "Jug",
        unit: "container",
        price: null,
        compareAtPrice: null,
        stock: 50,
        isDefault: true,
        active: true,
      },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    slug: "organic-coconut-flour",
    sku: "FG-CF-001",
    name: {
      en: "Organic Coconut Flour",
      fr: "Farine de Coco Biologique",
    },
    brand: "Fountain Group",
    tagline: { en: "From freshly harvested coconuts", fr: "À partir de noix de coco fraîchement récoltées" },
    shortDescription: {
      en: "Premium organic coconut flour from The Fountain Group.",
      fr: "Farine de coco biologique premium de The Fountain Group.",
    },
    description: {
      en: "Organic Coconut Flour from The Fountain Group — premium coconut flour made from freshly harvested coconuts, suited to baking and everyday cooking.",
      fr: "Farine de coco biologique The Fountain Group — farine de coco premium issue de noix de coco fraîchement récoltées, idéale pour la pâtisserie et la cuisine.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesaleAvailable: true,
    seoTitle: {
      en: "Organic Coconut Flour | Fountain Group",
      fr: "Farine de Coco Biologique | Fountain Group",
    },
    seoDescription: {
      en: "Shop Organic Coconut Flour from Fountain Group — premium coconut flour for retail and bulk.",
      fr: "Farine de coco biologique Fountain Group — farine premium pour le détail et le gros.",
    },
    packagingInfo: {
      en: "Sealed flour bag (as photographed).",
      fr: "Sachet de farine scellé (selon photo produit).",
    },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Ideal for baking and cooking recipes that call for coconut flour.",
      fr: "Idéale pour la pâtisserie et les recettes à base de farine de coco.",
    },
    images: [
      {
        id: "img-cf-1",
        productId: "dddddddd-dddd-dddd-dddd-dddddddddddd",
        url: "/products/organic-coconut-flour.png",
        alt: {
          en: "Fountain Group Organic Coconut Flour bag",
          fr: "Sachet de farine de coco biologique Fountain Group",
        },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "d2222222-2222-2222-2222-222222222222",
        productId: "dddddddd-dddd-dddd-dddd-dddddddddddd",
        sku: "FG-CF-BAG",
        size: "Bag",
        unit: "bag",
        price: null,
        compareAtPrice: null,
        stock: 80,
        isDefault: true,
        active: true,
      },
    ],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

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
      en: "Our current range includes Fountain Group Coconut Oil (1L), Mama’s Red Oil (1L and 5L), Pure Honey, and Organic Coconut Flour.",
      fr: "Notre gamme actuelle comprend l’huile de coco Fountain Group (1L), Mama’s Red Oil (1L et 5L), le miel pur et la farine de coco biologique.",
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
