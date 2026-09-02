// ACE Electronics — Normalization & validation for canonical product records.
//
// Everything entering the catalog (seed data today, admin writes later) passes
// through here, so invariants hold no matter who wrote the record.

import { newBadgeId, newImageId, newProductId, newSpecificationId, slugify } from './ids'
import type { Product, ProductBadge, ProductDraft, ProductImage, ProductSpecification } from './types'
import {
  DEFAULT_CURRENCY,
  isProductAvailability,
  isProductCategory,
  isProductCondition,
  isProductSubcategory,
  CATEGORY_DEFINITIONS,
} from './taxonomy'

export class ProductValidationError extends Error {
  readonly issues: string[]
  constructor(issues: string[]) {
    super(`Invalid product record: ${issues.join('; ')}`)
    this.name = 'ProductValidationError'
    this.issues = issues
  }
}

function sortAndIndex<T extends { sortOrder: number }>(rows: T[]): T[] {
  return [...rows]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((r, i) => ({ ...r, sortOrder: i }))
}

/** Ensure exactly one primary image and contiguous sort orders. */
export function normalizeImages(input: Array<Partial<ProductImage>>): ProductImage[] {
  const images: ProductImage[] = input
    .filter(i => typeof i.url === 'string' && i.url.length > 0)
    .map((i, idx) => ({
      id: i.id || newImageId(),
      url: i.url as string,
      alt: i.alt?.trim() || '',
      sortOrder: typeof i.sortOrder === 'number' ? i.sortOrder : idx,
      isPrimary: Boolean(i.isPrimary),
      ...(i.aiGenerated !== undefined ? { aiGenerated: i.aiGenerated } : {}),
    }))

  const ordered = sortAndIndex(images)
  if (ordered.length === 0) return ordered
  const primaryIndex = ordered.findIndex(i => i.isPrimary)
  const chosen = primaryIndex >= 0 ? primaryIndex : 0
  return ordered.map((i, idx) => ({ ...i, isPrimary: idx === chosen }))
}

export function normalizeSpecifications(input: Array<Partial<ProductSpecification>>): ProductSpecification[] {
  const specs: ProductSpecification[] = input
    .filter(s => typeof s.label === 'string' && s.label.trim() !== '')
    .map((s, idx) => ({
      id: s.id || newSpecificationId(),
      label: (s.label as string).trim(),
      value: (s.value ?? '').toString().trim(),
      sortOrder: typeof s.sortOrder === 'number' ? s.sortOrder : idx,
    }))
  return sortAndIndex(specs)
}

export function normalizeBadges(input: Array<Partial<ProductBadge>>): ProductBadge[] {
  return input
    .filter(b => typeof b.label === 'string' && b.label.trim() !== '')
    .map(b => ({
      id: b.id || newBadgeId(),
      label: (b.label as string).trim(),
      tone: b.tone ?? 'neutral',
    }))
}

/** Collect validation issues without throwing. */
export function validateProduct(p: Product): string[] {
  const issues: string[] = []
  if (!p.id) issues.push('id is required')
  if (!p.slug || p.slug !== slugify(p.slug)) issues.push(`slug "${p.slug}" is not a valid URL slug`)
  if (!p.name?.trim()) issues.push('name is required')
  if (!p.brand?.trim()) issues.push('brand is required')
  if (!isProductCategory(p.category)) issues.push(`category "${p.category}" is not a controlled value`)
  if (p.subcategory !== undefined) {
    if (!isProductSubcategory(p.subcategory)) {
      issues.push(`subcategory "${p.subcategory}" is not a controlled value`)
    } else if (
      isProductCategory(p.category) &&
      !CATEGORY_DEFINITIONS[p.category].subcategories.includes(p.subcategory)
    ) {
      issues.push(`subcategory "${p.subcategory}" is not allowed in category "${p.category}"`)
    }
  }
  if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price < 0) {
    issues.push('price must be a non-negative number (never formatted currency text)')
  }
  if (p.salePrice !== undefined && (typeof p.salePrice !== 'number' || p.salePrice < 0)) {
    issues.push('salePrice must be a non-negative number when set')
  }
  if (p.currency !== 'GHS') issues.push(`currency "${p.currency}" is not supported`)
  if (p.condition !== undefined && !isProductCondition(p.condition)) {
    issues.push(`condition "${p.condition}" is not a controlled value`)
  }
  if (!isProductAvailability(p.availability)) {
    issues.push(`availability "${p.availability}" is not a controlled value`)
  }
  if (typeof p.stockQuantity !== 'number' || p.stockQuantity < 0) {
    issues.push('stockQuantity must be a non-negative number')
  }
  if (p.images.length > 0 && p.images.filter(i => i.isPrimary).length !== 1) {
    issues.push('exactly one image must be flagged primary')
  }
  const dupImage = findDuplicate(p.images.map(i => i.id))
  if (dupImage) issues.push(`duplicate image id "${dupImage}"`)
  const dupSpec = findDuplicate(p.specifications.map(s => s.id))
  if (dupSpec) issues.push(`duplicate specification id "${dupSpec}"`)
  if (!p.createdAt) issues.push('createdAt is required')
  if (!p.updatedAt) issues.push('updatedAt is required')
  return issues
}

function findDuplicate(values: string[]): string | undefined {
  const seen = new Set<string>()
  for (const v of values) {
    if (seen.has(v)) return v
    seen.add(v)
  }
  return undefined
}

export function assertValidProduct(p: Product): Product {
  const issues = validateProduct(p)
  if (issues.length) throw new ProductValidationError(issues)
  return p
}

/**
 * Turn a (possibly partial) draft into a fully-formed canonical Product.
 * Used by the seed loader and by every admin create/update path.
 */
export function normalizeProduct(
  draft: ProductDraft & { id?: string; createdAt?: string; updatedAt?: string },
  now: string = new Date().toISOString(),
): Product {
  const active = draft.active ?? true
  const product: Product = {
    id: draft.id || newProductId(),
    slug: slugify(draft.slug || draft.name || ''),
    name: draft.name.trim(),
    brand: draft.brand.trim(),
    category: draft.category,
    ...(draft.subcategory ? { subcategory: draft.subcategory } : {}),
    description: (draft.description ?? '').trim(),
    price: draft.price,
    ...(draft.salePrice !== undefined ? { salePrice: draft.salePrice } : {}),
    currency: draft.currency ?? DEFAULT_CURRENCY,
    ...(draft.condition ? { condition: draft.condition } : {}),
    availability: draft.availability,
    stockQuantity: draft.stockQuantity ?? 0,
    featured: draft.featured ?? false,
    active,
    ...(active ? {} : { archivedAt: draft.archivedAt ?? now }),
    images: normalizeImages(draft.images ?? []),
    specifications: normalizeSpecifications(draft.specifications ?? []),
    badges: normalizeBadges(draft.badges ?? []),
    ...(draft.warranty ? { warranty: draft.warranty } : {}),
    ...(draft.notes ? { notes: draft.notes } : {}),
    createdAt: draft.createdAt ?? now,
    updatedAt: draft.updatedAt ?? now,
  }
  return product
}
