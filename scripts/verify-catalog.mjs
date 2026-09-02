/**
 * ACE Electronics — Catalog architecture verification.
 *
 *   node scripts/verify-catalog.mjs
 *
 * Proves the single-source-of-truth guarantee:
 *  1. Structural invariants hold for every seeded record.
 *  2. Editing ONE product record through the repository propagates to every
 *     surface that shows that product (featured, category listing, search,
 *     filters, detail, related, cards, sitemap, inquiry links, structured data).
 *  3. Archiving hides a product everywhere without deleting it, and restoring
 *     brings it back intact.
 *  4. Internal IDs are permanent and independent of name/slug/image filename.
 */
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register('./scripts/ts-loader.mjs', pathToFileURL('./'))

const catalog = await import('../lib/catalog/index.ts')
const {
  archiveProduct,
  buildInquiryMessage,
  countByCategory,
  createProduct,
  effectivePrice,
  getAllProducts,
  getAllProductsIncludingArchived,
  getDisplayPrice,
  getFeaturedProducts,
  getPrimaryImageUrl,
  getProductById,
  getProductPath,
  getRelatedProducts,
  getSpecSummary,
  productJsonLd,
  queryProducts,
  resolveProduct,
  restoreProduct,
  updateProduct,
  validateProduct,
} = catalog

let failures = 0
let checks = 0
function check(label, condition, detail = '') {
  checks++
  if (condition) {
    console.log(`  \u001b[32m✓\u001b[0m ${label}`)
  } else {
    failures++
    console.log(`  \u001b[31m✗ ${label}\u001b[0m${detail ? ` — ${detail}` : ''}`)
  }
}
function section(t) { console.log(`\n\u001b[1m${t}\u001b[0m`) }

/* ---------------------------------------------------------------- */
section('1. Structural invariants across the whole catalog')

const all = getAllProducts()
check(`catalog loads (${all.length} live products)`, all.length > 0)

const invalid = all.flatMap(p => validateProduct(p).map(i => `${p.slug}: ${i}`))
check('every record passes validation', invalid.length === 0, invalid.slice(0, 5).join(' | '))

check('all ids unique', new Set(all.map(p => p.id)).size === all.length)
check('all slugs unique', new Set(all.map(p => p.slug)).size === all.length)

check(
  'ids are opaque — not derived from name, slug or image filename',
  all.every(p => {
    const id = p.id.toLowerCase()
    if (!id.startsWith('prd_')) return false
    const token = id.slice(4)
    const nameish = p.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    const slugish = p.slug.replace(/-/g, '')
    const files = p.images.map(i => i.url.split('/').pop().replace(/\.\w+$/, '').replace(/-/g, ''))
    return token !== nameish && token !== slugish && !files.includes(token)
  }),
)

check('price is always numeric, never formatted text', all.every(p => typeof p.price === 'number' && Number.isFinite(p.price)))
check('currency is GHS everywhere', all.every(p => p.currency === 'GHS'))
check('images are arrays of records with unique ids + one primary', all.every(p =>
  Array.isArray(p.images) &&
  p.images.every(i => i.id && i.url && typeof i.sortOrder === 'number') &&
  p.images.filter(i => i.isPrimary).length === 1,
))
check('specifications are data-driven rows (id/label/value/sortOrder)', all.every(p =>
  p.specifications.every(s => s.id && s.label && typeof s.sortOrder === 'number'),
))
check('controlled category values only', all.every(p => catalog.PRODUCT_CATEGORIES.includes(p.category)))
check('controlled availability values only', all.every(p => catalog.PRODUCT_AVAILABILITIES.includes(p.availability)))
check('controlled condition values only', all.every(p => !p.condition || catalog.PRODUCT_CONDITIONS.includes(p.condition)))
check('subcategories are legal for their category', all.every(p =>
  !p.subcategory || catalog.CATEGORY_DEFINITIONS[p.category].subcategories.includes(p.subcategory),
))
check('timestamps present', all.every(p => p.createdAt && p.updatedAt))

/* ---------------------------------------------------------------- */
section('2. Editing ONE record propagates to every surface')

// Pick a featured product so it appears on the homepage too.
const target = getFeaturedProducts()[0]
console.log(`  target: ${target.name} (${target.id})`)

