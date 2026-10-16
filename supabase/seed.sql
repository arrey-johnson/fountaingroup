-- Seed Fountain Group demo/catalog data

insert into categories (id, slug, name_en, name_fr, description_en, description_fr)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'coconut-products',
    'Coconut Products',
    'Produits à base de coco',
    'Pure coconut oil crafted for everyday cooking and care.',
    'Huile de coco pure pour la cuisine et le soin au quotidien.'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'palm-red-oil-products',
    'Palm / Red Oil Products',
    'Produits d’huile de palme / rouge',
    'Mama’s Red Oil in retail and family packaging.',
    'Mama’s Red Oil en emballage détail et familial.'
  )
on conflict (id) do update set
  slug = excluded.slug,
  name_en = excluded.name_en,
  name_fr = excluded.name_fr;

insert into products (
  id, slug, sku, name_en, name_fr, brand, tagline_en, tagline_fr,
  short_description_en, short_description_fr, description_en, description_fr,
  category_id, featured, active, wholesale_available,
  seo_title_en, seo_title_fr, seo_description_en, seo_description_fr,
  packaging_info_en, packaging_info_fr, storage_info_en, storage_info_fr,
  usage_info_en, usage_info_fr
) values
(
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'coconut-oil',
  'FG-CO-001',
  'Fountain Group Coconut Oil',
  'Huile de Coco Fountain Group',
  'Fountain Group',
  'Pure & Natural',
  'Pure & Naturelle',
  'Carefully produced coconut oil for homes, retailers and food businesses.',
  'Huile de coco soigneusement produite pour les foyers, détaillants et entreprises alimentaires.',
  'Fountain Group Coconut Oil is produced with care for everyday cooking and shared tables. Presented in a 1L glass bottle, it reflects our focus on natural food products made for retail and commercial use.',
  'L’huile de coco Fountain Group est produite avec soin pour la cuisine du quotidien. Présentée en bouteille en verre de 1L, elle reflète notre engagement pour des produits alimentaires naturels destinés au détail et au commerce.',
  '11111111-1111-1111-1111-111111111111',
  true, true, true,
  'Fountain Group Coconut Oil | Pure & Natural 1L',
  'Huile de Coco Fountain Group | Pure & Naturelle 1L',
  'Discover Fountain Group Coconut Oil — pure & natural coconut oil available for retail and bulk supply.',
  'Découvrez l’huile de coco Fountain Group — pure et naturelle, disponible au détail et en gros.',
  '1L glass bottle (as photographed).',
  'Bouteille en verre de 1L (selon photo produit).',
  'Store in a cool, dry place away from direct sunlight.',
  'Conserver dans un endroit frais et sec, à l’abri de la lumière directe.',
  'Suitable for cooking and food preparation.',
  'Convient à la cuisine et à la préparation des aliments.'
),
(
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'mamas-red-oil',
  'FG-MRO-001',
  'Mama''s Red Oil',
  'Mama''s Red Oil',
  'Fountain Group',
  'Organic & Natural',
  'Biologique & Naturelle',
  'Organic & natural red oil available in retail and larger family packaging.',
  'Huile rouge biologique et naturelle, disponible en formats détail et familial.',
  'Mama’s Red Oil brings warm, natural flavour to the table. Available in packaging sizes shown in our product photography, including 1L and 5L containers for homes and higher-volume needs.',
  'Mama’s Red Oil apporte une saveur chaude et naturelle à table. Disponible dans les formats photographiés, notamment 1L et 5L, pour les foyers et les besoins en volume.',
  '22222222-2222-2222-2222-222222222222',
  true, true, true,
  'Mama''s Red Oil | Organic & Natural | Fountain Group',
  'Mama''s Red Oil | Biologique & Naturelle | Fountain Group',
  'Shop Mama’s Red Oil from Fountain Group — organic & natural palm/red oil in 1L and 5L packaging.',
  'Découvrez Mama’s Red Oil de Fountain Group — huile rouge biologique et naturelle en formats 1L et 5L.',
  'Retail and family packaging including 1L and 5L containers (as photographed).',
  'Emballages détail et familial, notamment 1L et 5L (selon photo produit).',
  'Store sealed in a cool, dry place.',
  'Conserver fermé dans un endroit frais et sec.',
  'Ideal for traditional and everyday cooking.',
  'Idéale pour la cuisine traditionnelle et quotidienne.'
)
on conflict (id) do update set
  name_en = excluded.name_en,
  name_fr = excluded.name_fr,
  featured = excluded.featured,
  active = excluded.active;

delete from product_images where product_id in (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
);

insert into product_images (id, product_id, url, alt_en, alt_fr, sort_order) values
(
  'a1111111-1111-1111-1111-111111111111',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '/products/coconut-oil.svg',
  'Fountain Group Coconut Oil 1L glass bottle',
  'Huile de coco Fountain Group en bouteille en verre 1L',
  0
),
(
  'b1111111-1111-1111-1111-111111111111',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '/products/mamas-red-oil.svg',
  'Mama''s Red Oil retail and 5L packaging',
  'Mama''s Red Oil en emballage détail et 5L',
  0
);

