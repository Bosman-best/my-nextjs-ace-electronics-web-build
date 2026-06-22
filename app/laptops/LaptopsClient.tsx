'use client'
import { useState, useMemo } from 'react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FilterBar from '@/components/ui/FilterBar'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { LAPTOPS, type ProductCategory } from '@/lib/products'

const LAPTOP_FILTERS = ['All','Gaming','Business','Student','Ultrabook'] as const

export default function LaptopsClient() {
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All')
  const items = useMemo(() => 
    filter === 'All' ? LAPTOPS : LAPTOPS.filter(l => l.category === filter),
    [filter]
  )
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Laptops for Sale in Ghana",
    "itemListElement": items.filter(p => {
      const price = (p as any).salePrice ?? p.price
      return price <= 5000
    }).slice(0,10).map((p, i) => ({
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
          "price": (p as any).salePrice ?? p.price,
          "availability": "https://schema.org/InStock",
          "seller": { "@type": "Organization", "name": "ACE Electronics" }
        }
      }
    }))
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-3">Laptops for Sale in Ghana</h1>
          <p className="text-ace-silver text-lg mb-10">Gaming, Business, Student & Ultrabooks — all verified authentic.</p>
          <FilterBar filters={[...LAPTOP_FILTERS]} onFilterChange={(f)=>setFilter(f as any)} searchPlaceholder="Search laptops…" />
          <ProductGrid>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
          {items.length === 0 && <p className="text-ace-silver">No devices in this filter — <a href="https://wa.me/233547981348" className="text-ace-electric hover:underline">ask ACE on WhatsApp</a>.</p>}
          <p className="text-ace-silver text-sm mt-8">{items.length} of {LAPTOPS.length} devices shown</p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
