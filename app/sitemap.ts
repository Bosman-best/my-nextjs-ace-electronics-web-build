import { MetadataRoute } from 'next'
import { getAllProducts, getProductPath } from '@/lib/catalog'
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

  // Only live (non-archived) products are indexed, at their current slug.
  const productEntries: MetadataRoute.Sitemap = getAllProducts().map(p => ({
    url: `${base}${getProductPath(p)}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...pageEntries, ...productEntries]
}
