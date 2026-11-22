'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { products } from '@/lib/products'

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()

  const results = useMemo(() => {
    if (!query) return []
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean)
    return products.filter((product) => {
      const searchable = [
        product.name,
        product.brand,
        product.category,
        product.type,
        product.id,
        ...product.specs,
      ].join(' ').toLocaleLowerCase()
      return terms.every((term) => searchable.includes(term))
    })
  }, [query])

  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-10 md:py-14">
        <PageContainer>
          <div className="mx-auto mb-9 max-w-3xl">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1769D2]">ACE Electronics · Store search</p>
            <h1 className="font-heading text-[34px] font-bold tracking-[-0.04em] text-[#172B4D] sm:text-[42px]">Find what you need.</h1>
            <form action="/search" method="get" role="search" className="mt-6 flex h-12 items-center gap-3 rounded-full border border-[#DCE4EF] bg-white px-5 shadow-sm focus-within:border-[#0066CC]">
              <Search size={18} className="shrink-0 text-[#8290A3]" />
              <input name="q" type="search" defaultValue={query} autoComplete="off" placeholder="Search laptops, phones, brands or specs…" aria-label="Search all ACE products" className="h-full w-full min-w-0 bg-transparent text-sm text-[#172B4D] outline-none placeholder:text-[#9AA5B4]" />
              <button type="submit" className="rounded-full bg-[#0066CC] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#0055AD]">Search</button>
            </form>
            {query && <p className="mt-4 text-sm text-[#718096]">{results.length} {results.length === 1 ? 'result' : 'results'} for <span className="font-semibold text-[#172B4D]">“{query}”</span></p>}
          </div>

          {!query ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center">
              <Search size={28} className="mx-auto text-[#9AA5B4]" />
              <h2 className="mt-4 text-lg font-semibold text-[#172B4D]">Search the full catalogue</h2>
              <p className="mt-2 text-sm text-[#718096]">Try a product name, brand, category or specification.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {['iPhone', 'Samsung', 'HP', '16GB RAM', 'Gaming'].map((term) => (
                  <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} className="rounded-full bg-[#F1F5FA] px-4 py-2 text-xs font-medium text-[#315477] transition hover:bg-[#E5EEF9]">{term}</Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <ProductGrid>
              {results.map((product) => <ProductCard key={product.id} product={product} />)}
            </ProductGrid>
          ) : (
            <div className="rounded-2xl bg-white px-6 py-12 text-center">
              <h2 className="text-lg font-semibold text-[#172B4D]">No matching products found</h2>
              <p className="mt-2 text-sm text-[#718096]">Try a different product name, brand or specification.</p>
              <Link href="/search" className="mt-5 inline-flex rounded-full bg-[#0066CC] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0055AD]">Clear search</Link>
            </div>
          )}
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
