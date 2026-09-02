// ACE Electronics — schema.org structured data derived from canonical records.
// Keeping this here guarantees SEO output can never drift from what the pages
// render, because both read the same product fields.

import { SITE_URL } from '@/lib/site'
import { getDisplayPrice, getPrimaryImageUrl, getProductPath, getSpecSummary } from './presentation'
import type { Product } from './types'
import { AVAILABILITY_SCHEMA_URL, CATEGORY_DEFINITIONS, CONDITION_SCHEMA_URL } from './taxonomy'

const SELLER = { '@type': 'Organization', name: 'ACE Electronics' }

export function productJsonLd(p: Product): Record<string, unknown> {
  const dp = getDisplayPrice(p)
  const image = getPrimaryImageUrl(p)
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description || getSpecSummary(p),
    // Permanent internal ID is the SKU — stable across renames and re-slugs.
    sku: p.id,
    productID: p.id,
    url: `${SITE_URL}${getProductPath(p)}`,
    category: CATEGORY_DEFINITIONS[p.category].label,
    ...(image ? { image: `${SITE_URL}${image}` } : {}),
    brand: { '@type': 'Brand', name: p.brand },
    ...(p.condition ? { itemCondition: CONDITION_SCHEMA_URL[p.condition] } : {}),
    additionalProperty: p.specifications.map(s => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value,
    })),
    ...(dp.show && dp.price !== undefined
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: p.currency,
            price: dp.price,
            availability: AVAILABILITY_SCHEMA_URL[p.availability],
            url: `${SITE_URL}${getProductPath(p)}`,
            seller: SELLER,
          },
        }
      : {}),
  }
}

export function itemListJsonLd(name: string, products: Product[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: productJsonLd(p),
    })),
  }
}

export function breadcrumbJsonLd(p: Product): Record<string, unknown> {
  const cat = CATEGORY_DEFINITIONS[p.category]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: cat.label, item: `${SITE_URL}${cat.href}` },
      { '@type': 'ListItem', position: 3, name: p.name, item: `${SITE_URL}${getProductPath(p)}` },
    ],
  }
}
