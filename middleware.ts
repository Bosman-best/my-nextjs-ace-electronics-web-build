import { NextResponse, type NextRequest } from 'next/server'
import { resolveProduct } from '@/lib/catalog/repository'
import { getProductPath } from '@/lib/catalog/presentation'

/**
 * Permanent product IDs stay valid as customer-facing URLs.
 *
 * Product pages are statically prerendered by slug. When a customer opens a
 * link built from the permanent internal ID — every WhatsApp inquiry quotes
 * one, and links shared before a re-slug keep circulating — redirecting from
 * inside the page component is unreliable: Next's full-route cache can replay
 * the 308 without its Location header, leaving the browser stuck.
 *
 * Handling it in middleware guarantees a real, uncacheable redirect before
 * routing, and lets the slug page stay purely static. The catalog modules
 * imported here are dependency-free TypeScript, so they run fine at the edge.
 */
export function middleware(request: NextRequest) {
  const match = request.nextUrl.pathname.match(/^\/products\/([^/]+)\/?$/)
  if (!match) return NextResponse.next()

  const segment = decodeURIComponent(match[1])
  const product = resolveProduct(segment)

  // Unknown, or already on the canonical slug → let the page handle it
  // (it renders the real 404 for unknown slugs).
  if (!product || product.slug === segment) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = getProductPath(product)
  return NextResponse.redirect(url, 308)
}

export const config = {
  // Only product detail URLs need ID→slug resolution. The :path* form is used
  // because a bare :slug param compiles to a matcher that misses the segment.
  matcher: '/products/:path*',
}