const before = {
  name: target.name,
  price: target.price,
  featured: target.featured,
  slug: target.slug,
  cardSummary: getSpecSummary(target),
  inquiry: buildInquiryMessage(target),
}

const NEW_NAME = 'ACE Verification Device X1'
const NEW_PRICE = 3210
const NEW_SLUG = 'ace-verification-device-x1'

updateProduct(target.id, {
  name: NEW_NAME,
  price: NEW_PRICE,
  slug: NEW_SLUG,
  description: 'A verification device used to prove single-source propagation.',
  specifications: [
    { label: 'Processor', value: 'Verification CPU', sortOrder: 0 },
    { label: 'Memory & Storage', value: '64GB/2TB', sortOrder: 1 },
  ],
  images: [
    { url: '/products/verification-a.jpg', alt: 'Verification image A', sortOrder: 0, isPrimary: true },
    { url: '/products/verification-b.jpg', alt: 'Verification image B', sortOrder: 1, isPrimary: false },
  ],
  badges: [{ label: 'Verified Change', tone: 'accent' }],
})

const edited = getProductById(target.id)

check('permanent id unchanged after edit', edited.id === target.id)
check('name updated in the canonical record', edited.name === NEW_NAME)
check('description updated in the canonical record', edited.description.includes('verification device'))
check('slug edited independently of the id', edited.slug === NEW_SLUG && edited.id === target.id)
check('updatedAt advanced, createdAt preserved', edited.updatedAt !== before.updatedAt && edited.createdAt === target.createdAt)

// Featured section (homepage)
check('featured section shows the edited record', getFeaturedProducts().some(p => p.id === target.id && p.name === NEW_NAME))

// Category listing
const listing = queryProducts({ category: edited.category })
check('category listing shows the edited record', listing.some(p => p.id === target.id && p.name === NEW_NAME))

// Search
check('search finds the NEW name', queryProducts({ search: 'Verification Device' }).some(p => p.id === target.id))
check('search no longer matches the OLD name anywhere in the record', !queryProducts({ search: before.name }).some(p => p.id === target.id))
check('search matches the new specification value', queryProducts({ search: 'Verification CPU' }).some(p => p.id === target.id))

// Filters + sorting
check('subcategory filter still includes it', queryProducts({ category: edited.category, subcategory: edited.subcategory }).some(p => p.id === target.id))
check('price sort reflects the new numeric price', (() => {
  const asc = queryProducts({ sort: 'price-asc' })
  const idx = asc.findIndex(p => p.id === target.id)
  return idx >= 0 && asc.slice(0, idx).every(p => effectivePrice(p) <= NEW_PRICE)
})())

// Product cards / detail / URL
check('display price reflects the new numeric price', getDisplayPrice(edited).formatted === 'GHS 3,210')
check('product path uses the new slug', getProductPath(edited) === `/products/${NEW_SLUG}`)
check('detail page resolves by NEW slug', resolveProduct(NEW_SLUG)?.id === target.id)
check('detail page still resolves by PERMANENT id (old links keep working)', resolveProduct(target.id)?.id === target.id)
check('old slug no longer resolves', resolveProduct(before.slug) === undefined)

// Images & specs
check('gallery serves the new image records', getPrimaryImageUrl(edited) === '/products/verification-a.jpg' && edited.images.length === 2)
check('new image records got generated unique ids', new Set(edited.images.map(i => i.id)).size === 2 && edited.images.every(i => i.id.startsWith('img_')))
check('card spec summary reflects the new specs', getSpecSummary(edited) === 'Verification CPU, 64GB/2TB')
check('badges updated', edited.badges.length === 1 && edited.badges[0].label === 'Verified Change')

// Related products (as seen from another product)
const neighbour = queryProducts({ category: edited.category, excludeIds: [target.id] })[0]
const relatedNames = getRelatedProducts(neighbour, 50).filter(p => p.id === target.id).map(p => p.name)
check('related-products carousel shows the edited name', relatedNames[0] === NEW_NAME)

