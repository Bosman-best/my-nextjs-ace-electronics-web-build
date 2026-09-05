// ACE Electronics — Supabase-backed product reads.
//
// These mirror the synchronous read API in `lib/catalog/repository.ts`, but
// async. They are NOT yet wired into the storefront: the storefront still
// renders from the seed catalog, and this module exists so the connection can
// be proven and the cutover can happen page by page.
//
// Every function returns canonical `Product` records, so a consumer switching
// from `getFeaturedProducts()` to `fetchFeaturedProducts()` only has to add an
// `await` — no component or presentation code changes.
//
// Failure policy: read errors are logged and surface as empty results rather
// than thrown, so a Supabase outage degrades the page instead of 500-ing it.
// Callers that need to distinguish "empty" from "broken" use the `*Result`
// variants, which return an explicit error field.

import type { Product, ProductCategory } from '@/lib/catalog'
import { getSupabaseServerClient, tryGetSupabaseServerClient } from './client'
import { mapProductRow, mapProductRows } from './mappers'
import { TABLES, type ProductRowWithRelations } from './types'

/**
 * Columns fetched for a product, including its images and category.
 *
 * PostgREST resolves the embedded resources through the declared foreign keys
 * (product_images.product_id → products.id, products.category_id →
 * categories.id), so this is a single round trip rather than an N+1.
 */
const PRODUCT_SELECT = `
  id,
  name,
  slug,
  category_id,
  description,
  price,
  compare_at_price,
  stock_status,
  featured,
  specifications,
  created_at,
  updated_at,
  product_images (
    id,
    product_id,
    image_url,
    alt_text,
    display_order,
    is_primary,
    created_at
  ),
  categories (
    id,
    name,
    slug,
    description,
    created_at
  )
`

export interface FetchResult<T> {
  data: T
  error: string | null
}

function logError(context: string, error: unknown): string {
  const message =
    error && typeof error === 'object' && 'message' in error
      ? String((error as { message: unknown }).message)
      : String(error)
  console.error(`[supabase] ${context}: ${message}`)
  return message
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

/** All products, newest first. */
export async function fetchAllProductsResult(): Promise<FetchResult<Product[]>> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return { data: [], error: 'Supabase is not configured.' }

  const { data, error } = await supabase
    .from(TABLES.products)
    .select(PRODUCT_SELECT)
    .order('created_at', { ascending: false })

  if (error) return { data: [], error: logError('fetchAllProducts', error) }
  return { data: mapProductRows((data ?? []) as unknown as ProductRowWithRelations[]), error: null }
}

export async function fetchAllProducts(): Promise<Product[]> {
  return (await fetchAllProductsResult()).data
}

/** Products in one canonical category, resolved via the categories table. */
export async function fetchProductsByCategory(
  category: ProductCategory,
  limit?: number,
): Promise<Product[]> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return []

  // Filter on the embedded category's slug so the caller can keep using the
  // canonical category name rather than a database UUID.
  let query = supabase
    .from(TABLES.products)
    .select(PRODUCT_SELECT)
    .eq('categories.slug', category)
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    logError(`fetchProductsByCategory(${category})`, error)
    return []
  }

  // `.eq` on an embedded resource nulls the relation instead of dropping the
  // row, so discard products whose category didn't actually match.
  const rows = ((data ?? []) as unknown as ProductRowWithRelations[]).filter(r => r.categories)
  return mapProductRows(rows)
}

/** Featured products for the homepage. */
export async function fetchFeaturedProducts(limit?: number): Promise<Product[]> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return []

  let query = supabase
    .from(TABLES.products)
    .select(PRODUCT_SELECT)
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) {
    logError('fetchFeaturedProducts', error)
    return []
  }
  return mapProductRows((data ?? []) as unknown as ProductRowWithRelations[])
}

/** One product by slug, or undefined. */
export async function fetchProductBySlug(slug: string): Promise<Product | undefined> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return undefined

  const { data, error } = await supabase
    .from(TABLES.products)
    .select(PRODUCT_SELECT)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    logError(`fetchProductBySlug(${slug})`, error)
    return undefined
  }
  if (!data) return undefined
  return mapProductRow(data as unknown as ProductRowWithRelations)
}

/** One product by permanent ID (UUID), or undefined. */
export async function fetchProductById(id: string): Promise<Product | undefined> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return undefined

  const { data, error } = await supabase
    .from(TABLES.products)
    .select(PRODUCT_SELECT)
    .eq('id', id)
    .maybeSingle()

  if (error) {
    logError(`fetchProductById(${id})`, error)
    return undefined
  }
  if (!data) return undefined
  return mapProductRow(data as unknown as ProductRowWithRelations)
}

/**
 * Resolve by permanent ID or slug — the async twin of `resolveProduct`, used by
 * the ID→slug redirect once product routes read from Supabase.
 */
export async function fetchResolvedProduct(idOrSlug: string): Promise<Product | undefined> {
  // UUIDs are the ID form in this schema; anything else can only be a slug.
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug)
  if (isUuid) {
    const byId = await fetchProductById(idOrSlug)
    if (byId) return byId
  }
  return fetchProductBySlug(idOrSlug)
}

/** All categories as stored in the database. */
export async function fetchCategories(): Promise<Array<{ id: string; name: string; slug: string }>> {
  const supabase = tryGetSupabaseServerClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from(TABLES.categories)
    .select('id, name, slug')
    .order('name', { ascending: true })

  if (error) {
    logError('fetchCategories', error)
    return []
  }
  return data ?? []
}

/* ------------------------------------------------------------------ */
/* Connectivity                                                        */
/* ------------------------------------------------------------------ */

export interface ConnectionCheck {
  ok: boolean
  configured: boolean
  url: string | null
  tables: Record<string, { ok: boolean; count: number | null; error: string | null }>
  error: string | null
  checkedAt: string
}

/**
 * Verify the app can reach Supabase and read each expected table under RLS.
 *
 * Uses HEAD + exact count so it transfers no row data — cheap enough to call
 * from a health endpoint.
 */
export async function checkSupabaseConnection(): Promise<ConnectionCheck> {
  const checkedAt = new Date().toISOString()
  const tables: ConnectionCheck['tables'] = {}

  let supabase
  try {
    supabase = getSupabaseServerClient()
  } catch (err) {
    return {
      ok: false,
      configured: false,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
      tables,
      error: err instanceof Error ? err.message : String(err),
      checkedAt,
    }
  }

  for (const table of [TABLES.categories, TABLES.products, TABLES.productImages]) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    tables[table] = {
      ok: !error,
      count: count ?? null,
      error: error ? error.message : null,
    }
  }

  const ok = Object.values(tables).every(t => t.ok)
  return {
    ok,
    configured: true,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    tables,
    error: ok ? null : 'One or more tables could not be read. Check RLS select policies.',
    checkedAt,
  }
}
