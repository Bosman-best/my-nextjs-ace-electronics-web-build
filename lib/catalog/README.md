# Product Data Architecture

**One canonical product source.** The storefront and the future admin panel read and write the *same* product records. Nothing in this app may define, duplicate or hardcode product objects of its own.

```
lib/catalog/
  taxonomy.ts         controlled values (category, subcategory, condition, availability, currency, badge tone)
  types.ts            the canonical Product record + image/spec/badge records
  ids.ts              permanent opaque ID generation + slug helpers
  normalize.ts        normalization & validation of every record entering the catalog
  seed-products.ts    the ONLY raw product data in the repo
  repository.ts       the single access layer — all reads and writes
  presentation.ts     derived display values (formatted price, gallery, labels)
  inquiry.ts          WhatsApp/product inquiry message + link builders
  structured-data.ts  schema.org JSON-LD derived from the same records
  index.ts            public API — import from '@/lib/catalog' only
```

## Rules

1. **Import product data only from `@/lib/catalog`.** Never from `seed-products.ts` directly.
2. **`id` is permanent and opaque.** Generated as `prd_<base36 time><random>`. It is never derived from the name, slug or an image filename, and never changes or gets re-used.
3. **`slug` is customer-facing and editable**, independent of `id`. Uniqueness is enforced by the repository (`uniqueSlug`), which appends `-2`, `-3`, … on collision.
4. **`price` is numeric only.** Formatting lives in `presentation.ts` (`getDisplayPrice`, `formatMoney`). Currency is the separate `currency` field (`GHS` today).
5. **Images are an array of records** (`id`, `url`, `alt`, `sortOrder`, `isPrimary`) — never `image1`/`image2`/`image3`. `normalizeImages` guarantees contiguous sort orders and exactly one primary.
6. **Specifications are data-driven rows** (`id`, `label`, `value`, `sortOrder`) — never a database column per possible laptop/phone/accessory attribute. Adding a spec to any product is pure data.
7. **Category, subcategory, condition and availability use controlled values only**, defined in `taxonomy.ts` and validated by `validateProduct`. Subcategories are constrained to their parent category.
8. **Products are archived, never deleted.** `active: false` + `archivedAt` hides a record from every storefront surface while preserving the record, its ID and its history. `restoreProduct` brings it back intact.

## Reading products

Everything goes through `queryProducts` (or a thin wrapper over it), so filters, search, sorting and archival behave identically everywhere:

```ts
import { queryProducts, getFeaturedProducts, getRelatedProducts, resolveProduct } from '@/lib/catalog'

queryProducts({ category: 'laptops', subcategory: 'business', search: 'ryzen', sort: 'price-asc' })
getFeaturedProducts()                       // homepage featured section
getRelatedProducts(product, 4)              // product detail page
resolveProduct(param)                       // accepts current slug OR permanent id
```

Archived products are excluded by default; pass `includeArchived: true` (admin only).

## Writing products (the admin panel API)

These already exist, so the admin UI needs **no schema or code changes** to manage the catalog:

```ts
createProduct(draft)                  // generates the permanent id, slug, image/spec/badge ids
updateProduct(id, patch)              // id and createdAt are immutable; updatedAt is bumped
archiveProduct(id) / restoreProduct(id)
setFeatured(id, bool) / setAvailability(id, value) / setStockQuantity(id, n)
```

Storage today is an in-memory map seeded from `seed-products.ts`. Moving to a database or CMS means changing **only** the loader in `repository.ts`; every function signature above — and therefore every caller — stays the same.

## Inquiries

`buildInquiryMessage` / `buildInquiryLink` always include the **permanent product ID** (`REF prd_…`) alongside the product's **current** name, specs, price, availability and URL, so a customer and ACE can always identify the exact product even after a rename, re-slug or price change.

## Verification

```bash
npm run verify:catalog
```

68 checks covering the structural invariants, single-record propagation across every surface (featured, listings, search, filters, cards, detail, related, sitemap, inquiries, structured data), archive/restore, and admin-style creation.
