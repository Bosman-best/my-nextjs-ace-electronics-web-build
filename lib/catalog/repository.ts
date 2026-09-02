// ACE Electronics — PRODUCT REPOSITORY (the single source of truth).
//
// Every consumer of product data goes through this module: the homepage,
// category pages, search, filters, featured sections, product cards, product
// detail pages, related products, the sitemap — and, later, the admin panel.
// No page or component may define or hardcode product records of its own.
//
// Storage today is the in-memory catalog seeded from `seed-products.ts`.
// Swapping that for a database/CMS later means changing ONLY the loader below;
// every read/write API in this file, and therefore every caller, stays intact.
//
// Products are ARCHIVED (active: false), never deleted, so history, links and
// past inquiries always resolve.

import { newProductId, slugify, uniqueSlug } from './ids'
import { assertValidProduct, normalizeBadges, normalizeImages, normalizeProduct, normalizeSpecifications } from './normalize'
import { SEED_PRODUCTS } from './seed-products'
import type { Product, ProductDraft, ProductPatch } from './types'
import {
  CATEGORY_DEFINITIONS,
  type ProductAvailability,
  type ProductCategory,
  type ProductCondition,
  type ProductSubcategory,
} from './taxonomy'

/* ------------------------------------------------------------------ */
/* Store                                                               */
/* ------------------------------------------------------------------ */

/**
 * The catalog is held in one module-level map keyed by permanent product ID.
 * Mutations made by the future admin panel are immediately visible to every
 * reader, because there is only ever this one collection.
 */
const store = new Map<string, Product>()

