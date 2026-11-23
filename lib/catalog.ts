import type { Product } from '@/lib/products'

type DbProduct = {
  id: string
  name: string
  slug: string
  category_id: string
  description: string | null
  price: number
  compare_at_price: number | null
  availability: string | null
  featured: boolean
  specifications: Array<{ label: string; value: string; sortOrder?: number }> | null
  legacy_id: string | null
  brand: string | null
  subcategory: string | null
  condition: string | null
  warranty: string | null
  active: boolean
  archived_at: string | null
  currency: string | null
}
type DbImage = { product_id: string; image_url: string; display_order: number; is_primary: boolean; alt_text: string | null }
type DbCategory = { id: string; name: string; slug: string }

export type CatalogProduct = Product & {
  uuid: string
  slug: string
  description: string
  condition: string | null
  warranty: string | null
  availability: string
  currency: string
  legacyId: string | null
}

async function readTable<T>(table: string, query: string): Promise<T[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase public connection is not configured.')
  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: 60 },
  })
  if (!response.ok) throw new Error(`Supabase catalogue request failed (${table}): ${response.status}`)
  return response.json() as Promise<T[]>
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const [rows, categories, images] = await Promise.all([
    readTable<DbProduct>('products', 'select=*&active=eq.true&archived_at=is.null&order=created_at.desc'),
    readTable<DbCategory>('categories', 'select=id,name,slug'),
    readTable<DbImage>('product_images', 'select=product_id,image_url,display_order,is_primary,alt_text&order=display_order.asc'),
  ])
  const categoryById = new Map(categories.map((category) => [category.id, category]))
  const imagesByProduct = new Map<string, DbImage[]>()
  for (const image of images) {
    const current = imagesByProduct.get(image.product_id) ?? []
    current.push(image)
    imagesByProduct.set(image.product_id, current)
  }

  return rows.map((row) => {
    const category = categoryById.get(row.category_id)
    const type = category?.slug === 'smartphones' ? 'smartphone' : 'laptop'
    const productImages = (imagesByProduct.get(row.id) ?? [])
      .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.display_order - b.display_order)
      .map((image) => image.image_url)
    const specs = Array.isArray(row.specifications)
      ? [...row.specifications].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((item) => `${item.label}: ${item.value}`)
      : []
    const segment = row.subcategory || (type === 'laptop' ? 'Business' : 'Mid-range')
    return {
      id: row.slug,
      uuid: row.id,
      slug: row.slug,
      name: row.name,
      brand: row.brand || '',
      category: segment,
      price: Number(row.price) || 0,
      specs,
      images: productImages,
      image: productImages[0],
      type,
      description: row.description || '',
      condition: row.condition,
      warranty: row.warranty,
      availability: row.availability || 'contact_for_availability',
      currency: row.currency || 'GHS',
      legacyId: row.legacy_id,
    }
  })
}
