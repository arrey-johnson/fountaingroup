import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { pathToFileURL } from "url";

// Load seed via dynamic import of compiled-ish data by re-reading JSON-like from TS is hard;
// instead embed the sync payload here matching lib/demo/seed.ts UUIDs.

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
    slug: "coconut-products",
    name_en: "Coconut Products",
    name_fr: "Produits à base de coco",
    description_en: "Coconut oil and coconut flour for everyday cooking.",
    description_fr: "Huile de coco et farine de coco pour la cuisine du quotidien.",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    slug: "palm-red-oil-products",
    name_en: "Palm / Red Oil Products",
    name_fr: "Produits d’huile de palme / rouge",
    description_en: "Mama’s Red Oil in retail and family packaging.",
    description_fr: "Mama’s Red Oil en emballage détail et familial.",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    slug: "honey-products",
    name_en: "Honey Products",
    name_fr: "Produits à base de miel",
    description_en: "Pure honey from Fountain Group.",
    description_fr: "Miel pur Fountain Group.",
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
    tagline_en: "Pure & Natural",
    tagline_fr: "Pure & Naturelle",
    short_description_en:
      "Pure & natural coconut oil in a 1L glass bottle for everyday cooking.",
    short_description_fr:
      "Huile de coco pure et naturelle en bouteille en verre 1L pour la cuisine du quotidien.",
    description_en:
      "Fountain Group Coconut Oil is presented in a 1L glass bottle with our Pure & Natural positioning. Produced and packed for homes, retailers and food businesses.",
    description_fr:
      "L’huile de coco Fountain Group est présentée en bouteille en verre 1L, Pure & Naturelle. Produite et conditionnée pour les foyers, détaillants et entreprises alimentaires.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Fountain Group Coconut Oil | Pure & Natural 1L",
    seo_title_fr: "Huile de Coco Fountain Group | Pure & Naturelle 1L",
    seo_description_en:
      "Shop Fountain Group Coconut Oil — pure & natural 1L glass bottle for retail and bulk supply.",
    seo_description_fr:
      "Huile de coco Fountain Group — pure et naturelle, bouteille 1L, détail et gros.",
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
    tagline_en: "Organic & Natural",
    tagline_fr: "Biologique & Naturelle",
    short_description_en:
      "Organic & natural red oil available in 1L bottles and 5L family jugs.",
    short_description_fr:
      "Huile rouge biologique et naturelle, disponible en 1L et en bidon familial 5L.",
    description_en:
      "Mama’s Red Oil is Fountain Group’s organic & natural red oil for traditional and everyday cooking. Available in 1L retail bottles and 5L containers. Produced and distributed by Fountain Group Ltd, Limbe – Cameroon.",
    description_fr:
      "Mama’s Red Oil est l’huile rouge biologique et naturelle de Fountain Group pour la cuisine traditionnelle et quotidienne. Disponible en bouteilles 1L et bidons 5L. Produite et distribuée par Fountain Group Ltd, Limbé – Cameroun.",
    category_id: "22222222-2222-2222-2222-222222222222",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Mama's Red Oil | Organic & Natural | 1L & 5L",
    seo_title_fr: "Mama's Red Oil | Biologique & Naturelle | 1L & 5L",
    seo_description_en:
      "Shop Mama’s Red Oil from Fountain Group — organic & natural red oil in 1L and 5L packaging.",
    seo_description_fr:
      "Mama’s Red Oil Fountain Group — huile rouge biologique et naturelle en 1L et 5L.",
    packaging_info_en: "1L plastic bottle and 5L jug with handle.",
    packaging_info_fr: "Bouteille plastique 1L et bidon 5L avec poignée.",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Ideal for traditional and everyday cooking.",
    usage_info_fr: "Idéale pour la cuisine traditionnelle et quotidienne.",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    slug: "pure-honey",
    sku: "FG-HN-001",
    name_en: "Fountain Group Pure Honey",
    name_fr: "Miel Pur Fountain Group",
    brand: "Fountain Group",
    tagline_en: "Pure Honey",
    tagline_fr: "Miel Pur",
    short_description_en:
      "Pure honey marketed and distributed by Fountain Group Ltd.",
    short_description_fr:
      "Miel pur commercialisé et distribué par Fountain Group Ltd.",
    description_en:
      "Fountain Group Pure Honey is part of our organic-focused product range. Marketed and distributed by Fountain Group Ltd. Made in CEMAC. Bottled in Limbe by Fountain Group Ltd.",
    description_fr:
      "Le miel pur Fountain Group fait partie de notre gamme axée sur les produits naturels. Commercialisé et distribué par Fountain Group Ltd. Made in CEMAC. Mis en bouteille à Limbé par Fountain Group Ltd.",
    category_id: "33333333-3333-3333-3333-333333333333",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Fountain Group Pure Honey",
    seo_title_fr: "Miel Pur Fountain Group",
    seo_description_en:
      "Discover Fountain Group Pure Honey — available for retail and bulk inquiry.",
    seo_description_fr:
      "Découvrez le miel pur Fountain Group — disponible au détail et en demande de gros.",
    packaging_info_en: "Plastic jug with handle (as photographed).",
    packaging_info_fr: "Bidon plastique avec poignée (selon photo produit).",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en: "Enjoy as a natural sweetener in food and drinks.",
    usage_info_fr:
      "À utiliser comme édulcorant naturel dans les aliments et boissons.",
  },
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    slug: "organic-coconut-flour",
    sku: "FG-CF-001",
    name_en: "Organic Coconut Flour",
    name_fr: "Farine de Coco Biologique",
    brand: "Fountain Group",
    tagline_en: "From freshly harvested coconuts",
    tagline_fr: "À partir de noix de coco fraîchement récoltées",
    short_description_en:
      "Premium organic coconut flour from The Fountain Group.",
    short_description_fr:
      "Farine de coco biologique premium de The Fountain Group.",
    description_en:
      "Organic Coconut Flour from The Fountain Group — premium coconut flour made from freshly harvested coconuts, suited to baking and everyday cooking.",
    description_fr:
      "Farine de coco biologique The Fountain Group — farine de coco premium issue de noix de coco fraîchement récoltées, idéale pour la pâtisserie et la cuisine.",
    category_id: "11111111-1111-1111-1111-111111111111",
    featured: true,
    active: true,
    wholesale_available: true,
    seo_title_en: "Organic Coconut Flour | Fountain Group",
    seo_title_fr: "Farine de Coco Biologique | Fountain Group",
    seo_description_en:
      "Shop Organic Coconut Flour from Fountain Group — premium coconut flour for retail and bulk.",
    seo_description_fr:
      "Farine de coco biologique Fountain Group — farine premium pour le détail et le gros.",
    packaging_info_en: "Sealed flour bag (as photographed).",
    packaging_info_fr: "Sachet de farine scellé (selon photo produit).",
    storage_info_en: "Store sealed in a cool, dry place.",
    storage_info_fr: "Conserver fermé dans un endroit frais et sec.",
    usage_info_en:
      "Ideal for baking and cooking recipes that call for coconut flour.",
    usage_info_fr:
      "Idéale pour la pâtisserie et les recettes à base de farine de coco.",
  },
];

