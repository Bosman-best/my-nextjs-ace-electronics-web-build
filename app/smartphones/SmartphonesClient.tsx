'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Newest')

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && PHONE_FILTERS.includes(categoryParam as any) && categoryParam !== filter) {
      setFilter(categoryParam as ProductCategory)
    }
  }, [searchParams, filter])

  useEffect(() => {
    if (!pathname) return
    const params = new URLSearchParams()
    if (filter !== 'All') {
      params.set('category', filter)
    }
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.replace(newUrl)
  }, [filter, pathname, router])

  const items = useMemo(() => {
    let result = filter === 'All' ? SMARTPHONES : SMARTPHONES.filter(p => p.category === filter)
    
  if (search.trim()) {
  const q = search.toLowerCase();
  result = result.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.specs.some(spec => spec.toLowerCase().includes(q))
  );
}
    
    if (sort === 'Price: Low to High') {
      result = [...result].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
    } else if (sort === 'Price: High to Low') {
      result = [...result].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
    }
    
    return result
  }, [filter, search, sort])

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
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-[rgb(var(--ace-text-primary)/1)] mb-3">Smartphones for Sale in Ghana</h1>
          <p className="text-[rgb(var(--ace-text-secondary)/1)] text-lg mb-10">Flagship, Mid-range & Budget — all verified authentic.</p>
          <FilterBar filters={[...PHONE_FILTERS]} onFilterChange={(f)=>setFilter(f as any)} onSearchChange={setSearch} onSortChange={setSort} searchPlaceholder="Search phones…" />
          <ProductGrid>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
          {items.length === 0 && <p className="text-[rgb(var(--ace-text-secondary)/1)]">No devices found — <a href="https://wa.me/233547981348" className="text-[rgb(var(--ace-link)/1)] hover:underline">ask ACE on WhatsApp</a>.</p>}
          <p className="text-[rgb(var(--ace-text-secondary)/1)] text-sm mt-8">{items.length} of {SMARTPHONES.length} devices shown</p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
