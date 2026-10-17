import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env");
  process.exit(1);
}

const admin = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const categories = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    slug: "oils",
    name_en: "Oils",
    name_fr: "Huiles",
    description_en:
      "Coconut oil, Mama’s Red Oil, avocado oil, palm kernel oil, and refined red palm oil.",
    description_fr:
      "Huile de coco, Mama’s Red Oil, huile d’avocat, huile de palmiste et huile de palme rouge raffinée.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "fruits",
    name_en: "Fruits",
    name_fr: "Fruits",
    description_en: "Avocados (pear), mangoes, coconuts, and pineapples.",
    description_fr: "Avocats (poires), mangues, noix de coco et ananas.",
  },
];

const products = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    slug: "coconut-oil",
    sku: "FG-CO-001",
    name_en: "Fountain Group Coconut Oil",
    name_fr: "Huile de Coco Fountain Group",
    brand: "Fountain Group",
    tagline_en: "Pure",
    tagline_fr: "Pure",
    short_description_en:
      "Pure coconut oil in a 1L glass bottle for everyday cooking.",
    short_description_fr:
      "Huile de coco pure en bouteille en verre 1L pour la cuisine du quotidien.",
    description_en:
      "Fountain Group Coconut Oil is presented in a 1L glass bottle. Produced and packed for homes, retailers and food businesses.",
    description_fr:
      "L’huile de coco Fountain Group est présentée en bouteille en verre 1L. Produite et conditionnée pour les foyers, détaillants et entreprises alimentaires.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Fountain Group Coconut Oil | Pure 1L",
    seo_title_fr: "Huile de Coco Fountain Group | Pure 1L",
    seo_description_en:
      "Shop Fountain Group Coconut Oil — pure 1L glass bottle for retail and bulk supply.",
    seo_description_fr:
      "Huile de coco Fountain Group — pure, bouteille 1L, détail et gros.",
    packaging_info_en: "1L glass bottle.",
    packaging_info_fr: "Bouteille en verre de 1L.",
    storage_info_en: "Store in a cool, dry place away from direct sunlight.",
    storage_info_fr:
      "Conserver dans un endroit frais et sec, à l’abri de la lumière directe.",
    usage_info_en: "Suitable for cooking and food preparation.",
    usage_info_fr: "Convient à la cuisine et à la préparation des aliments.",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    slug: "mamas-red-oil",
    sku: "FG-MRO-001",
    name_en: "Mama's Red Oil",
    name_fr: "Mama's Red Oil",
    brand: "Fountain Group",
    tagline_en: "Organic",
    tagline_fr: "Biologique",
    short_description_en:
      "Organic red oil available in 1L bottles and 5L family jugs.",
    short_description_fr:
      "Huile rouge biologique, disponible en 1L et en bidon familial 5L.",
    description_en:
      "Mama’s Red Oil is Fountain Group’s organic red oil for traditional and everyday cooking. Available in 1L retail bottles and 5L containers. Produced and distributed by Fountain Group Ltd, Limbe – Cameroon.",
    description_fr:
      "Mama’s Red Oil est l’huile rouge biologique de Fountain Group pour la cuisine traditionnelle et quotidienne. Disponible en bouteilles 1L et bidons 5L. Produite et distribuée par Fountain Group Ltd, Limbé – Cameroun.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Mama's Red Oil | Organic | 1L & 5L",
    seo_title_fr: "Mama's Red Oil | Biologique | 1L & 5L",
    seo_description_en:
      "Shop Mama’s Red Oil from Fountain Group — organic red oil in 1L and 5L packaging.",
    seo_description_fr:
      "Mama’s Red Oil Fountain Group — huile rouge biologique en 1L et 5L.",
    packaging_info_en: "1L plastic bottle and 5L jug with handle.",
    packaging_info_fr: "Bouteille plastique 1L et bidon 5L avec poignée.",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Ideal for traditional and everyday cooking.",
    usage_info_fr: "Idéale pour la cuisine traditionnelle et quotidienne.",
  },
  {
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    slug: "avocado-oil",
    sku: "FG-AO-001",
    name_en: "Avocado Oil",
    name_fr: "Huile d’avocat",
    brand: "Fountain Group",
    tagline_en: "Cooking oil",
    tagline_fr: "Huile de cuisine",
    short_description_en:
      "Fountain Group avocado oil for everyday cooking and food businesses.",
    short_description_fr:
      "Huile d’avocat Fountain Group pour la cuisine du quotidien et les entreprises alimentaires.",
    description_en:
      "Avocado oil from Fountain Group — suited to home kitchens, retail shelves, and wholesale partners. Contact us for packaging and pricing.",
    description_fr:
      "Huile d’avocat Fountain Group — adaptée aux foyers, rayons retail et partenaires gros. Contactez-nous pour les emballages et tarifs.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Avocado Oil | Fountain Group",
    seo_title_fr: "Huile d’avocat | Fountain Group",
    seo_description_en:
      "Shop Fountain Group avocado oil — available for retail and bulk inquiry.",
    seo_description_fr:
      "Huile d’avocat Fountain Group — disponible au détail et en demande de gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Emballage confirmé à la commande.",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Suitable for cooking and food preparation.",
    usage_info_fr: "Convient à la cuisine et à la préparation des aliments.",
  },
  {
    id: "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0",
    slug: "palm-kernel-oil",
    sku: "FG-PKO-001",
    name_en: "Palm Kernel Oil",
    name_fr: "Huile de palmiste",
    brand: "Fountain Group",
    tagline_en: "Cooking oil",
    tagline_fr: "Huile de cuisine",
    short_description_en:
      "Palm kernel oil from Fountain Group for cooking and commercial use.",
    short_description_fr:
      "Huile de palmiste Fountain Group pour la cuisine et l’usage commercial.",
    description_en:
      "Palm kernel oil offered by Fountain Group for retail and wholesale partners. Contact us for packaging options and supply.",
    description_fr:
      "Huile de palmiste proposée par Fountain Group pour les partenaires détail et gros. Contactez-nous pour les emballages et l’approvisionnement.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: false,
    active: true,
    wholesale_available: true,
    seo_title_en: "Palm Kernel Oil | Fountain Group",
    seo_title_fr: "Huile de palmiste | Fountain Group",
    seo_description_en:
      "Fountain Group palm kernel oil — inquire for retail and bulk supply.",
    seo_description_fr:
      "Huile de palmiste Fountain Group — renseignez-vous pour le détail et le gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Emballage confirmé à la commande.",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Suitable for cooking and food preparation.",
    usage_info_fr: "Convient à la cuisine et à la préparation des aliments.",
  },
  {
    id: "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1",
    slug: "refined-red-palm-oil",
    sku: "FG-RRPO-001",
    name_en: "Refined Red Palm Oil",
    name_fr: "Huile de palme rouge raffinée",
    brand: "Fountain Group",
    tagline_en: "Refined palm oil",
    tagline_fr: "Huile de palme raffinée",
    short_description_en:
      "Refined red palm oil from Fountain Group for cooking and food businesses.",
    short_description_fr:
      "Huile de palme rouge raffinée Fountain Group pour la cuisine et les entreprises alimentaires.",
    description_en:
      "Refined red palm oil offered by Fountain Group alongside Mama’s Red Oil. Contact us for packaging sizes and wholesale supply.",
    description_fr:
      "Huile de palme rouge raffinée proposée par Fountain Group aux côtés de Mama’s Red Oil. Contactez-nous pour les formats et le gros.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: false,
    active: true,
    wholesale_available: true,
    seo_title_en: "Refined Red Palm Oil | Fountain Group",
    seo_title_fr: "Huile de palme rouge raffinée | Fountain Group",
    seo_description_en:
      "Fountain Group refined red palm oil — inquire for retail and bulk supply.",
    seo_description_fr:
      "Huile de palme rouge raffinée Fountain Group — renseignez-vous pour le détail et le gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Emballage confirmé à la commande.",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Suitable for cooking and food preparation.",
    usage_info_fr: "Convient à la cuisine et à la préparation des aliments.",
  },
  {
    id: "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2",
    slug: "avocados",
    sku: "FG-FR-AVO",
    name_en: "Avocados (Pear)",
    name_fr: "Avocats (Poires)",
    brand: "Fountain Group",
    tagline_en: "Fresh fruit",
    tagline_fr: "Fruit frais",
    short_description_en: "Fresh avocados (also called pear) from Fountain Group.",
    short_description_fr: "Avocats frais (aussi appelés poires) Fountain Group.",
    description_en:
      "Fountain Group supplies avocados — commonly called pear locally — for retail and wholesale partners. Contact us for availability and packaging.",
    description_fr:
      "Fountain Group propose des avocats — appelés localement poires — pour les partenaires détail et gros. Contactez-nous pour la disponibilité et le conditionnement.",
    category_id: "33333333-3333-3333-3333-333333333333",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Avocados (Pear) | Fountain Group",
    seo_title_fr: "Avocats (Poires) | Fountain Group",
    seo_description_en:
      "Order avocados (pear) from Fountain Group — retail and bulk inquiry.",
    seo_description_fr:
      "Commandez des avocats (poires) Fountain Group — détail et gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Conditionnement confirmé à la commande.",
    storage_info_en: "Keep cool and handle gently to avoid bruising.",
    storage_info_fr:
      "Conserver au frais et manipuler avec soin pour éviter les chocs.",
    usage_info_en: "Enjoy fresh or in cooked dishes.",
    usage_info_fr: "À déguster frais ou en cuisine.",
  },
  {
    id: "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3",
    slug: "mangoes",
    sku: "FG-FR-MAN",
    name_en: "Mangoes",
    name_fr: "Mangues",
    brand: "Fountain Group",
    tagline_en: "Fresh fruit",
    tagline_fr: "Fruit frais",
    short_description_en: "Fresh mangoes supplied by Fountain Group.",
    short_description_fr: "Mangues fraîches fournies par Fountain Group.",
    description_en:
      "Fountain Group mangoes for retail shelves and wholesale partners. Contact us for seasonal availability and packaging.",
    description_fr:
      "Mangues Fountain Group pour les rayons et partenaires gros. Contactez-nous pour la disponibilité saisonnière et le conditionnement.",
    category_id: "33333333-3333-3333-3333-333333333333",
    featured: false,
    active: true,
    wholesale_available: true,
    seo_title_en: "Mangoes | Fountain Group",
    seo_title_fr: "Mangues | Fountain Group",
    seo_description_en:
      "Order mangoes from Fountain Group — retail and bulk inquiry.",
    seo_description_fr:
      "Commandez des mangues Fountain Group — détail et gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Conditionnement confirmé à la commande.",
    storage_info_en: "Keep cool and handle gently to avoid bruising.",
    storage_info_fr:
      "Conserver au frais et manipuler avec soin pour éviter les chocs.",
    usage_info_en: "Enjoy fresh or in cooked dishes.",
    usage_info_fr: "À déguster frais ou en cuisine.",
  },
  {
    id: "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4",
    slug: "coconuts",
    sku: "FG-FR-COC",
    name_en: "Coconuts",
    name_fr: "Noix de coco",
    brand: "Fountain Group",
    tagline_en: "Fresh fruit",
    tagline_fr: "Fruit frais",
    short_description_en: "Fresh coconuts from Fountain Group.",
    short_description_fr: "Noix de coco fraîches Fountain Group.",
    description_en:
      "Whole coconuts supplied by Fountain Group for retail and wholesale partners. Contact us for availability and packaging.",
    description_fr:
      "Noix de coco entières fournies par Fountain Group pour les partenaires détail et gros. Contactez-nous pour la disponibilité et le conditionnement.",
    category_id: "33333333-3333-3333-3333-333333333333",
    featured: false,
    active: true,
    wholesale_available: true,
    seo_title_en: "Coconuts | Fountain Group",
    seo_title_fr: "Noix de coco | Fountain Group",
    seo_description_en:
      "Order coconuts from Fountain Group — retail and bulk inquiry.",
    seo_description_fr:
      "Commandez des noix de coco Fountain Group — détail et gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Conditionnement confirmé à la commande.",
    storage_info_en: "Store in a cool, dry place.",
    storage_info_fr: "Conserver dans un endroit frais et sec.",
    usage_info_en: "Enjoy fresh or in cooked dishes.",
    usage_info_fr: "À déguster frais ou en cuisine.",
  },
  {
    id: "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5",
    slug: "pineapples",
    sku: "FG-FR-PIN",
    name_en: "Pineapples",
    name_fr: "Ananas",
    brand: "Fountain Group",
    tagline_en: "Fresh fruit",
    tagline_fr: "Fruit frais",
    short_description_en: "Fresh pineapples from Fountain Group.",
    short_description_fr: "Ananas frais Fountain Group.",
    description_en:
      "Fountain Group pineapples for retail and wholesale partners. Contact us for seasonal availability and packaging.",
    description_fr:
      "Ananas Fountain Group pour les partenaires détail et gros. Contactez-nous pour la disponibilité saisonnière et le conditionnement.",
    category_id: "33333333-3333-3333-3333-333333333333",
    featured: false,
    active: true,
    wholesale_available: true,
    seo_title_en: "Pineapples | Fountain Group",
    seo_title_fr: "Ananas | Fountain Group",
    seo_description_en:
      "Order pineapples from Fountain Group — retail and bulk inquiry.",
    seo_description_fr:
      "Commandez des ananas Fountain Group — détail et gros.",
    packaging_info_en: "Packaging confirmed on order.",
    packaging_info_fr: "Conditionnement confirmé à la commande.",
    storage_info_en: "Keep cool and handle gently.",
    storage_info_fr: "Conserver au frais et manipuler avec soin.",
    usage_info_en: "Enjoy fresh or in cooked dishes.",
    usage_info_fr: "À déguster frais ou en cuisine.",
  },
];

