import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ace-electronics.com'
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
  return routes.map(r => ({
    url: `${base}${r || '/'}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'daily' : 'weekly',
    priority: r === '' ? 1 : r.startsWith('/laptops') || r.startsWith('/smartphones') ? 0.8 : 0.5,
  }))
}
