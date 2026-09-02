/**
 * ACE Electronics — Storefront end-to-end verification.
 *
 *   node scripts/verify-storefront.mjs            (expects a server on :3000)
 *   BASE=http://localhost:3001 node scripts/verify-storefront.mjs
 *
 * Audits the customer-facing storefront: routes, navigation, SEO/metadata,
 * server-rendered content, product detail pages, search/filter/sort, WhatsApp
 * inquiries, galleries, empty/error states and the single-source guarantee.
 */
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs'

register('./scripts/ts-loader.mjs', pathToFileURL('./'))
const catalog = await import('@/lib/catalog')

const BASE = process.env.BASE || 'http://localhost:3000'

let failures = 0
let checks = 0
const fail = []
function check(label, cond, detail = '') {
  checks++
  if (cond) console.log(`  \u001b[32m✓\u001b[0m ${label}`)
  else { failures++; fail.push(label); console.log(`  \u001b[31m✗ ${label}\u001b[0m${detail ? ` — ${detail}` : ''}`) }
}
function section(t) { console.log(`\n\u001b[1m${t}\u001b[0m`) }

const cache = new Map()
async function get(path) {
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(BASE + path, { redirect: 'manual' })
  const body = res.status === 200 ? await res.text() : ''
  const out = { status: res.status, location: res.headers.get('location'), html: body }
  cache.set(path, out)
  return out
}
/** Server-rendered markup with RSC/script payloads stripped. */
const markup = html => html.replace(/<script[\s\S]*?<\/script>/g, '')

/* ------------------------------------------------------------------ */
section('1. Core routes respond')

const ROUTES = ['/', '/laptops', '/smartphones', '/gaming', '/accessories', '/about', '/contact',
  '/warranty', '/faqs', '/privacy', '/terms', '/sitemap.xml', '/robots.txt']
for (const r of ROUTES) {
  const { status } = await get(r)
  check(`${r} → 200`, status === 200, `got ${status}`)
}
check('unknown route returns 404', (await get('/definitely-not-a-page')).status === 404)
check('unknown product slug returns 404', (await get('/products/no-such-product')).status === 404)

/* ------------------------------------------------------------------ */
section('2. Every product has a working detail page')

const all = catalog.getAllProducts()
check(`catalog exposes products (${all.length})`, all.length > 0)

let detailOk = 0, detailBad = []
for (const p of all) {
  const { status, html } = await get(catalog.getProductPath(p))
  const m = markup(html)
  if (status === 200 && m.includes('<h1') && m.includes(escapeHtml(p.name))) detailOk++
  else detailBad.push(`${p.slug}(${status})`)
}
check(`all ${all.length} detail pages render their product name in server HTML`,
  detailBad.length === 0, detailBad.slice(0, 5).join(', '))

// Permanent-ID links keep working after a re-slug.
const sample = all[0]
const byId = await get(`/products/${sample.id}`)
check('permanent-ID URL redirects to the current slug',
  byId.status === 308 && byId.location?.endsWith(catalog.getProductPath(sample)),
  `${byId.status} ${byId.location}`)

/* ------------------------------------------------------------------ */
section('3. Listing pages are server-rendered from the catalog')

for (const [route, category] of [['/laptops', 'laptops'], ['/smartphones', 'smartphones']]) {
  const { html } = await get(route)
  const m = markup(html)
  const expected = catalog.queryProducts({ category }).length
  const cards = (m.match(/Quick Inquiry/g) || []).length
  check(`${route} renders all ${expected} cards server-side`, cards === expected, `found ${cards}`)
  check(`${route} has an <h1>`, m.includes('<h1'))
  check(`${route} exposes filter controls`, m.includes('Filter by type') || m.includes('role="group"'))
}

// Homepage must not be a client-only shell.
{
  const m = markup((await get('/')).html)
  const featured = catalog.getFeaturedProducts()
  check('homepage renders featured products server-side',
    featured.every(p => m.includes(escapeHtml(p.name))))
  check('homepage renders category + trust sections server-side',
    m.includes('Shop By Category') && m.includes('Featured Devices') && m.includes('Verified Suppliers'))
  check('homepage category counts come from the catalog',
    m.includes(`${catalog.countByCategory('laptops')} devices in stock`))
}

// Gaming page reflects the controlled subcategory.
{
  const m = markup((await get('/gaming')).html)
  const expected = catalog.queryProducts({ category: 'laptops', subcategory: 'gaming' }).length
    + catalog.queryProducts({ category: 'gaming' }).length
  const cards = (m.match(/Quick Inquiry/g) || []).length
  check(`/gaming shows the ${expected} gaming device(s) from the catalog`, cards === expected, `found ${cards}`)
}

/* ------------------------------------------------------------------ */
section('4. Search, filter and sort run through the repository')

check('search matches by model name',
  catalog.queryProducts({ search: 'elitebook' }).length > 0)
check('search matches by brand',
  catalog.queryProducts({ search: 'samsung' }).every(p => p.brand.toLowerCase() === 'samsung'))
