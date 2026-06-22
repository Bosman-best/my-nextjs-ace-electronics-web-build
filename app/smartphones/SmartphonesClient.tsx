'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FilterBar from '@/components/ui/FilterBar'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { SMARTPHONES, type ProductCategory } from '@/lib/products'

const PHONE_FILTERS = ['All','Flagship','Mid-range','Budget'] as const

export default function SmartphonesClient() {
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All')
  const items = useMemo(() =>
    filter === 'All' ? SMARTPHONES : SMARTPHONES.filter(p => p.category === filter),
    [filter]
  )
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Smartphones for Sale in Ghana",
    "itemListElement": items.filter(p => p.price <= 5000).map((p, i) => ({
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
          "price": p.price,
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
          <FilterBar filters={[...PHONE_FILTERS]} onFilterChange={(f)=>setFilter(f as any)} searchPlaceholder="Search phones…" />
          <ProductGrid>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
          <p className="text-ace-silver text-sm mt-8">{items.length} of {SMARTPHONES.length} devices shown</p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
