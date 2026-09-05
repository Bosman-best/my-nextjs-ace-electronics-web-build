# Supabase integration

Connection layer between the ACE storefront and the Supabase backend.

**Status: connection layer only.** The storefront still renders from the seed
catalog (`lib/catalog/seed-products.ts`). Nothing in `app/` or `components/`
reads from Supabase yet. This was deliberate — see *Why the storefront hasn't
been cut over* below.

## Layout

| File | Purpose |
|---|---|
| `env.ts` | Reads `NEXT_PUBLIC_*` vars. No credential is hardcoded anywhere. |
| `client.ts` | Browser + server client factories (publishable key only). |
| `types.ts` | Row shapes matching the database **as it exists today**. |
| `mappers.ts` | Database row → canonical `Product`. All schema differences live here. |
| `products.ts` | Async reads mirroring `lib/catalog/repository.ts`, plus the connection check. |
| `index.ts` | Public barrel — import from `@/lib/supabase`. |

## Environment

```bash
cp .env.example .env.local
# then fill in NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable (anon) key. Browser-visible by design; access is still governed by RLS. |

`.env.local` is gitignored. **No service-role key is used anywhere in this
codebase.** `client.ts` decodes the key's JWT payload and refuses to construct a
client if it sees `role: service_role`, so one can't be exposed by accident.

## Verifying

```bash
npm run verify:supabase   # requires network + real credentials
```

Checks env vars, key type, reachability, per-table RLS reads, FK embedding,
mapping onto the canonical model, the storage bucket, and that anonymous writes
are rejected.

A runtime health endpoint is also available:

```bash
curl localhost:3000/api/health/supabase
```

Returns `200` when all three tables are readable, `503` otherwise. It reports
table names and row counts only — never credentials or row contents.

## Why the storefront hasn't been cut over

Every read in `lib/catalog/repository.ts` is **synchronous** (`getFeaturedProducts()`,
`queryProducts()`, `resolveProduct()`), and every consumer is a synchronous
component (`export default function Home()`). Supabase is asynchronous.

Making the repository async means converting every page and several client
components in one commit. Combined with the schema gaps below, that would have
risked the working storefront to no benefit at this stage. Instead the async
layer sits alongside the sync one, so the cutover can proceed page by page —
each consumer only needs `await` added, because `fetch*` returns the same
canonical `Product` shape the components already accept.

## Schema gaps

The database is currently a subset of the canonical product model. `mappers.ts`
bridges the difference with documented fallbacks — nothing is silently dropped.

| Canonical field | Database | Current handling |
|---|---|---|
| `id` | `id` (uuid) | UUID used as the permanent ID. Both are opaque, so inquiry refs and JSON-LD `sku` still work. |
| `brand` | *missing* | Inferred from the first word of `name`, or a `brand` spec row. |
| `category` | `category_id` → slug | Validated against the taxonomy; tolerates singular/plural drift. |
| `availability` | `stock_status` (text) | Mapped through `STOCK_STATUS_MAP`. Unknown values → `out_of_stock` (never implies buyable). |
| `condition` | *missing* | Read from a `condition` spec row if present. |
| `stockQuantity` | *missing* | Derived from availability (1 / 0). |
| `salePrice` | `compare_at_price` | Inverted: `compare_at_price` is the "was", so the two are swapped when a genuine markdown exists. |
| `active` / `archivedAt` | *missing* | **Always `true`.** See below. |
| `badges` | *missing* | Empty array. |
| `warranty` | *missing* | Falls back to `1-month ACE seller warranty`. |
| `subcategory` | *missing* | Undefined. |
| `specifications` | JSONB | Several shapes accepted; `sortOrder` assigned from position. |
| `images` | `product_images` | Direct mapping; sort order and primary flag re-normalised. |

### The archival gap matters most

Archive/restore is a stated requirement and the repository already implements
it, but there is **no column to persist it**. Every product read from Supabase
is treated as active, so archiving would be lost on the next read. This should
be closed before the admin panel is built.

Suggested migration (review before running):

```sql
alter table public.products
  add column if not exists brand           text,
  add column if not exists condition       text
    check (condition in ('new','used','refurbished','open_box')),
  add column if not exists stock_quantity  integer not null default 0,
  add column if not exists active          boolean not null default true,
  add column if not exists archived_at     timestamptz,
  add column if not exists warranty        text,
  add column if not exists subcategory     text,
  add column if not exists badges          jsonb   not null default '[]'::jsonb;

-- Constrain stock_status to the controlled vocabulary the app expects.
alter table public.products
  add constraint products_stock_status_check
  check (stock_status in ('in_stock','out_of_stock','reserved','coming_soon'));

-- Archived products must stay unreachable to anonymous readers.
-- Update the existing public select policy to include: active = true
```

After running it, update `types.ts`, `mappers.ts` and the gap table above
together.

## Rules

- Import Supabase access only from `@/lib/supabase`.
- This module may depend on `@/lib/catalog`; **never the reverse.** The catalog
  layer stays storage-agnostic — that is what lets the storefront run on seed
  data today and Supabase tomorrow without touching a component.
- Never disable RLS. Never add a public write policy.
- Read failures log and return empty rather than throwing, so an outage degrades
  a page instead of 500-ing it.
