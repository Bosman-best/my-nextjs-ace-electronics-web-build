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
    <div className="mb-8 rounded-[20px] border border-[#E6ECF4] bg-white p-4 shadow-[0_6px_22px_rgba(23,43,77,0.035)] md:p-5">
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => handleClick(f)}
            className={cn('rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all min-h-[40px]',
              active === f ? 'bg-[#0066CC] text-white shadow-[0_5px_14px_rgba(0,102,204,0.18)]' : 'bg-[#F3F6FA] text-[#53647B] hover:bg-[#EAF1FB]'
            )}>{f}</button>
        ))}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[280px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--ace-text-secondary)/1)]" />
                    <input onChange={(e) => onSearchChange?.(e.target.value)} placeholder={searchPlaceholder} className="w-full rounded-full border border-[#E6ECF4] bg-[#F8FAFD] py-3 pl-10 pr-4 text-sm text-[#172B4D] placeholder:text-[#8A97A9] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 min-h-[44px]" />
        </div>
        <select onChange={(e) => onSortChange?.(e.target.value)} className="min-h-[44px] rounded-full border border-[#E6ECF4] bg-[#F8FAFD] px-4 py-3 text-sm text-[#53647B] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20">
          <option value="Newest">Newest</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}
