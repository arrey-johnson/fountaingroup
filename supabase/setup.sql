-- Fountain Group schema
create extension if not exists "pgcrypto";

do $$ begin
  create type user_role as enum ('customer', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum (
    'pending', 'confirmed', 'processing', 'ready', 'shipped', 'delivered', 'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('unpaid', 'pending', 'paid', 'refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum (
    'manual', 'mobile_money', 'card', 'bank_transfer', 'cash_on_delivery'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type wholesale_status as enum (
    'new', 'reviewing', 'quotation_sent', 'negotiating', 'approved', 'rejected', 'converted'
  );
exception when duplicate_object then null; end $$;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text,
  full_name text,
  role user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_en text not null,
  name_fr text not null,
  description_en text,
  description_fr text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  sku text unique not null,
  name_en text not null,
  name_fr text not null,
  brand text not null default 'Fountain Group',
  tagline_en text,
  tagline_fr text,
  short_description_en text,
  short_description_fr text,
  description_en text,
  description_fr text,
  category_id uuid references categories(id),
  featured boolean not null default false,
  active boolean not null default true,
  wholesale_available boolean not null default true,
  seo_title_en text,
  seo_title_fr text,
  seo_description_en text,
  seo_description_fr text,
  packaging_info_en text,
  packaging_info_fr text,
  storage_info_en text,
  storage_info_fr text,
  usage_info_en text,
  usage_info_fr text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt_en text,
  alt_fr text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  sku text unique not null,
  size text not null,
  unit text not null default 'bottle',
  price numeric(12,2),
  compare_at_price numeric(12,2),
  stock int not null default 0,
  is_default boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  full_name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  line1 text not null,
  city text not null,
  region text not null,
  notes text,
  created_at timestamptz not null default now()
);

create sequence if not exists order_number_seq start 1;
create sequence if not exists rfq_number_seq start 1;

create or replace function next_ref_number(seq_name text)
returns bigint
language plpgsql
security definer
as $$
declare
  result bigint;
begin
  if seq_name = 'order_number_seq' then
    result := nextval('order_number_seq');
  elsif seq_name = 'rfq_number_seq' then
    result := nextval('rfq_number_seq');
  else
    raise exception 'Unknown sequence %', seq_name;
  end if;
  return result;
end;
$$;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_name text not null,
  phone text not null,
  whatsapp text,
  email text not null,
  address text not null,
  city text not null,
  region text not null,
  notes text,
  status order_status not null default 'pending',
  payment_status payment_status not null default 'unpaid',
  payment_method payment_method not null default 'manual',
  subtotal numeric(12,2),
  total numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  variant_id uuid references product_variants(id),
  product_name text not null,
  size text not null,
  unit_price numeric(12,2),
  quantity int not null check (quantity > 0)
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  provider text not null,
  method payment_method not null,
  status payment_status not null,
  amount numeric(12,2),
  reference text,
  created_at timestamptz not null default now()
);

create table if not exists wholesale_requests (
  id uuid primary key default gen_random_uuid(),
  rfq_number text unique not null,
  full_name text not null,
  company_name text not null,
  business_type text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  country text not null,
  city text not null,
  packaging text,
  quantity numeric,
  unit text,
  frequency text,
  delivery_date date,
  delivery_preference text,
  additional_requirements text,
  destination_port text,
  preferred_incoterm text,
  status wholesale_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists wholesale_request_items (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references wholesale_requests(id) on delete cascade,
  product_slug text,
  product_name text not null,
  packaging text,
  quantity numeric not null,
  unit text not null
);

create table if not exists distributor_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  country text not null,
  city text not null,
  phone text not null,
  email text not null,
  business_type text not null,
  distribution_network text,
  products_interested jsonb not null default '[]',
  estimated_monthly_requirement text,
  markets_served text,
  additional_info text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  subject text not null,
  message text not null,
  category text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  image_url text,
  active boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote_en text not null,
  quote_fr text not null,
  author text not null,
  role_en text not null,
  role_fr text not null,
  is_demo boolean not null default true,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_fr text not null,
  answer_en text not null,
  answer_fr text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table products enable row level security;
alter table categories enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;
alter table site_settings enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table certifications enable row level security;

drop policy if exists "Public read active products" on products;
create policy "Public read active products" on products
  for select using (active = true);

drop policy if exists "Public read categories" on categories;
create policy "Public read categories" on categories
  for select using (true);

drop policy if exists "Public read product images" on product_images;
create policy "Public read product images" on product_images
  for select using (true);

drop policy if exists "Public read active variants" on product_variants;
create policy "Public read active variants" on product_variants
  for select using (active = true);

drop policy if exists "Public read site settings" on site_settings;
create policy "Public read site settings" on site_settings
  for select using (true);

drop policy if exists "Public read testimonials" on testimonials;
create policy "Public read testimonials" on testimonials
  for select using (active = true);

drop policy if exists "Public read faqs" on faqs;
create policy "Public read faqs" on faqs
  for select using (true);

drop policy if exists "Public read certifications" on certifications;
create policy "Public read certifications" on certifications
  for select using (active = true);

grant usage on sequence order_number_seq to anon, authenticated, service_role;
grant usage on sequence rfq_number_seq to anon, authenticated, service_role;
grant execute on function next_ref_number(text) to anon, authenticated, service_role;
-- Seed Fountain Group demo/catalog data

insert into categories (id, slug, name_en, name_fr, description_en, description_fr)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'coconut-products',
    'Coconut Products',
    'Produits Ã  base de coco',
    'Pure coconut oil crafted for everyday cooking and care.',
    'Huile de coco pure pour la cuisine et le soin au quotidien.'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'palm-red-oil-products',
    'Palm / Red Oil Products',
    'Produits dâ€™huile de palme / rouge',
    'Mamaâ€™s Red Oil in retail and family packaging.',
    'Mamaâ€™s Red Oil en emballage dÃ©tail et familial.'
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
  'Huile de coco soigneusement produite pour les foyers, dÃ©taillants et entreprises alimentaires.',
  'Fountain Group Coconut Oil is produced with care for everyday cooking and shared tables. Presented in a 1L glass bottle, it reflects our focus on natural food products made for retail and commercial use.',
  'Lâ€™huile de coco Fountain Group est produite avec soin pour la cuisine du quotidien. PrÃ©sentÃ©e en bouteille en verre de 1L, elle reflÃ¨te notre engagement pour des produits alimentaires naturels destinÃ©s au dÃ©tail et au commerce.',
  '11111111-1111-1111-1111-111111111111',
  true, true, true,
  'Fountain Group Coconut Oil | Pure & Natural 1L',
  'Huile de Coco Fountain Group | Pure & Naturelle 1L',
  'Discover Fountain Group Coconut Oil â€” pure & natural coconut oil available for retail and bulk supply.',
  'DÃ©couvrez lâ€™huile de coco Fountain Group â€” pure et naturelle, disponible au dÃ©tail et en gros.',
  '1L glass bottle (as photographed).',
  'Bouteille en verre de 1L (selon photo produit).',
  'Store in a cool, dry place away from direct sunlight.',
  'Conserver dans un endroit frais et sec, Ã  lâ€™abri de la lumiÃ¨re directe.',
  'Suitable for cooking and food preparation.',
  'Convient Ã  la cuisine et Ã  la prÃ©paration des aliments.'
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
  'Huile rouge biologique et naturelle, disponible en formats dÃ©tail et familial.',
  'Mamaâ€™s Red Oil brings warm, natural flavour to the table. Available in packaging sizes shown in our product photography, including 1L and 5L containers for homes and higher-volume needs.',
  'Mamaâ€™s Red Oil apporte une saveur chaude et naturelle Ã  table. Disponible dans les formats photographiÃ©s, notamment 1L et 5L, pour les foyers et les besoins en volume.',
  '22222222-2222-2222-2222-222222222222',
  true, true, true,
  'Mama''s Red Oil | Organic & Natural | Fountain Group',
  'Mama''s Red Oil | Biologique & Naturelle | Fountain Group',
  'Shop Mamaâ€™s Red Oil from Fountain Group â€” organic & natural palm/red oil in 1L and 5L packaging.',
  'DÃ©couvrez Mamaâ€™s Red Oil de Fountain Group â€” huile rouge biologique et naturelle en formats 1L et 5L.',
  'Retail and family packaging including 1L and 5L containers (as photographed).',
  'Emballages dÃ©tail et familial, notamment 1L et 5L (selon photo produit).',
  'Store sealed in a cool, dry place.',
  'Conserver fermÃ© dans un endroit frais et sec.',
  'Ideal for traditional and everyday cooking.',
  'IdÃ©ale pour la cuisine traditionnelle et quotidienne.'
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
  'Mama''s Red Oil en emballage dÃ©tail et 5L',
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
    "logoUrl": "/brand/logo-horizontal.png",
    "email": "info@fountaingroupltd.com",
    "phone": "682428954",
    "whatsapp": "237682428954",
    "address": "Rue UTA Bonapriso",
    "city": "Douala",
    "country": "Cameroon",
    "businessHours": {
      "en": "",
      "fr": ""
    },
    "currencyCode": "XAF",
    "currencyDisplay": "FCFA",
    "socialLinks": {
      "facebook": "",
      "instagram": "https://www.instagram.com/fountain.group",
      "linkedin": ""
    },
    "deliveryInfo": {
      "en": "Delivery details will be confirmed when your order is processed.",
      "fr": "Les dÃ©tails de livraison seront confirmÃ©s lors du traitement de votre commande."
    },
    "promptstackUrl": "#"
  }'::jsonb
)
on conflict (key) do update set value = excluded.value, updated_at = now();

