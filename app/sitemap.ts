import { MetadataRoute } from 'next'
import { products } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://ace-electronics.vercel.app'
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
    '/cookies',
    '/returns',
    '/terms',
  ]

  return routes.map(route => ({
    url: `${base}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : route.startsWith('/laptops') || route.startsWith('/smartphones') ? 0.8 : 0.5,
  })).concat(
    products.map(product => ({
      url: `${base}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  )
}