const images = [
  ["a1111111-1111-1111-1111-111111111111", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "/products/coconut-oil.png", "Fountain Group Coconut Oil 1L glass bottle", "Huile de coco Fountain Group en bouteille en verre 1L", 0],
  ["b1111111-1111-1111-1111-111111111111", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil.png", "Mama's Red Oil 1L and 5L packaging", "Mama's Red Oil en formats 1L et 5L", 0],
  ["b1111111-1111-1111-1111-111111111112", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-1l.png", "Mama's Red Oil 1L bottle", "Mama's Red Oil bouteille 1L", 1],
  ["b1111111-1111-1111-1111-111111111113", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-5l.png", "Mama's Red Oil 5L jug", "Mama's Red Oil bidon 5L", 2],
  ["b1111111-1111-1111-1111-111111111114", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "/products/mamas-red-oil-pair.png", "Mama's Red Oil bottle pair", "Mama's Red Oil paire de bouteilles", 3],
  ["c1111111-1111-1111-1111-111111111111", "cccccccc-cccc-cccc-cccc-cccccccccccc", "/products/pure-honey.png", "Fountain Group Pure Honey jug", "Bidon de miel pur Fountain Group", 0],
  ["d1111111-1111-1111-1111-111111111111", "dddddddd-dddd-dddd-dddd-dddddddddddd", "/products/organic-coconut-flour.png", "Fountain Group Organic Coconut Flour bag", "Sachet de farine de coco biologique Fountain Group", 0],
];

const variants = [
  ["a2222222-2222-2222-2222-222222222222", "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "FG-CO-1L", "1L", "bottle", 100, true],
  ["b2222222-2222-2222-2222-222222222221", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "FG-MRO-1L", "1L", "bottle", 100, true],
  ["b2222222-2222-2222-2222-222222222225", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb", "FG-MRO-5L", "5L", "container", 50, false],
  ["c2222222-2222-2222-2222-222222222222", "cccccccc-cccc-cccc-cccc-cccccccccccc", "FG-HN-JUG", "Jug", "container", 50, true],
  ["d2222222-2222-2222-2222-222222222222", "dddddddd-dddd-dddd-dddd-dddddddddddd", "FG-CF-BAG", "Bag", "bag", 80, true],
];

async function main() {
  const { error: catErr } = await admin.from("categories").upsert(categories);
  if (catErr) throw catErr;
  console.log("categories ok");

  const { error: prodErr } = await admin.from("products").upsert(products);
  if (prodErr) throw prodErr;
  console.log("products ok");

  // Replace images for these products
  const productIds = products.map((p) => p.id);
  await admin.from("product_images").delete().in("product_id", productIds);
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
      instagram: "https://www.instagram.com/fountaingroupltd",
      facebook: "https://www.facebook.com/",
    },
  };
  await admin.from("site_settings").upsert({
    key: "main",
    value,
    updated_at: new Date().toISOString(),
  });
  console.log("settings social ok");

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
