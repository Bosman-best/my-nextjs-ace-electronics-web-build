import { Suspense } from 'react'
import type { Metadata } from 'next'
import SearchClient from './SearchClient'
import { getCatalogProducts } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Search Products | ACE Electronics Ghana',
  description: 'Search laptops, smartphones and product specifications across the ACE Electronics catalogue.',
  robots: { index: false, follow: true },
}

export default async function SearchPage() {
  const products = await getCatalogProducts()
  return <Suspense fallback={<main className="min-h-screen bg-[#F5F8FF]" />}><SearchClient products={products} /></Suspense>
}
