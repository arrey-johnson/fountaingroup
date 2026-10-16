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
