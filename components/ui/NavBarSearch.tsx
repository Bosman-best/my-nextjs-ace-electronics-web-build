'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X } from '@/components/ui/IconSet'
import { LAPTOPS, SMARTPHONES, formatGHS } from '@/lib/products'
import Link from 'next/link'

export default function NavBarSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Array<{
    id: string
    name: string
    specs: string[]
    price: number
    salePrice?: number
    type: 'laptop' | 'smartphone'
  }>>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const allProducts = [...LAPTOPS, ...SMARTPHONES]

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allProducts.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.specs.some(spec => spec.toLowerCase().includes(query))
    );

    setResults(
      filtered.map(product => ({
        id: product.id,
        name: product.name,
        specs: product.specs,
        price: product.price,
        salePrice: product.salePrice,
        type: product.type,
      }))
    )
  }, [searchQuery])

  // Close on Escape or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getPriceDisplay = (price: number, salePrice?: number) => {
    if (salePrice !== undefined && salePrice > 0) {
      return formatGHS(salePrice)
    }
    return formatGHS(price)
  }

  return (
    <div ref={searchRef} className="relative">
      {/* Search Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-[#1D1D1F] hover:text-[#0066CC] transition-colors hidden lg:flex items-center"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      )}

      {/* Inline Search Input (Expanded State) */}
      {isOpen && (
        <div className="absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-[999px] border border-[#D2D2D7] px-4 py-2 w-64 shadow-sm transition-all">
          <div className="flex items-center gap-2">
            <Search size={18} className="text-[#6E6E73]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-[14px] text-[#1D1D1F] placeholder-[#6E6E73] bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setResults([])
                }}
                className="p-1 text-[#6E6E73] hover:text-[#1D1D1F]"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full right-0 mt-2 w-96 rounded-[18px] bg-white shadow-[0_12px_36px_rgba(29,29,31,0.10)] z-50 max-h-96 overflow-y-auto p-2">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/products/${result.id}`}
              onClick={() => setIsOpen(false)}
              className="flex items-start gap-4 rounded-[12px] px-3 py-3 hover:bg-[#F5F5F7] transition-colors group"
            >
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-[#1D1D1F] group-hover:text-[#0066CC] transition-colors">
                  {result.name}
                </div>
                <div className="text-[12px] text-[#6E6E73] line-clamp-1">
                  {result.specs.join(', ')}
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end gap-1">
                <div className="text-[14px] font-medium text-[#1D1D1F]">
                  {getPriceDisplay(result.price, result.salePrice)}
                </div>
                <div className="text-[11px] text-[#0066CC] font-medium">
                  Quick Inquiry
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && searchQuery.trim() && results.length === 0 && (
        <div className="absolute top-full right-0 mt-2 w-96 rounded-[18px] bg-white shadow-[0_12px_36px_rgba(29,29,31,0.10)] z-50 px-5 py-6">
          <div className="text-center text-[14px] text-[#6E6E73]">
            No products found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  )
}