const images = [
  ["a1111111-1111-1111-1111-111111111111", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "/products/coconut-oil.png", "Fountain Group Coconut Oil 1L glass bottle", "Huile de coco Fountain Group en bouteille en verre 1L", 0],
  ["b1111111-1111-1111-1111-111111111111", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil.png", "Mama's Red Oil 1L and 5L packaging", "Mama's Red Oil en formats 1L et 5L", 0],
  ["b1111111-1111-1111-1111-111111111112", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-1l.png", "Mama's Red Oil 1L bottle", "Mama's Red Oil bouteille 1L", 1],
  ["b1111111-1111-1111-1111-111111111113", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-5l.png", "Mama's Red Oil 5L jug", "Mama's Red Oil bidon 5L", 2],
  ["b1111111-1111-1111-1111-111111111114", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-pair.png", "Mama's Red Oil bottle pair", "Mama's Red Oil paire de bouteilles", 3],
  ["e1111111-1111-1111-1111-111111111111", "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee", "/products/avocado-oil.svg", "Fountain Group Avocado Oil", "Huile d’avocat Fountain Group", 0],
  ["f0111111-1111-1111-1111-111111111111", "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0", "/products/palm-kernel-oil.svg", "Fountain Group Palm Kernel Oil", "Huile de palmiste Fountain Group", 0],
  ["f1111111-1111-1111-1111-111111111111", "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1", "/products/refined-red-palm-oil.svg", "Fountain Group Refined Red Palm Oil", "Huile de palme rouge raffinée Fountain Group", 0],
  ["f2111111-1111-1111-1111-111111111111", "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2", "/products/avocados.svg", "Fountain Group Avocados", "Avocats Fountain Group", 0],
  ["f3111111-1111-1111-1111-111111111111", "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3", "/products/mangoes.svg", "Fountain Group Mangoes", "Mangues Fountain Group", 0],
  ["f4111111-1111-1111-1111-111111111111", "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4", "/products/coconuts.svg", "Fountain Group Coconuts", "Noix de coco Fountain Group", 0],
  ["f5111111-1111-1111-1111-111111111111", "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5", "/products/pineapples.svg", "Fountain Group Pineapples", "Ananas Fountain Group", 0],
];

const variants = [
  ["a2222222-2222-2222-2222-222222222222", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "FG-CO-1L", "1L", "bottle", 100, true],
  ["b2222222-2222-2222-2222-222222222221", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "FG-MRO-1L", "1L", "bottle", 100, true],
  ["b2222222-2222-2222-2222-222222222225", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "FG-MRO-5L", "5L", "container", 50, false],
  ["e2222222-2222-2222-2222-222222222222", "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee", "FG-AO-STD", "Standard", "bottle", 50, true],
  ["f0222222-2222-2222-2222-222222222222", "f0f0f0f0-f0f0-f0f0-f0f0-f0f0f0f0f0f0", "FG-PKO-STD", "Standard", "bottle", 50, true],
  ["f1222222-2222-2222-2222-222222222222", "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1", "FG-RRPO-STD", "Standard", "bottle", 50, true],
  ["f2222222-2222-2222-2222-222222222222", "f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2", "FG-FR-AVO-STD", "Standard", "crate", 40, true],
  ["f3222222-2222-2222-2222-222222222222", "f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3", "FG-FR-MAN-STD", "Standard", "crate", 40, true],
  ["f4222222-2222-2222-2222-222222222222", "f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f4f4", "FG-FR-COC-STD", "Standard", "crate", 40, true],
  ["f5222222-2222-2222-2222-222222222222", "f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5", "FG-FR-PIN-STD", "Standard", "crate", 40, true],
];

const removedProductIds = [
  "cccccccc-cccc-cccc-cccc-cccccccccccc",
  "dddddddd-dddd-dddd-dddd-dddddddddddd",
];

async function main() {
  const { error: catErr } = await admin.from("categories").upsert(categories);
  if (catErr) throw catErr;
  console.log("categories ok");

  // Remove obsolete palm/honey category rows that are no longer used
  await admin
    .from("categories")
    .delete()
    .eq("id", "22222222-2222-2222-2222-222222222222");

  // Deactivate removed honey + coconut flour products
  await admin
    .from("products")
    .update({ active: false, featured: false })
    .in("id", removedProductIds);

  const { error: prodErr } = await admin.from("products").upsert(products);
  if (prodErr) throw prodErr;
  console.log("products ok");

  const productIds = products.map((p) => p.id);
  await admin.from("product_images").delete().in("product_id", [
    ...productIds,
    ...removedProductIds,
  ]);
  const { error: imgErr } = await admin.from("product_images").insert(
    images.map(([id, product_id, url, alt_en, alt_fr, sort_order]) => ({
      id,
      product_id,
      url,
      alt_en,
      alt_fr,
      sort_order,
    })),
  );
  if (imgErr) throw imgErr;
  console.log("images ok");

  const { error: varErr } = await admin.from("product_variants").upsert(
    variants.map(([id, product_id, sku, size, unit, stock, is_default]) => ({
      id,
      product_id,
      sku,
      size,
      unit,
      price: null,
      compare_at_price: null,
      stock,
      is_default,
      active: true,
    })),
  );
  if (varErr) throw varErr;
  console.log("variants ok");

  const { data: settings } = await admin
    .from("site_settings")
    .select("value")
    .eq("key", "main")
    .maybeSingle();
  const value = {
    ...(settings?.value || {}),
    socialLinks: {
      ...((settings?.value && settings.value.socialLinks) || {}),
      instagram: "https://www.instagram.com/fountain.group",
      facebook: "https://www.facebook.com/",
    },
  };
  await admin.from("site_settings").upsert({
    key: "main",
    value,
    updated_at: new Date().toISOString(),
  });

  const { count } = await admin
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("active", true);
  console.log("Active products:", count);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
