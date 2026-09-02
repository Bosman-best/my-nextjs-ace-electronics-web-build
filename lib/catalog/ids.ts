// ACE Electronics — Identifier generation.
//
// Internal IDs are OPAQUE and permanent: they are never derived from the
// product name, the image filename or the slug, so renaming a product or
// re-slugging it can never break links, inquiries or admin references.

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'

function randomToken(length: number): string {
  let out = ''
  const g = globalThis as { crypto?: { getRandomValues?: (a: Uint8Array) => Uint8Array } }
  if (g.crypto?.getRandomValues) {
    const bytes = g.crypto.getRandomValues(new Uint8Array(length))
    for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length]
    return out
  }
  for (let i = 0; i < length; i++) out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  return out
}

/** Time-ordered, collision-resistant, opaque ID: `<prefix>_<base36 time><random>`. */
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${randomToken(8)}`
}

export const newProductId = () => generateId('prd')
export const newImageId = () => generateId('img')
export const newSpecificationId = () => generateId('spc')
export const newBadgeId = () => generateId('bdg')

/**
 * Build a URL-safe slug from arbitrary text. Slugs are CUSTOMER-FACING and
 * editable — they are never used as, or derived into, the internal ID.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\+/g, '-plus')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

/** Return a slug that is unique against `taken`, appending -2, -3, … as needed. */
export function uniqueSlug(base: string, taken: Iterable<string>): string {
  const used = new Set(taken)
  const root = slugify(base) || 'product'
  if (!used.has(root)) return root
  let n = 2
  while (used.has(`${root}-${n}`)) n++
  return `${root}-${n}`
}
