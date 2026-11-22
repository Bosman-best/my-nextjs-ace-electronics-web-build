import { Suspense } from 'react'
import type { Metadata } from 'next'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Search Products | ACE Electronics Ghana',
  description: 'Search laptops, smartphones and product specifications across the ACE Electronics catalogue.',
  robots: { index: false, follow: true },
}

export default function SearchPage() {
  return <Suspense fallback={<main className="min-h-screen bg-[#F5F8FF]" />}><SearchClient /></Suspense>
}
