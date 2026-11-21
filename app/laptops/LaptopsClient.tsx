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
import { LAPTOPS, type ProductCategory } from '@/lib/products'

const LAPTOP_FILTERS = ['All','Gaming','Business','Student','Ultrabook'] as const

export default function LaptopsClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize filter directly from URL query param if present
  const categoryParam = searchParams.get('category')
  const initialCategory = categoryParam && LAPTOP_FILTERS.includes(categoryParam as any)
    ? (categoryParam as ProductCategory)
    : 'All'
  const [filter, setFilter] = useState<ProductCategory | 'All'>(initialCategory)

  const brandParam = searchParams.get('brand')
  const [brand, setBrand] = useState<string | null>(brandParam ? brandParam.toLowerCase() : null)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Newest')

  // Keep state in sync when URL changes externally (back/forward navigation or link click)
  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && LAPTOP_FILTERS.includes(cat as any)) {
      setFilter(cat as ProductCategory)
    } else if (!cat) {
      setFilter('All')
    }
    const b = searchParams.get('brand')
    setBrand(b ? b.toLowerCase() : null)
  }, [searchParams])

  // Handle category change and sync to URL without wiping other params
  const handleFilterChange = (newFilter: ProductCategory | 'All') => {
    setFilter(newFilter)
    const params = new URLSearchParams(searchParams.toString())
    if (newFilter === 'All') {
      params.delete('category')
    } else {
      params.set('category', newFilter)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const clearBrandFilter = () => {
    setBrand(null)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('brand')
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const items = useMemo(() => {
    let result = filter === 'All' ? LAPTOPS : LAPTOPS.filter(l => l.category === filter)

    if (brand) {
      result = result.filter(l => l.brand.toLowerCase() === brand)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.specs.some(spec => spec.toLowerCase().includes(q))
      )
    }

    if (sort === 'Price: Low to High') {
      result = [...result].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
    } else if (sort === 'Price: High to Low') {
      result = [...result].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
    }

    return result
  }, [filter, brand, search, sort])

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
      <main className="ace-page py-16 md:py-20">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-bold text-[#142759] mb-3">Laptops for Sale in Ghana</h1>
          <p className="text-[#6E6E73] text-lg mb-10">Gaming, Business, Student & Ultrabooks — all verified authentic.</p>
          <FilterBar
            filters={[...LAPTOP_FILTERS]}
            activeFilter={filter}
            onFilterChange={(f) => handleFilterChange(f as any)}
            onSearchChange={setSearch}
            onSortChange={setSort}
            searchPlaceholder="Search laptops…"
          />
          {brand && (
            <div className="flex items-center gap-2 mb-6 -mt-4">
              <span className="text-sm text-[#6E6E73]">Brand: <strong className="text-[#1D1D1F] uppercase">{brand}</strong></span>
              <button
                onClick={clearBrandFilter}
                className="text-xs bg-[#E8F0FE] text-[#0066CC] hover:bg-[#D2E3FC] px-2.5 py-1 rounded-full transition-colors"
              >
                Clear ×
              </button>
            </div>
          )}
          <ProductGrid>
            {items.map(p => <ProductCard key={p.id} product={p} />)}
          </ProductGrid>
          {items.length === 0 && <p className="text-[rgb(var(--ace-text-secondary)/1)]">No devices found — <a href="https://wa.me/233547981348" className="text-[rgb(var(--ace-link)/1)] hover:underline">ask ACE on WhatsApp</a>.</p>}
          <p className="text-[rgb(var(--ace-text-secondary)/1)] text-sm mt-8">{items.length} of {LAPTOPS.length} devices shown</p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