insert into product_variants (
  id, product_id, sku, size, unit, price, compare_at_price, stock, is_default, active
) values
(
  'a2222222-2222-2222-2222-222222222222',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'FG-CO-1L', '1L', 'bottle', null, null, 100, true, true
),
(
  'b2222222-2222-2222-2222-222222222221',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'FG-MRO-1L', '1L', 'bottle', null, null, 100, true, true
),
(
  'b2222222-2222-2222-2222-222222222225',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'FG-MRO-5L', '5L', 'container', null, null, 50, false, true
)
on conflict (sku) do update set
  size = excluded.size,
  stock = excluded.stock,
  is_default = excluded.is_default,
  active = excluded.active;

insert into site_settings (key, value) values (
  'main',
  '{
    "companyName": "Fountain Group",
    "logoUrl": "/brand/logo.jpg",
    "email": "info@fountaingroupltd.com",
    "phone": "682428954",
    "whatsapp": "237682428954",
    "address": "Rue UTA Bonapriso",
    "city": "Douala",
    "country": "Cameroon",
    "businessHours": {
      "en": "Monday – Friday: 8:00 – 17:00 (placeholder)",
      "fr": "Lundi – Vendredi : 8h00 – 17h00 (à confirmer)"
    },
    "currencyCode": "XAF",
    "currencyDisplay": "FCFA",
    "socialLinks": { "facebook": "", "instagram": "", "linkedin": "" },
    "deliveryInfo": {
      "en": "Delivery details will be confirmed when your order is processed.",
      "fr": "Les détails de livraison seront confirmés lors du traitement de votre commande."
    },
    "promptstackUrl": "#"
  }'::jsonb
)
on conflict (key) do update set value = excluded.value, updated_at = now();

delete from testimonials;
insert into testimonials (quote_en, quote_fr, author, role_en, role_fr, is_demo, active, sort_order) values
(
  'Demo quote — replace with a verified customer statement when available.',
  'Citation démo — à remplacer par un témoignage client vérifié.',
  'Demo Retail Partner',
  'Placeholder role',
  'Rôle placeholder',
  true, true, 1
),
(
  'Demo quote — this content is seed data for layout only.',
  'Citation démo — contenu de démonstration pour la mise en page uniquement.',
  'Demo Food Business',
  'Placeholder role',
  'Rôle placeholder',
  true, true, 2
);

delete from faqs;
insert into faqs (question_en, question_fr, answer_en, answer_fr, sort_order) values
(
  'How do I place an order?',
  'Comment passer une commande ?',
  'Browse the shop, add products to your cart, and complete checkout. You can also contact Fountain Group using the details in site settings once provided.',
  'Parcourez la boutique, ajoutez des produits au panier et finalisez le paiement. Vous pouvez aussi contacter Fountain Group via les coordonnées renseignées dans les paramètres du site.',
  1
),
(
  'Can I buy Fountain Group products in bulk?',
  'Puis-je acheter les produits Fountain Group en gros ?',
  'Yes. Use the Wholesale page to submit a bulk quote request. Our team will respond based on quantity, packaging and destination.',
  'Oui. Utilisez la page Gros pour demander un devis. Notre équipe répondra selon la quantité, l’emballage et la destination.',
  2
),
(
  'What package sizes are available?',
  'Quels formats d’emballage sont disponibles ?',
  'Coconut Oil is offered in 1L glass bottles. Mama’s Red Oil includes 1L and 5L options as shown in product photography.',
  'L’huile de coco est proposée en bouteille en verre 1L. Mama’s Red Oil comprend les formats 1L et 5L selon les photos produit.',
  3
),
(
  'How can I request wholesale pricing?',
  'Comment demander un tarif de gros ?',
  'Submit a request through the Wholesale RFQ form. Pricing depends on volume and packaging requirements.',
  'Soumettez une demande via le formulaire RFQ Gros. Les tarifs dépendent du volume et des emballages.',
  4
),
(
  'Where do you deliver?',
  'Où livrez-vous ?',
  'Delivery coverage will be confirmed by Fountain Group. Until then, share your destination in checkout or your wholesale request.',
  'La zone de livraison sera confirmée par Fountain Group. En attendant, indiquez votre destination au checkout ou dans votre demande de gros.',
  5
),
(
  'How do I become a distributor?',
  'Comment devenir distributeur ?',
  'Complete the Become a Distributor form. This is separate from a one-time bulk order and helps Fountain Group review partnership opportunities.',
  'Remplissez le formulaire Devenir distributeur. C’est distinct d’une commande en volume et permet à Fountain Group d’étudier les opportunités de partenariat.',
  6
);
