// ACE Electronics — Supabase integration public API.
//
// Import Supabase access ONLY from '@/lib/supabase', mirroring the convention
// that product data is imported only from '@/lib/catalog'.
//
// NOTE ON LAYERING: this module depends on '@/lib/catalog' (for the canonical
// Product type and normalisation), never the reverse. The catalog layer stays
// storage-agnostic, which is what allows the storefront to run on seed data
// today and Supabase tomorrow without touching a single component.

export {
  SUPABASE_URL,
  isSupabaseConfigured,
  supabaseConfigError,
  looksLikeServiceRoleKey,
} from './env'

export {
  getSupabaseBrowserClient,
  getSupabaseServerClient,
  tryGetSupabaseServerClient,
} from './client'

export {
  TABLES,
  PRODUCT_IMAGES_BUCKET,
  type CategoryRow,
  type ProductRow,
  type ProductImageRow,
  type ProductRowWithRelations,
} from './types'

export {
  mapProductRow,
  mapProductRows,
  mapImages,
  mapSpecifications,
  mapStockStatus,
  toNumber,
  SCHEMA_GAPS,
} from './mappers'

export {
  fetchAllProducts,
  fetchAllProductsResult,
  fetchProductsByCategory,
  fetchFeaturedProducts,
  fetchProductBySlug,
  fetchProductById,
  fetchResolvedProduct,
  fetchCategories,
  checkSupabaseConnection,
  type FetchResult,
  type ConnectionCheck,
} from './products'