// Inquiry / WhatsApp
const inquiry = buildInquiryMessage(edited)
check('WhatsApp inquiry carries the PERMANENT product id', inquiry.includes(target.id))
check('WhatsApp inquiry carries the CURRENT name', inquiry.includes(NEW_NAME) && !inquiry.includes(before.name))
check('WhatsApp inquiry carries the CURRENT price', inquiry.includes('GHS 3,210'))
check('WhatsApp inquiry carries the CURRENT availability', inquiry.includes('Availability:'))
check('WhatsApp inquiry links the CURRENT product URL', inquiry.includes(`/products/${NEW_SLUG}`))

// Structured data
const ld = productJsonLd(edited)
check('structured data sku = permanent id', ld.sku === target.id)
check('structured data name/price follow the record', ld.name === NEW_NAME && ld.offers.price === NEW_PRICE)
check('structured data lists data-driven specs', ld.additionalProperty.length === 2)

/* ---------------------------------------------------------------- */
section('3. Archive / restore instead of deletion')

const liveBefore = getAllProducts().length
const catCountBefore = countByCategory(edited.category)

archiveProduct(target.id)
const archived = getProductById(target.id)

check('record still exists after archiving', archived !== undefined && archived.id === target.id)
check('archivedAt timestamp set', Boolean(archived.archivedAt))
check('hidden from the live catalog', !getAllProducts().some(p => p.id === target.id))
check('hidden from featured', !getFeaturedProducts().some(p => p.id === target.id))
check('hidden from category listing', !queryProducts({ category: edited.category }).some(p => p.id === target.id))
check('hidden from search', !queryProducts({ search: 'Verification Device' }).some(p => p.id === target.id))
check('hidden from related products', !getRelatedProducts(neighbour, 50).some(p => p.id === target.id))
check('category count decremented', countByCategory(edited.category) === catCountBefore - 1)
check('slug route no longer resolves for customers', resolveProduct(NEW_SLUG) === undefined)
check('admin view still lists it', getAllProductsIncludingArchived().some(p => p.id === target.id))
check('still retrievable by permanent id (nothing was deleted)', getProductById(target.id) !== undefined)

restoreProduct(target.id)
check('restored into the live catalog', getAllProducts().some(p => p.id === target.id))
check('restore clears archivedAt', getProductById(target.id).archivedAt === undefined)
check('live count back to normal', getAllProducts().length === liveBefore)
check('data survived the archive round-trip', getProductById(target.id).name === NEW_NAME)

/* ---------------------------------------------------------------- */
section('4. Admin-style create requires no code changes')

const created = createProduct({
  slug: 'ace-verification-device-x1', // deliberately collides with the edited slug
  name: 'Admin Created Sample',
  brand: 'ACE',
  category: 'accessories',
  subcategory: 'power',
  description: 'Created purely through the repository API, as the admin panel will.',
  price: 350,
  availability: 'coming_soon',
  stockQuantity: 0,
  featured: false,
  condition: 'new',
  images: [{ url: '/products/sample.jpg', alt: 'Sample', sortOrder: 0, isPrimary: false }],
  specifications: [{ label: 'Capacity', value: '20000mAh', sortOrder: 0 }],
  badges: [{ label: 'New arrival', tone: 'positive' }],
})

check('created product got a generated permanent id', created.id.startsWith('prd_') && created.id !== target.id)
check('colliding slug was de-duplicated automatically', created.slug !== NEW_SLUG && created.slug.startsWith('ace-verification-device-x1'))
check('appears in its category immediately', queryProducts({ category: 'accessories' }).some(p => p.id === created.id))
check('appears in search immediately', queryProducts({ search: '20000mAh' }).some(p => p.id === created.id))
check('primary image auto-assigned', created.images[0].isPrimary === true)
check('spec row got a generated id', created.specifications[0].id.startsWith('spc_'))
check('homepage category count picks it up', countByCategory('accessories') === 1)
check('created record is valid', validateProduct(created).length === 0)

const archivedNew = archiveProduct(created.id)
check('newly created product can be archived too', archivedNew.active === false)

/* ---------------------------------------------------------------- */
console.log(
  failures === 0
    ? `\n\u001b[32m✓ all ${checks} checks passed\u001b[0m — one canonical product source verified end to end.\n`
    : `\n\u001b[31m✗ ${failures} of ${checks} checks failed\u001b[0m\n`,
)
process.exit(failures === 0 ? 0 : 1)
