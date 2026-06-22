'use client'
import { useState } from 'react'
import { Search } from '@/components/ui/IconSet'
import { cn } from '@/lib/utils'
export default function FilterBar({ filters, onFilterChange, searchPlaceholder = 'Search model…' }: { filters: string[], onFilterChange?: (filter: string) => void, searchPlaceholder?: string }) {
  const [active, setActive] = useState(filters[0] || 'All')
  const handleClick = (f: string) => { setActive(f); onFilterChange?.(f) }
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map(f => (
          <button key={f} onClick={() => handleClick(f)}
            className={cn('px-[18px] py-3 rounded-full text-sm font-medium transition-all border min-h-[44px]',
              active === f ? 'bg-ace-electric/15 border-ace-electric text-ace-white' : 'bg-ace-glass border-ace-glass-border text-ace-silver hover:border-white/30'
            )}>{f}</button>
        ))}
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-[280px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ace-silver" />
          <input placeholder={searchPlaceholder} className="w-full bg-ace-glass border border-ace-glass-border rounded-xl pl-10 pr-4 py-3 text-ace-white placeholder:text-ace-silver focus:outline-none focus:border-ace-electric text-sm min-h-[44px]" />
        </div>
        <select className="bg-ace-glass border border-ace-glass-border rounded-xl px-4 py-3 text-ace-silver text-sm focus:outline-none focus:border-ace-electric min-h-[44px]">
          <option>Newest</option><option>Price: Low-High</option><option>Price: High-Low</option><option>Brand</option>
        </select>
      </div>
    </div>
  )
}
