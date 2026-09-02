import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Generated from SITE_URL so the sitemap reference can never drift from the
 * canonical domain used by metadata and structured data (the previous static
 * public/robots.txt pointed at a different Vercel alias).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
