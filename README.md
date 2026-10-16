# Fountain Group

Premium bilingual (EN/FR) corporate + e-commerce + wholesale website for Fountain Group.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- next-intl (English / French)
- Zustand cart, Zod + React Hook Form patterns, Motion, Lucide, Sonner
- Demo data layer by default; Supabase schema ready under `supabase/migrations`

## Getting started

```bash
npm install --ignore-scripts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/en`).

## Environment

Copy `.env.example` to `.env.local` and fill Supabase values.

With Supabase URL + anon + service-role keys set, the app uses **Supabase**.
Without them, it falls back to **demo mode** (in-memory store).

### Apply database schema

1. Open [SQL Editor](https://supabase.com/dashboard/project/rlkzhnqizqussvkonljv/sql/new)
2. Paste and run [`supabase/setup.sql`](supabase/setup.sql) (schema + seed)
3. Verify with `npm run supabase:check`

Admin demo login:

- Password: value of `ADMIN_PASSWORD` (default in `.env.example`)
- URL: `/en/admin/login`

## Product photography

Place real package photos at:

- `public/products/coconut-oil.jpg`
- `public/products/mamas-red-oil.jpg`

Until then, SVG placeholders are used in seed data (`*.svg`). Update `lib/demo/seed.ts` image URLs when swapping to JPG.

## Key routes

| Route | Purpose |
|-------|---------|
| `/en`, `/fr` | Homepage |
| `/shop` | Catalog |
| `/products/[slug]` | Product detail |
| `/cart`, `/checkout` | Retail checkout |
| `/wholesale` | B2B RFQ |
| `/become-a-distributor` | Distributor applications |
| `/admin` | Secure dashboard |

## Notes

- Prices default to `null` → “Contact for Price” / Request Quote
- Currency display defaults to FCFA (configurable in admin settings)
- No invented certifications or company facts — placeholders only