delete from testimonials;
insert into testimonials (quote_en, quote_fr, author, role_en, role_fr, is_demo, active, sort_order) values
(
  'Demo quote â€” replace with a verified customer statement when available.',
  'Citation dÃ©mo â€” Ã  remplacer par un tÃ©moignage client vÃ©rifiÃ©.',
  'Demo Retail Partner',
  'Placeholder role',
  'RÃ´le placeholder',
  true, true, 1
),
(
  'Demo quote â€” this content is seed data for layout only.',
  'Citation dÃ©mo â€” contenu de dÃ©monstration pour la mise en page uniquement.',
  'Demo Food Business',
  'Placeholder role',
  'RÃ´le placeholder',
  true, true, 2
);

delete from faqs;
insert into faqs (question_en, question_fr, answer_en, answer_fr, sort_order) values
(
  'How do I place an order?',
  'Comment passer une commande ?',
  'Browse the shop, add products to your cart, and complete checkout. You can also contact Fountain Group using the details in site settings once provided.',
  'Parcourez la boutique, ajoutez des produits au panier et finalisez le paiement. Vous pouvez aussi contacter Fountain Group via les coordonnÃ©es renseignÃ©es dans les paramÃ¨tres du site.',
  1
),
(
  'Can I buy Fountain Group products in bulk?',
  'Puis-je acheter les produits Fountain Group en gros ?',
  'Yes. Use the Wholesale page to submit a bulk quote request. Our team will respond based on quantity, packaging and destination.',
  'Oui. Utilisez la page Gros pour demander un devis. Notre Ã©quipe rÃ©pondra selon la quantitÃ©, lâ€™emballage et la destination.',
  2
),
(
  'What package sizes are available?',
  'Quels formats dâ€™emballage sont disponibles ?',
  'Coconut Oil is offered in 1L glass bottles. Mamaâ€™s Red Oil includes 1L and 5L options as shown in product photography.',
  'Lâ€™huile de coco est proposÃ©e en bouteille en verre 1L. Mamaâ€™s Red Oil comprend les formats 1L et 5L selon les photos produit.',
  3
),
(
  'How can I request wholesale pricing?',
  'Comment demander un tarif de gros ?',
  'Submit a request through the Wholesale RFQ form. Pricing depends on volume and packaging requirements.',
  'Soumettez une demande via le formulaire RFQ Gros. Les tarifs dÃ©pendent du volume et des emballages.',
  4
),
(
  'Where do you deliver?',
  'OÃ¹ livrez-vous ?',
  'Delivery coverage will be confirmed by Fountain Group. Until then, share your destination in checkout or your wholesale request.',
  'La zone de livraison sera confirmÃ©e par Fountain Group. En attendant, indiquez votre destination au checkout ou dans votre demande de gros.',
  5
),
(
  'How do I become a distributor?',
  'Comment devenir distributeur ?',
  'Complete the Become a Distributor form. This is separate from a one-time bulk order and helps Fountain Group review partnership opportunities.',
  'Remplissez le formulaire Devenir distributeur. Câ€™est distinct dâ€™une commande en volume et permet Ã  Fountain Group dâ€™Ã©tudier les opportunitÃ©s de partenariat.',
  6
);
