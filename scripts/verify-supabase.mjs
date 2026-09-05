// ACE Electronics — Supabase connection verification.
//
//   npm run verify:supabase
//
// Confirms, against the real project:
//   1. environment variables are present and are NOT a service-role key
//   2. the project is reachable
//   3. each expected table is readable under RLS
//   4. the declared foreign-key relationships resolve via PostgREST embedding
//   5. rows map cleanly onto the canonical Product model
//   6. the product-images storage bucket is public and reachable
//   7. RLS actually blocks anonymous writes
//
// Exits non-zero on failure so it can gate CI.

import { readFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

/* ---------------------------------------------------------------- */
/* Env loading (.env.local, then real environment)                    */
/* ---------------------------------------------------------------- */

function loadEnvFile(path) {
  if (!existsSync(path)) return {}
  const out = {}
  for (const raw of readFileSync(path, 'utf8').split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    out[key] = value
  }
  return out
}

const fileEnv = { ...loadEnvFile('.env'), ...loadEnvFile('.env.local') }
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || fileEnv.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  fileEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  ''

/* ---------------------------------------------------------------- */
/* Reporting                                                          */
/* ---------------------------------------------------------------- */

const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
const YELLOW = '\x1b[33m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RESET = '\x1b[0m'

let passed = 0
let failed = 0
const warnings = []

function section(title) {
  console.log(`\n${BOLD}${title}${RESET}`)
}
function ok(msg, detail) {
  passed++
  console.log(`  ${GREEN}✓${RESET} ${msg}${detail ? ` ${DIM}${detail}${RESET}` : ''}`)
}
function fail(msg, detail) {
  failed++
  console.log(`  ${RED}✗${RESET} ${msg}${detail ? ` ${DIM}${detail}${RESET}` : ''}`)
}
function warn(msg) {
  warnings.push(msg)
  console.log(`  ${YELLOW}!${RESET} ${msg}`)
}

/* ---------------------------------------------------------------- */

console.log(`${BOLD}ACE Electronics — Supabase verification${RESET}`)

section('1. Environment')

if (!SUPABASE_URL) {
  fail('NEXT_PUBLIC_SUPABASE_URL is set')
} else {
  ok('NEXT_PUBLIC_SUPABASE_URL is set', SUPABASE_URL)
}

if (!SUPABASE_KEY) {
  fail('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is set')
} else {
  ok('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is set', `${SUPABASE_KEY.slice(0, 12)}…`)
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.log(
    `\n${RED}Cannot continue.${RESET} Copy .env.example to .env.local and fill in the values.\n`,
  )
  process.exit(1)
}

// Reject a service-role key outright — it bypasses RLS and must never sit in a
// NEXT_PUBLIC_* variable.
const parts = SUPABASE_KEY.split('.')
if (parts.length === 3) {
  try {
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'))
    if (payload.role === 'service_role') {
      fail('key is NOT a service-role key', 'SERVICE-ROLE KEY DETECTED — remove it immediately')
      console.log(
        `\n${RED}A service-role key bypasses Row Level Security. Never expose it client-side.${RESET}\n`,
      )
      process.exit(1)
    }
    ok('key is not a service-role key', `role=${payload.role}`)
  } catch {
    warn('could not decode key payload (may be a non-JWT publishable key)')
  }
} else {
  ok('key is not a service-role key', 'non-JWT publishable key format')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

/* ---------------------------------------------------------------- */

section('2. Connectivity')

try {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/`, {
    headers: { apikey: SUPABASE_KEY },
    signal: AbortSignal.timeout(15000),
  })
  if (res.ok || res.status === 404) {
    ok('project REST endpoint is reachable', `HTTP ${res.status}`)
  } else if (res.status === 401) {
    fail('project REST endpoint accepted the key', 'HTTP 401 — key rejected')
  } else {
    warn(`REST endpoint returned HTTP ${res.status}`)
  }
} catch (err) {
  fail('project REST endpoint is reachable', err.message)
  console.log(
    `\n${RED}Network error.${RESET} Check the URL, and whether this machine can reach *.supabase.co.\n`,
  )
  process.exit(1)
}

/* ---------------------------------------------------------------- */

section('3. Tables readable under RLS')

const counts = {}
for (const table of ['categories', 'products', 'product_images']) {
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
  if (error) {
    fail(`${table} is readable`, error.message)
  } else {
    counts[table] = count ?? 0
    ok(`${table} is readable`, `${count ?? 0} row(s)`)
  }
}

if (counts.products === 0) {
  warn('products table is empty — the storefront would render no products from Supabase')
}

/* ---------------------------------------------------------------- */

section('4. Relationships (PostgREST embedding)')

const { data: joined, error: joinError } = await supabase
  .from('products')
  .select('id, name, slug, category_id, categories ( id, name, slug ), product_images ( id, image_url, is_primary, display_order )')
  .limit(5)

if (joinError) {
  fail('products → categories / product_images embed', joinError.message)
  if (/relationship|schema cache/i.test(joinError.message)) {
    console.log(
      `    ${DIM}Hint: PostgREST needs real FOREIGN KEY constraints to embed.${RESET}`,
    )
  }
} else {
  ok('products → categories / product_images embed resolves', `${joined.length} row(s) sampled`)

  const withCategory = joined.filter(r => r.categories)
  if (joined.length && withCategory.length === 0) {
    warn('no sampled product resolved a category — category_id may be null')
  } else if (joined.length) {
    ok('category relation populated', `${withCategory.length}/${joined.length}`)
  }

  const withImages = joined.filter(r => (r.product_images ?? []).length > 0)
  if (joined.length && withImages.length === 0) {
    warn('no sampled product has images in product_images')
  } else if (joined.length) {
    ok('image relation populated', `${withImages.length}/${joined.length}`)
  }
}

/* ---------------------------------------------------------------- */

section('5. Canonical model mapping')

if (!joinError && joined.length > 0) {
  const { data: full, error: fullError } = await supabase
    .from('products')
    .select(
      'id, name, slug, category_id, description, price, compare_at_price, stock_status, featured, specifications, created_at, updated_at, product_images ( id, product_id, image_url, alt_text, display_order, is_primary, created_at ), categories ( id, name, slug, description, created_at )',
    )
    .limit(10)

  if (fullError) {
    fail('full product select succeeds', fullError.message)
  } else {
    ok('full product select succeeds', `${full.length} row(s)`)

    const required = ['id', 'name', 'slug', 'price', 'stock_status', 'featured']
    const missing = required.filter(c => full.length > 0 && !(c in full[0]))
    if (missing.length) fail('all expected columns present', `missing: ${missing.join(', ')}`)
    else ok('all expected columns present')

    // Slugs back the product URLs, so duplicates would make routes ambiguous.
    const slugs = full.map(r => r.slug).filter(Boolean)
    if (new Set(slugs).size !== slugs.length) fail('product slugs are unique in sample')
    else ok('product slugs are unique in sample')

    const badPrice = full.filter(r => r.price !== null && !Number.isFinite(Number(r.price)))
    if (badPrice.length) fail('prices are numeric', `${badPrice.length} non-numeric`)
    else ok('prices are numeric')

    const known = ['in_stock', 'out_of_stock', 'reserved', 'coming_soon']
    const unknownStatuses = [
      ...new Set(
        full
          .map(r => (r.stock_status ?? '').trim().toLowerCase())
          .filter(s => s && !known.includes(s)),
      ),
    ]
    if (unknownStatuses.length) {
      warn(`stock_status values outside the controlled vocabulary: ${unknownStatuses.join(', ')}`)
    } else if (full.length) {
      ok('stock_status values match the controlled vocabulary')
    }

    const multiPrimary = full.filter(
      r => (r.product_images ?? []).filter(i => i.is_primary).length > 1,
    )
    if (multiPrimary.length) {
      warn(`${multiPrimary.length} product(s) have more than one primary image (mapper will correct)`)
    } else if (full.length) {
      ok('at most one primary image per product')
    }
  }
} else {
  warn('skipped — no rows available to map')
}

/* ---------------------------------------------------------------- */

section('6. Storage bucket')

const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
if (bucketError) {
  // Anonymous listBuckets is often restricted; probe the bucket directly instead.
  warn(`could not list buckets (${bucketError.message}) — probing directly`)
  const { error: listError } = await supabase.storage.from('product-images').list('', { limit: 1 })
  if (listError) fail('product-images bucket is reachable', listError.message)
  else ok('product-images bucket is reachable')
} else {
  const bucket = buckets.find(b => b.name === 'product-images')
  if (!bucket) fail('product-images bucket exists', `found: ${buckets.map(b => b.name).join(', ') || 'none'}`)
  else {
    ok('product-images bucket exists')
    if (bucket.public) ok('bucket is public')
    else fail('bucket is public', 'images would not load on the storefront')
  }
}

/* ---------------------------------------------------------------- */

section('7. RLS write protection')

// Anonymous INSERT must be rejected. A success here means a public write policy
// is exposed and anyone could inject products.
const { error: insertError } = await supabase
  .from('products')
  .insert({ name: '__rls_probe__', slug: `__rls_probe_${Date.now()}__`, price: 0 })
  .select()

if (!insertError) {
  fail('anonymous INSERT into products is blocked', 'WRITE SUCCEEDED — RLS policy is unsafe')
  console.log(
    `\n${RED}A public write policy is exposed. Review the products table RLS policies.${RESET}`,
  )
} else {
  ok('anonymous INSERT into products is blocked', insertError.code || insertError.message.slice(0, 60))
}

/* ---------------------------------------------------------------- */

console.log(`\n${BOLD}Summary${RESET}`)
console.log(`  passed:   ${passed}`)
console.log(`  failed:   ${failed}`)
console.log(`  warnings: ${warnings.length}`)

if (counts.products !== undefined) {
  console.log(
    `\n${DIM}Rows — categories: ${counts.categories ?? '?'}, products: ${counts.products ?? '?'}, product_images: ${counts.product_images ?? '?'}${RESET}`,
  )
}

if (failed > 0) {
  console.log(`\n${RED}✗ Supabase verification FAILED (${failed} check(s)).${RESET}\n`)
  process.exit(1)
}

console.log(`\n${GREEN}✓ Supabase connection verified.${RESET}`)
if (warnings.length) {
  console.log(`${YELLOW}  ${warnings.length} warning(s) above are non-fatal but worth reviewing.${RESET}`)
}
console.log()
