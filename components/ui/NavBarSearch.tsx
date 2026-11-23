'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from '@/components/ui/IconSet'

export default function NavBarSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setIsOpen(false)
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

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = searchQuery.trim()
    if (!query) return
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div ref={searchRef} className="relative">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="hidden items-center p-2 text-[#1D1D1F] transition-colors hover:text-[#0066CC] lg:flex" aria-label="Search">
          <Search size={20} />
        </button>
      )}
      {isOpen && (
        <form onSubmit={submitSearch} className="absolute right-0 top-1/2 flex w-72 -translate-y-1/2 items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-4 py-2 shadow-sm">
          <Search size={18} className="shrink-0 text-[#6E6E73]" />
          <input ref={inputRef} type="search" placeholder="Search products..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[14px] text-[#1D1D1F] outline-none placeholder:text-[#6E6E73]" />
          {searchQuery && <button type="button" onClick={() => setSearchQuery('')} className="p-1 text-[#6E6E73] hover:text-[#1D1D1F]" aria-label="Clear search"><X size={16} /></button>}
        </form>
      )}
    </div>
  )
}
