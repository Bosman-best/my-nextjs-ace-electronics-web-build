import { MetadataRoute } from 'next'
import { ALL_PRODUCTS } from '@/lib/products'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const routes = [
    '',
    '/laptops',
    '/smartphones',
    '/accessories',
    '/gaming',
    '/about',
    '/contact',
    '/warranty',
    '/faqs',
    '/privacy',
    '/terms',
  ]
  const pageEntries = routes.map(r => ({
    url: `${base}${r || '/'}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'daily' : 'weekly',
    priority: r === '' ? 1 : r.startsWith('/laptops') || r.startsWith('/smartphones') ? 0.8 : 0.5,
  })) as MetadataRoute.Sitemap

  const productEntries: MetadataRoute.Sitemap = ALL_PRODUCTS.map(p => ({
    url: `${base}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...pageEntries, ...productEntries]
}