check('search matches a specification value',
  catalog.queryProducts({ search: '16GB/256GB' }).length > 0)
check('search is case-insensitive',
  catalog.queryProducts({ search: 'PIXEL' }).length === catalog.queryProducts({ search: 'pixel' }).length)
check('nonsense search yields the empty state (0 results)',
  catalog.queryProducts({ search: 'zzzzq-not-a-product' }).length === 0)
check('subcategory filter is scoped to its category',
  catalog.queryProducts({ category: 'laptops', subcategory: 'business' }).every(p => p.subcategory === 'business'))
{
  const asc = catalog.queryProducts({ category: 'laptops', sort: 'price-asc' }).map(catalog.effectivePrice)
  const desc = catalog.queryProducts({ category: 'laptops', sort: 'price-desc' }).map(catalog.effectivePrice)
  check('price ascending sort is ordered', asc.every((v, i) => i === 0 || asc[i - 1] <= v))
  check('price descending sort is ordered', desc.every((v, i) => i === 0 || desc[i - 1] >= v))
  const names = catalog.queryProducts({ category: 'laptops', sort: 'name' }).map(p => p.name)
  check('name sort is alphabetical', names.every((v, i) => i === 0 || names[i - 1].localeCompare(v) <= 0))
}
check('archived products never appear in listings',
  catalog.queryProducts({}).every(p => p.active))

/* ------------------------------------------------------------------ */
section('5. Pricing is derived, never hardcoded')

check('every price is numeric', all.every(p => typeof p.price === 'number'))
check('prices at or under the threshold are shown', all
  .filter(p => catalog.effectivePrice(p) <= 5000)
  .every(p => catalog.getDisplayPrice(p).show))
check('prices over the threshold fall back to "Ask on WhatsApp"', all
  .filter(p => catalog.effectivePrice(p) > 5000)
  .every(p => !catalog.getDisplayPrice(p).show && p0(p)))
function p0(p) { return catalog.getDisplayPrice(p).fallbackLabel === 'Ask on WhatsApp' }
check('sale products expose a struck-through original price', all
  .filter(p => p.salePrice !== undefined && p.salePrice < p.price && catalog.getDisplayPrice(p).show)
  .every(p => catalog.getDisplayPrice(p).formattedWas))
check('formatted prices carry the GHS currency', all
  .filter(p => catalog.getDisplayPrice(p).show)
  .every(p => catalog.getDisplayPrice(p).formatted.startsWith('GHS ')))

/* ------------------------------------------------------------------ */
section('6. WhatsApp inquiry flow')

const WA = 'https://wa.me/233547981348'
for (const p of all.slice(0, 8)) {
  const link = catalog.buildInquiryLink(p)
  const msg = decodeURIComponent(link.split('text=')[1])
  if (!link.startsWith(WA) || !msg.includes(p.id) || !msg.includes(p.name)) {
    check(`inquiry for ${p.slug} is well-formed`, false, msg.slice(0, 80))
  }
}
check('inquiry links target the ACE WhatsApp number',
  all.every(p => catalog.buildInquiryLink(p).startsWith(WA)))
check('every inquiry quotes the permanent product ID',
  all.every(p => decodeURIComponent(catalog.buildInquiryLink(p).split('text=')[1]).includes(p.id)))
check('every inquiry quotes the current product name',
  all.every(p => decodeURIComponent(catalog.buildInquiryLink(p).split('text=')[1]).includes(p.name)))
check('every inquiry quotes availability',
  all.every(p => decodeURIComponent(catalog.buildInquiryLink(p).split('text=')[1]).includes('Availability:')))
check('every inquiry links back to the product page',
  all.every(p => decodeURIComponent(catalog.buildInquiryLink(p).split('text=')[1]).includes(catalog.getProductPath(p))))
check('inquiry text is URL-encoded (no raw newlines in the href)',
  all.every(p => !catalog.buildInquiryLink(p).includes('\n')))
check('detail pages expose a WhatsApp inquiry link',
  markup((await get(catalog.getProductPath(all[0]))).html).includes('wa.me/233547981348'))

/* ------------------------------------------------------------------ */
section('7. Product imagery')

let imgIssues = []
for (const p of all) {
  if (p.images.length === 0) { imgIssues.push(`${p.slug}: no images`); continue }
  for (const img of p.images) {
    const file = 'public' + img.url
    if (!fs.existsSync(file)) imgIssues.push(`${p.slug}: missing ${img.url}`)
    else if (fs.statSync(file).size < 1024) imgIssues.push(`${p.slug}: ${img.url} suspiciously small`)
    if (!img.alt || !img.alt.trim()) imgIssues.push(`${p.slug}: image ${img.id} has no alt text`)
  }
}
check('every product image file exists and has alt text', imgIssues.length === 0, imgIssues.slice(0, 5).join(' | '))
check('every product has exactly one primary image',
  all.every(p => p.images.filter(i => i.isPrimary).length === 1))
