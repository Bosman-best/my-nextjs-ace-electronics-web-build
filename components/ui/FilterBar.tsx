'use client'
import { useState } from 'react'
import { Search } from '@/components/ui/IconSet'
import { cn } from '@/lib/utils'
export default function FilterBar({ filters, activeFilter, onFilterChange, onSearchChange, onSortChange, searchPlaceholder = 'Search model…' }: { filters: string[], activeFilter?: string, onFilterChange?: (filter: string) => void, onSearchChange?: (val: string) => void, onSortChange?: (val: string) => void, searchPlaceholder?: string }) {
  const [internalActive, setInternalActive] = useState(filters[0] || 'All')
  const active = activeFilter !== undefined ? activeFilter : internalActive
  const handleClick = (f: string) => {
    setInternalActive(f);
    onFilterChange?.(f)
  }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map(f => (
          <button key={f} onClick={() => handleClick(f)}
            className={cn('px-[18px] py-3 rounded-full text-sm font-medium transition-all min-h-[44px]',
              active === f ? 'bg-[#1455D9] text-white shadow-[0_6px_16px_rgba(20,85,217,0.18)]' : 'bg-white text-[#4F5B72] hover:bg-[#EDF4FF]'
            )}>{f}</button>
        ))}
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-[280px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ace-text-secondary)/1)]" />
                    <input onChange={(e) => onSearchChange?.(e.target.value)} placeholder={searchPlaceholder} className="w-full bg-white rounded-full pl-10 pr-4 py-3 text-[#142759] placeholder:text-[#7B879A] focus:outline-none focus:ring-2 focus:ring-[#1455D9]/20 text-sm min-h-[44px]" />
        </div>
        <select onChange={(e) => onSortChange?.(e.target.value)} className="bg-white rounded-full px-4 py-3 text-[#4F5B72] text-sm focus:outline-none focus:ring-2 focus:ring-[#1455D9]/20 min-h-[44px]">
          <option value="Newest">Newest</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