function load() {
  if (store.size > 0) return
  for (const p of SEED_PRODUCTS) {
    assertValidProduct(p)
    if (store.has(p.id)) throw new Error(`Duplicate product id in seed data: ${p.id}`)
    store.set(p.id, p)
  }
  const slugs = new Set<string>()
  for (const p of store.values()) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate product slug in seed data: ${p.slug}`)
    slugs.add(p.slug)
  }
}
load()

/** Catalog order = the order products were added (createdAt, then id). */
function catalogOrder(a: Product, b: Product): number {
  if (a.createdAt !== b.createdAt) return a.createdAt < b.createdAt ? -1 : 1
  return a.id < b.id ? -1 : 1
}

function snapshot(): Product[] {
  return [...store.values()].sort(catalogOrder)
}

/* ------------------------------------------------------------------ */
/* Queries                                                             */
/* ------------------------------------------------------------------ */

export interface ProductQuery {
  category?: ProductCategory
  subcategory?: ProductSubcategory
  brand?: string
  condition?: ProductCondition
  availability?: ProductAvailability
  featured?: boolean
  /** Free-text search over name, brand, description, specs and badges. */
  search?: string
  /** Include archived products. Defaults to false (storefront behaviour). */
  includeArchived?: boolean
  sort?: ProductSort
  limit?: number
  /** Exclude these permanent product IDs (e.g. the product being viewed). */
  excludeIds?: string[]
}

export type ProductSort = 'catalog' | 'price-asc' | 'price-desc' | 'name' | 'newest'

/** Numeric price a customer would actually pay right now. */
export function effectivePrice(p: Product): number {
  return p.salePrice ?? p.price
}

/** Everything a free-text search should match, lowercased. */
export function searchIndex(p: Product): string {
  return [
    p.name,
    p.brand,
    p.description,
    ...p.specifications.map(s => `${s.label} ${s.value}`),
    ...p.badges.map(b => b.label),
    p.notes ?? '',
  ]
    .join(' ')
    .toLowerCase()
}

function sortProducts(list: Product[], sort: ProductSort): Product[] {
  const out = [...list]
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => effectivePrice(a) - effectivePrice(b))
    case 'price-desc':
      return out.sort((a, b) => effectivePrice(b) - effectivePrice(a))
    case 'name':
      return out.sort((a, b) => a.name.localeCompare(b.name))
    case 'newest':
      return out.sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0))
    default:
      return out.sort(catalogOrder)
  }
}

/** The one query function every listing, filter, search and section uses. */
export function queryProducts(q: ProductQuery = {}): Product[] {
  const term = q.search?.trim().toLowerCase() ?? ''
  const exclude = new Set(q.excludeIds ?? [])

  let list = snapshot().filter(p => {
    if (!q.includeArchived && !p.active) return false
    if (exclude.has(p.id)) return false
    if (q.category && p.category !== q.category) return false
    if (q.subcategory && p.subcategory !== q.subcategory) return false
    if (q.brand && p.brand.toLowerCase() !== q.brand.toLowerCase()) return false
    if (q.condition && p.condition !== q.condition) return false
    if (q.availability && p.availability !== q.availability) return false
    if (q.featured !== undefined && p.featured !== q.featured) return false
    if (term && !searchIndex(p).includes(term)) return false
    return true
  })

  list = sortProducts(list, q.sort ?? 'catalog')
  return q.limit !== undefined ? list.slice(0, q.limit) : list
}

/** All live (non-archived) products, in catalog order. */
export function getAllProducts(): Product[] {
  return queryProducts()
}

/** Includes archived records — for the admin panel and data tooling only. */
export function getAllProductsIncludingArchived(): Product[] {
  return queryProducts({ includeArchived: true })
}

export function getArchivedProducts(): Product[] {
  return snapshot().filter(p => !p.active)
}

/** Lookup by PERMANENT internal ID. Resolves archived records too. */
export function getProductById(id: string): Product | undefined {
  return store.get(id)
}

/** Lookup by customer-facing slug. Archived records are excluded by default. */
export function getProductBySlug(slug: string, opts: { includeArchived?: boolean } = {}): Product | undefined {
  const s = slugify(slug)
  return snapshot().find(p => p.slug === s && (opts.includeArchived || p.active))
}

/**
 * Resolve a product from a URL segment that may be either the permanent ID or
 * the current slug. Keeps old ID-based links working after a re-slug.
 */
export function resolveProduct(idOrSlug: string, opts: { includeArchived?: boolean } = {}): Product | undefined {
  const byId = store.get(idOrSlug)
  if (byId && (opts.includeArchived || byId.active)) return byId
  return getProductBySlug(idOrSlug, opts)
}

export function getFeaturedProducts(limit?: number): Product[] {
  return queryProducts({ featured: true, limit })
}

export function getProductsByCategory(category: ProductCategory, limit?: number): Product[] {
  return queryProducts({ category, limit })
}

/**
 * Related products: same subcategory first, then the rest of the category, then
 * the same brand. Always drawn from the same canonical collection.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const pool = queryProducts({ excludeIds: [product.id] })
  const score = (p: Product) => {
    let s = 0
    if (p.category === product.category) s += 4
    if (product.subcategory && p.subcategory === product.subcategory) s += 3
    if (p.brand === product.brand) s += 2
    return s
  }
  return pool
    .filter(p => score(p) > 0)
    .sort((a, b) => score(b) - score(a) || catalogOrder(a, b))
    .slice(0, limit)
}

/** Distinct brands present in the live catalog, optionally within a category. */
export function getBrands(category?: ProductCategory): string[] {
  const brands = new Set(queryProducts({ category }).map(p => p.brand))
  return [...brands].sort((a, b) => a.localeCompare(b))
}

/** Subcategories that actually have live products, for filter bars. */
export function getActiveSubcategories(category: ProductCategory): ProductSubcategory[] {
  const present = new Set(queryProducts({ category }).map(p => p.subcategory).filter(Boolean) as ProductSubcategory[])
  return CATEGORY_DEFINITIONS[category].subcategories.filter(s => present.has(s))
}

/** Live product count per category — used by homepage category cards. */
export function countByCategory(category: ProductCategory): number {
  return queryProducts({ category }).length
}

/* ------------------------------------------------------------------ */
/* Writes — the exact API the admin panel will call. No code changes    */
/* are required to create, edit, archive or restore a product.          */
/* ------------------------------------------------------------------ */

function takenSlugs(exceptId?: string): string[] {
  return snapshot().filter(p => p.id !== exceptId).map(p => p.slug)
}

export function createProduct(draft: ProductDraft): Product {
  const now = new Date().toISOString()
  const product = normalizeProduct(
    {
      ...draft,
      // Permanent ID is always generated here — never supplied, never derived
      // from the name, slug or an image filename.
      id: newProductId(),
      slug: uniqueSlug(draft.slug || draft.name, takenSlugs()),
      createdAt: now,
      updatedAt: now,
    },
    now,
  )
  assertValidProduct(product)
  store.set(product.id, product)
  return product
}

export function updateProduct(id: string, patch: ProductPatch): Product {
  const existing = store.get(id)
  if (!existing) throw new Error(`Product not found: ${id}`)
  const now = new Date().toISOString()

  const next: Product = {
    ...existing,
    ...patch,
    // Immutable fields.
    id: existing.id,
    createdAt: existing.createdAt,
    slug: patch.slug !== undefined ? uniqueSlug(patch.slug, takenSlugs(id)) : existing.slug,
    currency: patch.currency ?? existing.currency,
    active: patch.active ?? existing.active,
    images: patch.images ? normalizeImages(patch.images) : existing.images,
    specifications: patch.specifications ? normalizeSpecifications(patch.specifications) : existing.specifications,
    badges: patch.badges ? normalizeBadges(patch.badges) : existing.badges,
    updatedAt: now,
  }
  if (next.active) delete next.archivedAt
  else next.archivedAt = existing.archivedAt ?? now

  assertValidProduct(next)
  store.set(next.id, next)
  return next
}

/** Deactivate (archive) rather than delete. The record and its ID survive. */
export function archiveProduct(id: string): Product {
  return updateProduct(id, { active: false })
}

export function restoreProduct(id: string): Product {
  return updateProduct(id, { active: true })
}

export function setFeatured(id: string, featured: boolean): Product {
  return updateProduct(id, { featured })
}

export function setAvailability(id: string, availability: ProductAvailability): Product {
  return updateProduct(id, { availability })
}

export function setStockQuantity(id: string, stockQuantity: number): Product {
  return updateProduct(id, { stockQuantity })
}

/** Test/tooling helper: reset the in-memory catalog back to the seed data. */
export function __resetCatalog() {
  store.clear()
  load()
}
