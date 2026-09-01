'use client'
import { Search } from '@/components/ui/IconSet'
import { cn } from '@/lib/utils'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name', label: 'Brand / Name (A–Z)' },
] as const

export type SortValue = typeof SORT_OPTIONS[number]['value']

export default function FilterBar({
  filters,
  activeFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
  sortValue,
  onSortChange,
  searchPlaceholder = 'Search model…',
  searchLabel = 'Search products',
  sortLabel = 'Sort products',
}: {
  filters: string[]
  activeFilter?: string
  onFilterChange?: (filter: string) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  sortValue?: SortValue
  onSortChange?: (value: SortValue) => void
  searchPlaceholder?: string
  searchLabel?: string
  sortLabel?: string
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by category">
        {filters.map(f => {
          const active = f === activeFilter
          return (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange?.(f)}
              aria-pressed={active}
              className={cn('px-[18px] py-3 rounded-full text-sm font-medium transition-all border min-h-[44px]',
                active ? 'bg-ace-electric/15 border-ace-electric text-ace-white' : 'bg-ace-glass border-ace-glass-border text-ace-silver hover:border-white/30'
              )}
            >
              {f}
            </button>
          )
        })}
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-[280px]">
          <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ace-silver" />
          <label htmlFor="ace-product-search" className="sr-only">{searchLabel}</label>
          <input
            id="ace-product-search"
            type="search"
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-ace-glass border border-ace-glass-border rounded-xl pl-10 pr-4 py-3 text-ace-white placeholder:text-ace-silver focus:outline-none focus:border-ace-electric text-sm min-h-[44px]"
          />
        </div>
        <label htmlFor="ace-product-sort" className="sr-only">{sortLabel}</label>
        <select
          id="ace-product-sort"
          value={sortValue ?? 'newest'}
          onChange={(e) => onSortChange?.(e.target.value as SortValue)}
          className="bg-ace-glass border border-ace-glass-border rounded-xl px-4 py-3 text-ace-silver text-sm focus:outline-none focus:border-ace-electric min-h-[44px]"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  )
}
