// ACE Electronics — Supabase row → canonical Product mapping.
//
// The database schema is currently a SUBSET of the canonical product model.
// This module is the single place where that difference is reconciled, so the
// storefront keeps consuming one consistent `Product` shape no matter where the
// data came from.
//
// ---------------------------------------------------------------------------
// KNOWN SCHEMA GAPS (see lib/supabase/README.md for the SQL to close them)
// ---------------------------------------------------------------------------
// Canonical field   | Supabase today        | How it is handled below
// ------------------|-----------------------|----------------------------------
// id (prd_…)        | id (uuid)             | UUID preserved verbatim as the
//                   |                       | permanent ID. Both are opaque, so
//                   |                       | inquiry refs and JSON-LD sku work.
// brand             | (missing)             | Inferred from the first word of
//                   |                       | the name; overridable via specs.
// category          | category_id → slug    | Resolved via the joined category,
//                   |                       | validated against the taxonomy.
// availability      | stock_status (text)   | Mapped through STOCK_STATUS_MAP.
// condition         | (missing)             | Read from specs if present, else
//                   |                       | left undefined.
// stockQuantity     | (missing)             | Derived from availability (1/0).
// salePrice         | compare_at_price      | compare_at_price is the "was"
//                   |                       | price, so the mapping inverts it.
// active/archivedAt | (missing)             | Always true — DB has no archive
//                   |                       | flag yet. THIS IS THE MOST
//                   |                       | IMPORTANT GAP: archival is a
//                   |                       | stated requirement.
// badges            | (missing)             | Empty array.
// warranty          | (missing)             | Falls back to STANDARD_WARRANTY.
// specifications    | JSONB (unordered)     | Accepts several JSON shapes and
//                   |                       | assigns deterministic sortOrder.
// images            | product_images table  | Direct, well-aligned mapping.

import {
  isProductAvailability,
  isProductCategory,
  isProductCondition,
  newBadgeId,
  newImageId,
  newSpecificationId,
  normalizeProduct,
  type Product,
  type ProductAvailability,
  type ProductCategory,
  type ProductCondition,
  type ProductImage,
  type ProductSpecification,
} from '@/lib/catalog'
import type { ProductRowWithRelations, ProductImageRow } from './types'

/** Warranty applied when the database has no per-product value. */
const STANDARD_WARRANTY = '1-month ACE seller warranty'

/** Category used when a product has no category or an unrecognised one. */
const FALLBACK_CATEGORY: ProductCategory = 'accessories'

/**
 * `stock_status` is free text in the database. Map every spelling we expect
 * onto the controlled vocabulary; anything unknown becomes 'out_of_stock' so an
 * unrecognised value can never imply a product is buyable.
 */
const STOCK_STATUS_MAP: Record<string, ProductAvailability> = {
  in_stock: 'in_stock',
  instock: 'in_stock',
  'in stock': 'in_stock',
  available: 'in_stock',
  out_of_stock: 'out_of_stock',
  outofstock: 'out_of_stock',
  'out of stock': 'out_of_stock',
  unavailable: 'out_of_stock',
  sold: 'out_of_stock',
  sold_out: 'out_of_stock',
  reserved: 'reserved',
  pending: 'reserved',
  coming_soon: 'coming_soon',
  'coming soon': 'coming_soon',
  preorder: 'coming_soon',
  pre_order: 'coming_soon',
}

export function mapStockStatus(value: string | null | undefined): ProductAvailability {
  if (!value) return 'out_of_stock'
  const key = value.trim().toLowerCase()
  if (STOCK_STATUS_MAP[key]) return STOCK_STATUS_MAP[key]
  if (isProductAvailability(key)) return key
  return 'out_of_stock'
}

/** Postgres `numeric` arrives as a string over the wire; coerce safely. */
export function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0
  const n = typeof value === 'number' ? value : Number.parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

/**
 * Normalise the JSONB `specifications` column into ordered spec rows.
 *
 * The column is unconstrained, so several shapes are tolerated:
 *   { "RAM": "16GB", "Storage": "512GB" }
 *   [ { "label": "RAM", "value": "16GB" }, … ]
 *   [ { "name":  "RAM", "value": "16GB" }, … ]
 *   [ { "key":   "RAM", "value": "16GB" }, … ]
 *
 * Object key order is preserved by V8 for string keys, giving stable output.
 */
