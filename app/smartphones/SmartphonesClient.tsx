'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FilterBar, { type SortValue } from '@/components/ui/FilterBar'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { WHATSAPP_LINK } from '@/lib/utils'
import { SMARTPHONES, type Product, type ProductCategory } from '@/lib/products'

const PHONE_FILTERS = ['All','Flagship','Mid-range','Budget'] as const

const effectivePrice = (p: Product) => p.salePrice ?? p.price

export default function SmartphonesClient() {
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortValue>('newest')

  const items = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = SMARTPHONES.filter(p =>
      (filter === 'All' || p.category === filter) &&
      (q === '' || `${p.name} ${p.specs}`.toLowerCase().includes(q))
    )
    list = [...list].sort((a, b) => {
      switch (sort) {
        case 'price-asc': return effectivePrice(a) - effectivePrice(b)
        case 'price-desc': return effectivePrice(b) - effectivePrice(a)
        case 'name': return a.name.localeCompare(b.name)
        default: return 0 // 'newest' = catalog order
      }
    })
    return list
  }, [filter, search, sort])

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Smartphones for Sale in Ghana",
    "itemListElement": SMARTPHONES.filter(p => effectivePrice(p) <= 5000).map((p, i) => ({
      "@type": "ListItem",
      "position": i+1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "description": p.specs,
        "brand": { "@type": "Brand", "name": p.name.split(' ')[0] },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "GHS",
          "price": effectivePrice(p),
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "ACE Electronics" }
        }
      }
    }))
  }
  return (
    <>
      {jsonLd.itemListElement.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-3">Smartphones for Sale in Ghana</h1>
          <p className="text-ace-silver text-lg mb-10">Flagship, Mid-range & Budget — all verified authentic.</p>
          <FilterBar
            filters={[...PHONE_FILTERS]}
            activeFilter={filter}
            onFilterChange={(f) => setFilter(f as ProductCategory | 'All')}
            searchValue={search}
            onSearchChange={setSearch}
            sortValue={sort}
            onSortChange={setSort}
            searchPlaceholder="Search phones…"
          />
          <ProductGrid>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
          {items.length === 0 && (
            <p className="text-ace-silver">
              No devices match your search — <a href={WHATSAPP_LINK("Hi ACE, I'm looking for a phone you don't currently list.")} target="_blank" rel="noopener noreferrer" className="text-ace-electric hover:underline">ask ACE on WhatsApp</a>.
            </p>
          )}
          <p className="text-ace-silver text-sm mt-8">{items.length} of {SMARTPHONES.length} devices shown</p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
