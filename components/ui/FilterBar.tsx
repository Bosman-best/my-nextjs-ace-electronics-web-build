'use client'
import { useState } from 'react'
import { Search } from '@/components/ui/IconSet'
import { cn } from '@/lib/utils'
export default function FilterBar({ filters, onFilterChange, onSearchChange, onSortChange, searchPlaceholder = 'Search model…' }: { filters: string[], onFilterChange?: (filter: string) => void, onSearchChange?: (val: string) => void, onSortChange?: (val: string) => void, searchPlaceholder?: string }) {
  const [active, setActive] = useState(filters[0] || 'All')
  const handleClick = (f: string) => { setActive(f); onFilterChange?.(f) }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map(f => (
          <button key={f} onClick={() => handleClick(f)}
            className={cn('px-[18px] py-3 rounded-full text-sm font-medium transition-all border min-h-[44px]',              active === f ? 'bg-[rgb(var(--ace-link)/0.15)] border-[rgb(var(--ace-link)/1)] text-[rgb(var(--ace-text-primary)/1)]' : 'bg-[rgb(var(--ace-surface-primary)/1)] border-[rgba(0,0,0,0.04)] text-[rgb(var(--ace-text-secondary)/1)] hover:border-[rgba(0,0,0,0.06)]'            )}>{f}</button>
        ))}
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-[280px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ace-text-secondary)/1)]" />
                    <input onChange={(e) => onSearchChange?.(e.target.value)} placeholder={searchPlaceholder} className="w-full bg-[rgb(var(--ace-surface-primary)/1)] border border-[rgba(0,0,0,0.04)] rounded-xl pl-10 pr-4 py-3 text-[rgb(var(--ace-text-primary)/1)] placeholder:text-[rgb(var(--ace-text-secondary)/1)] focus:outline-none focus:border-[rgb(var(--ace-link)/1)] text-sm min-h-[44px]" />
        </div>
        <select onChange={(e) => onSortChange?.(e.target.value)} className="bg-[rgb(var(--ace-surface-primary)/1)] border border-[rgba(0,0,0,0.04)] rounded-xl px-4 py-3 text-[rgb(var(--ace-text-secondary)/1)] text-sm focus:outline-none focus:border-[rgb(var(--ace-link)/1)] min-h-[44px]">
          <option value="Newest">Newest</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
