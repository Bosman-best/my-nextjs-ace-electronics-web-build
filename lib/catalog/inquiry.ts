// ACE Electronics — Product inquiry / WhatsApp message builder.
//
// Every product inquiry quotes the PERMANENT product ID plus the product's
// CURRENT information, so ACE and the customer are provably talking about the
// same record even after a rename, re-slug, price change or image swap.

import { WHATSAPP_LINK } from '@/lib/utils'
import { SITE_URL } from '@/lib/site'
import {
  getAvailabilityLabel,
  getConditionLabel,
  getDisplayPrice,
  getProductPath,
  getSpecSummary,
} from './presentation'
import type { Product } from './types'

/** Product title for messages — avoids repeating a brand already in the name. */
export function getInquiryTitle(p: Product): string {
  return p.name.toLowerCase().startsWith(p.brand.toLowerCase()) ? p.name : `${p.brand} ${p.name}`
}

/** A short, human-quotable reference derived from the permanent internal ID. */
export function getProductReference(p: Product): string {
  return `REF ${p.id}`
}

/**
 * The canonical inquiry message for a product. Includes:
 *  - the permanent product ID (survives renames/re-slugs),
 *  - the current name, brand and spec summary,
 *  - the current price (or the ask-on-WhatsApp fallback),
 *  - the current availability,
 *  - the live product page link.
 */
export function buildInquiryMessage(p: Product): string {
  const dp = getDisplayPrice(p)
  const specs = getSpecSummary(p)
  const condition = getConditionLabel(p)

  const lines = [
    `Hi ACE, I'm interested in this product:`,
    ``,
    getInquiryTitle(p),
    specs ? `Specs: ${specs}` : '',
    condition ? `Condition: ${condition}` : '',
    `Price: ${dp.show && dp.formatted ? dp.formatted : 'to be confirmed'}`,
    `Availability: ${getAvailabilityLabel(p)}`,
    `${getProductReference(p)}`,
    `${SITE_URL}${getProductPath(p)}`,
    ``,
    `Is it available, and what's the best price?`,
  ]
  return lines.filter(l => l !== '').join('\n')
}

/** wa.me link carrying the canonical inquiry message. */
export function buildInquiryLink(p: Product): string {
  return WHATSAPP_LINK(buildInquiryMessage(p))
}

/** Compact single-line variant for tight UI (e.g. card quick inquiry tooltips). */
export function buildShortInquiryMessage(p: Product): string {
  const specs = getSpecSummary(p, 3)
  return `Hi ACE, I'm interested in the ${getInquiryTitle(p)}${specs ? ` (${specs})` : ''} — ${getProductReference(p)}. Is it in stock?`
}

/** Generic, non-product inquiry (category pages, empty search states). */
export function buildGeneralInquiryLink(message: string): string {
  return WHATSAPP_LINK(message)
}
