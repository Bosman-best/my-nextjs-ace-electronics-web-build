// ACE Electronics — Supabase row shapes.
//
// These describe the database EXACTLY as it exists today. They are deliberately
// separate from the canonical `Product` model in `lib/catalog/types.ts`:
//
//   * `lib/catalog/types.ts` is what the application thinks a product is.
//   * This file is what the database currently stores.
//
// `lib/supabase/mappers.ts` translates between the two. Keeping them apart
// means the storefront never has to care about database column naming, and a
// schema change is absorbed in one place instead of rippling through the UI.

/** Row in `public.categories`. */
export interface CategoryRow {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string | null
}

/**
 * Row in `public.products`.
 *
 * Note `id` is a UUID here, whereas the canonical model uses permanent
 * `prd_…` IDs. See `mappers.ts` for how that is reconciled.
 */
export interface ProductRow {
  id: string
  name: string
  slug: string
  category_id: string | null
  description: string | null
  price: number | string | null
  compare_at_price: number | string | null
  stock_status: string | null
  featured: boolean | null
  /** JSONB. Shape is not enforced by the database; see `mappers.ts`. */
  specifications: unknown
  created_at: string | null
  updated_at: string | null
}

/** Row in `public.product_images`. */
export interface ProductImageRow {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  display_order: number | null
  is_primary: boolean | null
  created_at: string | null
}

/**
 * A product joined with its images and category, as returned by the select in
 * `lib/supabase/products.ts`. PostgREST nests embedded resources under the
 * related table's name.
 */
export interface ProductRowWithRelations extends ProductRow {
  product_images: ProductImageRow[] | null
  categories: CategoryRow | null
}

/** Table names, centralised so a rename is a one-line change. */
export const TABLES = {
  categories: 'categories',
  products: 'products',
  productImages: 'product_images',
} as const

/** Public storage bucket holding product imagery. */
export const PRODUCT_IMAGES_BUCKET = 'product-images'