check('galleries are served through next/image',
  markup((await get(catalog.getProductPath(all[0]))).html).includes('/_next/image'))

/* ------------------------------------------------------------------ */
section('8. SEO & metadata')

const SEO = {
  '/': '/', '/laptops': '/laptops', '/smartphones': '/smartphones', '/gaming': '/gaming',
  '/accessories': '/accessories', '/about': '/about', '/contact': '/contact',
  '/warranty': '/warranty', '/faqs': '/faqs', '/privacy': '/privacy', '/terms': '/terms',
}
for (const [route, expectPath] of Object.entries(SEO)) {
  const { html } = await get(route)
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1] || ''
  const want = expectPath === '/' ? '' : expectPath
  check(`${route} has a self-referencing canonical`, canonical.endsWith(want) && (want !== '' || !canonical.match(/\/(laptops|about)/)), canonical)
}
for (const route of Object.keys(SEO)) {
  const { html } = await get(route)
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || ''
  const desc = html.match(/name="description" content="([^"]*)"/)?.[1] || ''
  check(`${route} has a unique, single-branded title`,
    title.length > 10 && (title.match(/ACE Electronics/g) || []).length === 1, title)
  check(`${route} has a meta description`, desc.length > 30)
}
{
  const m = (await get('/')).html
  check('homepage has one <h1>', (markup(m).match(/<h1/g) || []).length === 1)
}
for (const route of ['/about', '/laptops', '/faqs', '/contact']) {
  const m = markup((await get(route)).html)
  check(`${route} has exactly one <h1>`, (m.match(/<h1/g) || []).length === 1)
}
check('FAQ page emits FAQPage structured data', (await get('/faqs')).html.includes('"FAQPage"'))
check('listing pages emit ItemList structured data', (await get('/laptops')).html.includes('"ItemList"'))
check('detail pages emit Product + BreadcrumbList structured data', (() => {
  const h = cache.get(catalog.getProductPath(all[0])).html
  return h.includes('"Product"') && h.includes('"BreadcrumbList"')
})())
check('product structured data uses the permanent ID as sku',
  cache.get(catalog.getProductPath(all[0])).html.includes(`"sku":"${all[0].id}"`))
{
  const sm = (await get('/sitemap.xml')).html
  check(`sitemap lists all ${all.length} live products`,
    all.every(p => sm.includes(`/products/${p.slug}`)))
  check('sitemap excludes archived products',
    catalog.getArchivedProducts().every(p => !sm.includes(`/products/${p.slug}`)))
  const robots = (await get('/robots.txt')).html
  check('robots.txt sitemap matches the canonical domain',
    robots.includes('/sitemap.xml') && robots.includes(new URL(sm.match(/<loc>([^<]+)<\/loc>/)[1]).host))
}

/* ------------------------------------------------------------------ */
section('9. Navigation, footer & accessibility')

{
  const m = markup((await get('/')).html)
  for (const href of ['/laptops', '/smartphones', '/accessories', '/gaming', '/about', '/contact'])
    check(`header/footer links to ${href}`, m.includes(`href="${href}"`))
  for (const href of ['/warranty', '/faqs', '/privacy', '/terms'])
    check(`footer links to ${href}`, m.includes(`href="${href}"`))
  check('skip-to-content link present', m.includes('Skip to main content'))
  check('footer copyright year is current', m.includes(String(new Date().getFullYear())))
  check('viewport meta present', (await get('/')).html.includes('width=device-width'))
  check('html lang is set', (await get('/')).html.includes('<html lang="en"'))
}
for (const route of ['/', '/laptops', '/products/' + all[0].slug]) {
  const m = markup((await get(route)).html)
  check(`${route} has a <main id="main"> landmark`, m.includes('id="main"'))
}

/* ------------------------------------------------------------------ */
section('10. Single canonical product source')

{
  const files = []
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
    const p = `${d}/${e.name}`
    if (e.isDirectory()) walk(p)
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p)
  })
  walk('app'); walk('components')
  const offenders = files.filter(f => {
    const s = fs.readFileSync(f, 'utf8')
    return s.includes("from '@/lib/products'") || /const\s+(LAPTOPS|SMARTPHONES|ALL_PRODUCTS|PRODUCTS)\s*[:=]/.test(s)
  })
  check('no page or component defines its own product data', offenders.length === 0, offenders.join(', '))
  check('legacy lib/products.ts is gone', !fs.existsSync('lib/products.ts'))
  const seedImporters = files.filter(f => fs.readFileSync(f, 'utf8').includes('seed-products'))
  check('nothing imports the seed file directly', seedImporters.length === 0, seedImporters.join(', '))
}

/* ------------------------------------------------------------------ */
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;')
}

console.log(
  failures === 0
    ? `\n\u001b[32m✓ all ${checks} storefront checks passed\u001b[0m\n`
    : `\n\u001b[31m✗ ${failures} of ${checks} checks failed\u001b[0m\n   ${fail.join('\n   ')}\n`,
)
process.exit(failures === 0 ? 0 : 1)