export function mapSpecifications(input: unknown): ProductSpecification[] {
  if (!input) return []

  let parsed: unknown = input
  if (typeof input === 'string') {
    try {
      parsed = JSON.parse(input)
    } catch {
      return []
    }
  }

  const rows: Array<{ label: string; value: string }> = []

  if (Array.isArray(parsed)) {
    for (const entry of parsed) {
      if (!entry || typeof entry !== 'object') continue
      const e = entry as Record<string, unknown>
      const label = e.label ?? e.name ?? e.key ?? e.spec
      const value = e.value ?? e.val ?? e.detail
      if (label == null || value == null) continue
      rows.push({ label: String(label).trim(), value: String(value).trim() })
    }
  } else if (typeof parsed === 'object') {
    for (const [label, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (value == null || typeof value === 'object') continue
      rows.push({ label: label.trim(), value: String(value).trim() })
    }
  }

  return rows
    .filter(r => r.label && r.value)
    .map((r, i) => ({
      id: newSpecificationId(),
      label: r.label,
      value: r.value,
      sortOrder: i,
    }))
}

/** Look up a spec value by label, case-insensitively. */
function specValue(specs: ProductSpecification[], label: string): string | undefined {
  const want = label.toLowerCase()
  return specs.find(s => s.label.toLowerCase() === want)?.value
}

/**
 * Map `product_images` rows to canonical gallery images.
 *
 * Ordering and the primary flag are finalised by `normalizeImages` inside
 * `normalizeProduct`, which guarantees contiguous sortOrder and exactly one
 * primary image even if the database disagrees.
 */
export function mapImages(rows: ProductImageRow[] | null | undefined, productName: string): ProductImage[] {
  if (!rows || rows.length === 0) return []

  return [...rows]
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    .map((row, i) => ({
      id: row.id || newImageId(),
      url: row.image_url,
      alt: (row.alt_text ?? '').trim() || `${productName} — product photo`,
      sortOrder: row.display_order ?? i,
      isPrimary: Boolean(row.is_primary),
    }))
}

/**
 * Best-effort brand inference.
 *
 * The database has no `brand` column. A spec row wins if present; otherwise we
 * take the first token of the product name, which is correct for the way ACE
 * names stock ("HP EliteBook 840 G7", "Samsung Galaxy S21").
 */
function inferBrand(name: string, specs: ProductSpecification[]): string {
  const fromSpec = specValue(specs, 'brand') ?? specValue(specs, 'manufacturer')
  if (fromSpec) return fromSpec
  const first = name.trim().split(/\s+/)[0]
  return first || 'Unbranded'
}

/** Condition, if the database happens to carry it as a spec row. */
function inferCondition(specs: ProductSpecification[]): ProductCondition | undefined {
  const raw = specValue(specs, 'condition')
  if (!raw) return undefined
  const key = raw.trim().toLowerCase().replace(/[\s-]+/g, '_')
  if (isProductCondition(key)) return key
  if (key === 'openbox' || key === 'open_box') return 'open_box'
  if (key === 'preowned' || key === 'pre_owned' || key === 'second_hand') return 'used'
  return undefined
}

/**
 * Resolve the canonical category from the joined `categories` row.
 *
 * Matches on the category slug first, then its name, so either can drift
 * without breaking the mapping. Unknown values fall back rather than throw —
 * one miscategorised row must not break a whole page render.
 */
function resolveCategory(row: ProductRowWithRelations): ProductCategory {
  const candidates = [row.categories?.slug, row.categories?.name]
  for (const c of candidates) {
    if (!c) continue
    const key = c.trim().toLowerCase().replace(/[\s-]+/g, '_')
    if (isProductCategory(key)) return key
    // Tolerate singular/plural drift ("laptop" vs "laptops").
    const plural = key.endsWith('s') ? key : `${key}s`
    if (isProductCategory(plural)) return plural
  }
  return FALLBACK_CATEGORY
}

/**
 * Convert one Supabase row (with its joined images and category) into a fully
 * normalised canonical `Product`.
 *
 * Runs the result through `normalizeProduct` so database-sourced records are
 * held to exactly the same invariants as seed records — contiguous image sort
 * order, exactly one primary image, trimmed strings, generated IDs.
 */
export function mapProductRow(row: ProductRowWithRelations): Product {
  const specifications = mapSpecifications(row.specifications)
  const price = toNumber(row.price)
  const compareAt = toNumber(row.compare_at_price)
  const availability = mapStockStatus(row.stock_status)

  // `compare_at_price` is the higher "was" price. The canonical model instead
  // stores the ORIGINAL in `price` and the discounted figure in `salePrice`,
  // so when a genuine markdown exists the two values are swapped.
  const onSale = compareAt > 0 && compareAt > price
  const canonicalPrice = onSale ? compareAt : price
  const salePrice = onSale ? price : undefined

  return normalizeProduct({
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: inferBrand(row.name, specifications),
    category: resolveCategory(row),
    description: row.description ?? '',
    price: canonicalPrice,
    ...(salePrice !== undefined ? { salePrice } : {}),
    currency: 'GHS',
    ...(inferCondition(specifications) ? { condition: inferCondition(specifications) } : {}),
    availability,
    // No stock-quantity column yet: represent availability as a usable count so
    // "in stock" never renders as "0 left".
    stockQuantity: availability === 'in_stock' ? 1 : 0,
    featured: Boolean(row.featured),
    // No archive column yet, so everything the database returns is treated as
    // live. Closing this gap is the top priority before the admin panel ships.
    active: true,
    images: mapImages(row.product_images, row.name),
    specifications,
    badges: [],
    warranty: STANDARD_WARRANTY,
    ...(row.created_at ? { createdAt: row.created_at } : {}),
    ...(row.updated_at ? { updatedAt: row.updated_at } : {}),
  })
}

/** Map many rows, skipping any individual row that fails to convert. */
export function mapProductRows(rows: ProductRowWithRelations[]): Product[] {
  const out: Product[] = []
  for (const row of rows) {
    try {
      out.push(mapProductRow(row))
    } catch (err) {
      // One malformed row must never blank an entire category page.
      console.error(`[supabase] skipped product ${row?.id ?? '<unknown>'}:`, err)
    }
  }
  return out
}

/** Exported for the verification script's gap report. */
export const SCHEMA_GAPS = [
  'brand',
  'condition',
  'stockQuantity',
  'active / archivedAt',
  'badges',
  'warranty',
  'subcategory',
  'specifications.sortOrder',
] as const

// Referenced by the badge mapping once a badges table exists; keeps the import
// meaningful and the future shape obvious.
export { newBadgeId }
