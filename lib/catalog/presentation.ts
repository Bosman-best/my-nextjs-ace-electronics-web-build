// ACE Electronics — Derived, display-only values.
//
// All formatting lives here so a product record only ever stores raw data
// (numeric price, controlled enums) and every surface renders it identically.

import { effectivePrice } from './repository'
import type { Product, ProductImage } from './types'
import {
  AVAILABILITY_LABELS,
  CATEGORY_DEFINITIONS,
  CONDITION_LABELS,
  PURCHASABLE_AVAILABILITIES,
  SUBCATEGORY_LABELS,
  type CurrencyCode,
} from './taxonomy'

/** Above this, price is withheld and the customer is asked on WhatsApp. */
export const PRICE_SHOW_THRESHOLD = 5000

export function formatMoney(amount: number, currency: CurrencyCode = 'GHS'): string {
  return `${currency} ${amount.toLocaleString('en-GH')}`
}

export interface DisplayPrice {
  show: boolean
  /** Numeric current price when shown. */
  price?: number
  /** Numeric struck-through original price when on sale. */
  wasPrice?: number
  /** Ready-to-render current price, e.g. 'GHS 3,800'. */
  formatted?: string
  formattedWas?: string
  /** Copy to use when the price is withheld. */
  fallbackLabel: string
}

export function getDisplayPrice(p: Product): DisplayPrice {
  const current = effectivePrice(p)
  const fallbackLabel = 'Ask on WhatsApp'
  if (current > PRICE_SHOW_THRESHOLD) return { show: false, fallbackLabel }
  const was = p.salePrice !== undefined && p.price > p.salePrice ? p.price : undefined
  return {
    show: true,
    price: current,
    wasPrice: was,
    formatted: formatMoney(current, p.currency),
    formattedWas: was !== undefined ? formatMoney(was, p.currency) : undefined,
    fallbackLabel,
  }
}

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* ------------------------------------------------------------------ */

/** Gallery images in sort order, primary first. */
export function getGalleryImages(p: Product): ProductImage[] {
  return [...p.images].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary) || a.sortOrder - b.sortOrder,
  )
}

export function getPrimaryImage(p: Product): ProductImage | undefined {
  return getGalleryImages(p)[0]
}

export function getPrimaryImageUrl(p: Product): string | undefined {
  return getPrimaryImage(p)?.url
}

/* ------------------------------------------------------------------ */
/* Specifications                                                      */
/* ------------------------------------------------------------------ */

export function getSpecifications(p: Product) {
  return [...p.specifications].sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * One-line spec summary for cards, meta titles and inquiry messages.
 * Derived from the data-driven specification rows — no dedicated column.
 */
export function getSpecSummary(p: Product, max = 4): string {
  return getSpecifications(p)
    .slice(0, max)
    .map(s => s.value)
    .join(', ')
}

/* ------------------------------------------------------------------ */
/* Labels                                                              */
/* ------------------------------------------------------------------ */

export function getCategoryDefinition(p: Product) {
  return CATEGORY_DEFINITIONS[p.category]
}
export function getCategoryLabel(p: Product): string {
  return CATEGORY_DEFINITIONS[p.category].label
}
export function getCategoryHref(p: Product): string {
  return CATEGORY_DEFINITIONS[p.category].href
}
export function getSubcategoryLabel(p: Product): string {
  return p.subcategory ? SUBCATEGORY_LABELS[p.subcategory] : ''
}
export function getConditionLabel(p: Product): string {
  return p.condition ? CONDITION_LABELS[p.condition] : ''
}
export function getAvailabilityLabel(p: Product): string {
  return AVAILABILITY_LABELS[p.availability]
}

/** Whether the storefront should present this product as orderable today. */
export function isPurchasable(p: Product): boolean {
  return p.active && PURCHASABLE_AVAILABILITIES.includes(p.availability)
}

/** Canonical storefront URL path for a product (slug-based, ID-stable). */
export function getProductPath(p: Product): string {
  return `/products/${p.slug}`
}
