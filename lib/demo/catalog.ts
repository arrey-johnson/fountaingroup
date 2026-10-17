import type { Category, Product } from "@/types";

const now = "2026-01-01T00:00:00.000Z";

export const categories: Category[] = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "oils",
    name: { en: "Oils", fr: "Huiles" },
    description: {
      en: "Coconut oil, Mama’s Red Oil, avocado oil, palm kernel oil, and refined red palm oil.",
      fr: "Huile de coco, Mama’s Red Oil, huile d’avocat, huile de palmiste et huile de palme rouge raffinée.",
    },
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "fruits",
    name: { en: "Fruits", fr: "Fruits" },
    description: {
      en: "Avocados (pear), mangoes, coconuts, and pineapples.",
      fr: "Avocats (poires), mangues, noix de coco et ananas.",
    },
  },
];

function oilProduct(
  partial: Omit<Product, "createdAt" | "updatedAt" | "brand" | "wholesaleAvailable" | "active"> & {
    brand?: string;
    wholesaleAvailable?: boolean;
    active?: boolean;
  },
): Product {
  return {
    brand: "Fountain Group",
    wholesaleAvailable: true,
    active: true,
    createdAt: now,
    updatedAt: now,
    ...partial,
  };
}

export const products: Product[] = [
  oilProduct({
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    slug: "coconut-oil",
    sku: "FG-CO-001",
    name: {
      en: "Fountain Group Coconut Oil",
      fr: "Huile de Coco Fountain Group",
    },
    tagline: { en: "Pure", fr: "Pure" },
    shortDescription: {
      en: "Pure coconut oil in a 1L glass bottle for everyday cooking.",
      fr: "Huile de coco pure en bouteille en verre 1L pour la cuisine du quotidien.",
    },
    description: {
      en: "Fountain Group Coconut Oil is presented in a 1L glass bottle. Produced and packed for homes, retailers and food businesses.",
      fr: "L’huile de coco Fountain Group est présentée en bouteille en verre 1L. Produite et conditionnée pour les foyers, détaillants et entreprises alimentaires.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: true,
    seoTitle: {
      en: "Fountain Group Coconut Oil | Pure 1L",
      fr: "Huile de Coco Fountain Group | Pure 1L",
    },
    seoDescription: {
      en: "Shop Fountain Group Coconut Oil — pure 1L glass bottle for retail and bulk supply.",
      fr: "Huile de coco Fountain Group — pure, bouteille 1L, détail et gros.",
    },
    packagingInfo: { en: "1L glass bottle.", fr: "Bouteille en verre de 1L." },
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
  }),
  oilProduct({
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    slug: "mamas-red-oil",
    sku: "FG-MRO-001",
    name: { en: "Mama's Red Oil", fr: "Mama's Red Oil" },
    tagline: { en: "Organic", fr: "Biologique" },
    shortDescription: {
      en: "Organic red oil available in 1L bottles and 5L family jugs.",
      fr: "Huile rouge biologique, disponible en 1L et en bidon familial 5L.",
    },
    description: {
      en: "Mama’s Red Oil is Fountain Group’s organic red oil for traditional and everyday cooking. Available in 1L retail bottles and 5L containers. Produced and distributed by Fountain Group Ltd, Limbe – Cameroon.",
      fr: "Mama’s Red Oil est l’huile rouge biologique de Fountain Group pour la cuisine traditionnelle et quotidienne. Disponible en bouteilles 1L et bidons 5L. Produite et distribuée par Fountain Group Ltd, Limbé – Cameroun.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: true,
    seoTitle: {
      en: "Mama's Red Oil | Organic | 1L & 5L",
      fr: "Mama's Red Oil | Biologique | 1L & 5L",
    },
    seoDescription: {
      en: "Shop Mama’s Red Oil from Fountain Group — organic red oil in 1L and 5L packaging.",
      fr: "Mama’s Red Oil Fountain Group — huile rouge biologique en 1L et 5L.",
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
  }),
  oilProduct({
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    slug: "avocado-oil",
    sku: "FG-AO-001",
    name: { en: "Avocado Oil", fr: "Huile d’avocat" },
    tagline: { en: "Cooking oil", fr: "Huile de cuisine" },
    shortDescription: {
      en: "Fountain Group avocado oil for everyday cooking and food businesses.",
      fr: "Huile d’avocat Fountain Group pour la cuisine du quotidien et les entreprises alimentaires.",
    },
    description: {
      en: "Avocado oil from Fountain Group — suited to home kitchens, retail shelves, and wholesale partners. Contact us for packaging and pricing.",
      fr: "Huile d’avocat Fountain Group — adaptée aux foyers, rayons retail et partenaires gros. Contactez-nous pour les emballages et tarifs.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: true,
    seoTitle: { en: "Avocado Oil | Fountain Group", fr: "Huile d’avocat | Fountain Group" },
    seoDescription: {
      en: "Shop Fountain Group avocado oil — available for retail and bulk inquiry.",
      fr: "Huile d’avocat Fountain Group — disponible au détail et en demande de gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Emballage confirmé à la commande." },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Suitable for cooking and food preparation.",
      fr: "Convient à la cuisine et à la préparation des aliments.",
    },
    images: [
      {
        id: "img-ao-1",
        productId: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
        url: "/products/avocado-oil.svg",
        alt: { en: "Fountain Group Avocado Oil", fr: "Huile d’avocat Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "e2222222-2222-2222-2222-222222222222",
        productId: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
        sku: "FG-AO-STD",
        size: "Standard",
        unit: "bottle",
        price: null,
        compareAtPrice: null,
        stock: 50,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0",
    slug: "palm-kernel-oil",
    sku: "FG-PKO-001",
    name: { en: "Palm Kernel Oil", fr: "Huile de palmiste" },
    tagline: { en: "Cooking oil", fr: "Huile de cuisine" },
    shortDescription: {
      en: "Palm kernel oil from Fountain Group for cooking and commercial use.",
      fr: "Huile de palmiste Fountain Group pour la cuisine et l’usage commercial.",
    },
    description: {
      en: "Palm kernel oil offered by Fountain Group for retail and wholesale partners. Contact us for packaging options and supply.",
      fr: "Huile de palmiste proposée par Fountain Group pour les partenaires détail et gros. Contactez-nous pour les emballages et l’approvisionnement.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: false,
    seoTitle: { en: "Palm Kernel Oil | Fountain Group", fr: "Huile de palmiste | Fountain Group" },
    seoDescription: {
      en: "Fountain Group palm kernel oil — inquire for retail and bulk supply.",
      fr: "Huile de palmiste Fountain Group — renseignez-vous pour le détail et le gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Emballage confirmé à la commande." },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Suitable for cooking and food preparation.",
      fr: "Convient à la cuisine et à la préparation des aliments.",
    },
    images: [
      {
        id: "img-pko-1",
        productId: "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0",
        url: "/products/palm-kernel-oil.svg",
        alt: { en: "Fountain Group Palm Kernel Oil", fr: "Huile de palmiste Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f0222222-2222-2222-2222-222222222222",
        productId: "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0",
        sku: "FG-PKO-STD",
        size: "Standard",
        unit: "bottle",
        price: null,
        compareAtPrice: null,
        stock: 50,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1",
    slug: "refined-red-palm-oil",
    sku: "FG-RRPO-001",
    name: { en: "Refined Red Palm Oil", fr: "Huile de palme rouge raffinée" },
    tagline: { en: "Refined palm oil", fr: "Huile de palme raffinée" },
    shortDescription: {
      en: "Refined red palm oil from Fountain Group for cooking and food businesses.",
      fr: "Huile de palme rouge raffinée Fountain Group pour la cuisine et les entreprises alimentaires.",
    },
    description: {
      en: "Refined red palm oil offered by Fountain Group alongside Mama’s Red Oil. Contact us for packaging sizes and wholesale supply.",
      fr: "Huile de palme rouge raffinée proposée par Fountain Group aux côtés de Mama’s Red Oil. Contactez-nous pour les formats et le gros.",
    },
    categoryId: "11111111-1111-1111-1111-111111111111",
    featured: false,
    seoTitle: {
      en: "Refined Red Palm Oil | Fountain Group",
      fr: "Huile de palme rouge raffinée | Fountain Group",
    },
    seoDescription: {
      en: "Fountain Group refined red palm oil — inquire for retail and bulk supply.",
      fr: "Huile de palme rouge raffinée Fountain Group — renseignez-vous pour le détail et le gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Emballage confirmé à la commande." },
    storageInfo: {
      en: "Store sealed in a cool, dry place.",
      fr: "Conserver fermé dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Suitable for cooking and food preparation.",
      fr: "Convient à la cuisine et à la préparation des aliments.",
    },
    images: [
      {
        id: "img-rrpo-1",
        productId: "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1",
        url: "/products/refined-red-palm-oil.svg",
        alt: {
          en: "Fountain Group Refined Red Palm Oil",
          fr: "Huile de palme rouge raffinée Fountain Group",
        },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f1222222-2222-2222-2222-222222222222",
        productId: "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1",
        sku: "FG-RRPO-STD",
        size: "Standard",
        unit: "bottle",
        price: null,
        compareAtPrice: null,
        stock: 50,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2",
    slug: "avocados",
    sku: "FG-FR-AVO",
    name: { en: "Avocados (Pear)", fr: "Avocats (Poires)" },
    tagline: { en: "Fresh fruit", fr: "Fruit frais" },
    shortDescription: {
      en: "Fresh avocados (also called pear) from Fountain Group.",
      fr: "Avocats frais (aussi appelés poires) Fountain Group.",
    },
    description: {
      en: "Fountain Group supplies avocados — commonly called pear locally — for retail and wholesale partners. Contact us for availability and packaging.",
      fr: "Fountain Group propose des avocats — appelés localement poires — pour les partenaires détail et gros. Contactez-nous pour la disponibilité et le conditionnement.",
    },
    categoryId: "33333333-3333-3333-3333-333333333333",
    featured: true,
    seoTitle: { en: "Avocados (Pear) | Fountain Group", fr: "Avocats (Poires) | Fountain Group" },
    seoDescription: {
      en: "Order avocados (pear) from Fountain Group — retail and bulk inquiry.",
      fr: "Commandez des avocats (poires) Fountain Group — détail et gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Conditionnement confirmé à la commande." },
    storageInfo: {
      en: "Keep cool and handle gently to avoid bruising.",
      fr: "Conserver au frais et manipuler avec soin pour éviter les chocs.",
    },
    usageInfo: {
      en: "Enjoy fresh or in cooked dishes.",
      fr: "À déguster frais ou en cuisine.",
    },
    images: [
      {
        id: "img-avo-1",
        productId: "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2",
        url: "/products/avocados.svg",
        alt: { en: "Fountain Group Avocados", fr: "Avocats Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f2222222-2222-2222-2222-222222222222",
        productId: "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2",
        sku: "FG-FR-AVO-STD",
        size: "Standard",
        unit: "crate",
        price: null,
        compareAtPrice: null,
        stock: 40,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3",
    slug: "mangoes",
    sku: "FG-FR-MAN",
    name: { en: "Mangoes", fr: "Mangues" },
    tagline: { en: "Fresh fruit", fr: "Fruit frais" },
    shortDescription: {
      en: "Fresh mangoes supplied by Fountain Group.",
      fr: "Mangues fraîches fournies par Fountain Group.",
    },
    description: {
      en: "Fountain Group mangoes for retail shelves and wholesale partners. Contact us for seasonal availability and packaging.",
      fr: "Mangues Fountain Group pour les rayons et partenaires gros. Contactez-nous pour la disponibilité saisonnière et le conditionnement.",
    },
    categoryId: "33333333-3333-3333-3333-333333333333",
    featured: false,
    seoTitle: { en: "Mangoes | Fountain Group", fr: "Mangues | Fountain Group" },
    seoDescription: {
      en: "Order mangoes from Fountain Group — retail and bulk inquiry.",
      fr: "Commandez des mangues Fountain Group — détail et gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Conditionnement confirmé à la commande." },
    storageInfo: {
      en: "Keep cool and handle gently to avoid bruising.",
      fr: "Conserver au frais et manipuler avec soin pour éviter les chocs.",
    },
    usageInfo: {
      en: "Enjoy fresh or in cooked dishes.",
      fr: "À déguster frais ou en cuisine.",
    },
    images: [
      {
        id: "img-man-1",
        productId: "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3",
        url: "/products/mangoes.svg",
        alt: { en: "Fountain Group Mangoes", fr: "Mangues Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f3222222-2222-2222-2222-222222222222",
        productId: "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3",
        sku: "FG-FR-MAN-STD",
        size: "Standard",
        unit: "crate",
        price: null,
        compareAtPrice: null,
        stock: 40,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4",
    slug: "coconuts",
    sku: "FG-FR-COC",
    name: { en: "Coconuts", fr: "Noix de coco" },
    tagline: { en: "Fresh fruit", fr: "Fruit frais" },
    shortDescription: {
      en: "Fresh coconuts from Fountain Group.",
      fr: "Noix de coco fraîches Fountain Group.",
    },
    description: {
      en: "Whole coconuts supplied by Fountain Group for retail and wholesale partners. Contact us for availability and packaging.",
      fr: "Noix de coco entières fournies par Fountain Group pour les partenaires détail et gros. Contactez-nous pour la disponibilité et le conditionnement.",
    },
    categoryId: "33333333-3333-3333-3333-333333333333",
    featured: false,
    seoTitle: { en: "Coconuts | Fountain Group", fr: "Noix de coco | Fountain Group" },
    seoDescription: {
      en: "Order coconuts from Fountain Group — retail and bulk inquiry.",
      fr: "Commandez des noix de coco Fountain Group — détail et gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Conditionnement confirmé à la commande." },
    storageInfo: {
      en: "Store in a cool, dry place.",
      fr: "Conserver dans un endroit frais et sec.",
    },
    usageInfo: {
      en: "Enjoy fresh or in cooked dishes.",
      fr: "À déguster frais ou en cuisine.",
    },
    images: [
      {
        id: "img-coc-1",
        productId: "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4",
        url: "/products/coconuts.svg",
        alt: { en: "Fountain Group Coconuts", fr: "Noix de coco Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f4222222-2222-2222-2222-222222222222",
        productId: "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4",
        sku: "FG-FR-COC-STD",
        size: "Standard",
        unit: "crate",
        price: null,
        compareAtPrice: null,
        stock: 40,
        isDefault: true,
        active: true,
      },
    ],
  }),
  oilProduct({
    id: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5",
    slug: "pineapples",
    sku: "FG-FR-PIN",
    name: { en: "Pineapples", fr: "Ananas" },
    tagline: { en: "Fresh fruit", fr: "Fruit frais" },
    shortDescription: {
      en: "Fresh pineapples from Fountain Group.",
      fr: "Ananas frais Fountain Group.",
    },
    description: {
      en: "Fountain Group pineapples for retail and wholesale partners. Contact us for seasonal availability and packaging.",
      fr: "Ananas Fountain Group pour les partenaires détail et gros. Contactez-nous pour la disponibilité saisonnière et le conditionnement.",
    },
    categoryId: "33333333-3333-3333-3333-333333333333",
    featured: false,
    seoTitle: { en: "Pineapples | Fountain Group", fr: "Ananas | Fountain Group" },
    seoDescription: {
      en: "Order pineapples from Fountain Group — retail and bulk inquiry.",
      fr: "Commandez des ananas Fountain Group — détail et gros.",
    },
    packagingInfo: { en: "Packaging confirmed on order.", fr: "Conditionnement confirmé à la commande." },
    storageInfo: {
      en: "Keep cool and handle gently.",
      fr: "Conserver au frais et manipuler avec soin.",
    },
    usageInfo: {
      en: "Enjoy fresh or in cooked dishes.",
      fr: "À déguster frais ou en cuisine.",
    },
    images: [
      {
        id: "img-pin-1",
        productId: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5",
        url: "/products/pineapples.svg",
        alt: { en: "Fountain Group Pineapples", fr: "Ananas Fountain Group" },
        sortOrder: 0,
      },
    ],
    variants: [
      {
        id: "f5222222-2222-2222-2222-222222222222",
        productId: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5",
        sku: "FG-FR-PIN-STD",
        size: "Standard",
        unit: "crate",
        price: null,
        compareAtPrice: null,
        stock: 40,
        isDefault: true,
        active: true,
      },
    ],
  }),
];
