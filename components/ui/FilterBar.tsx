'use client'
import { useId } from 'react'
import { Search } from '@/components/ui/IconSet'
import { cn } from '@/lib/utils'

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Featured order' },
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
  resultsLabel,
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
  /** Announced to screen readers whenever the result count changes. */
  resultsLabel?: string
}) {
  // Unique per instance so labels stay correctly associated even if more than
  // one FilterBar is ever rendered on a page.
  const uid = useId()
  const searchId = `ace-search-${uid}`
  const sortId = `ace-sort-${uid}`

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      {/* Horizontally scrollable on narrow screens so filter pills never wrap
          into a tall stack or overflow the viewport. */}
      <div
        className="flex gap-3 overflow-x-auto lg:flex-wrap lg:overflow-visible -mx-1 px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter by type"
      >
        {filters.map(f => {
          const active = f === activeFilter
          return (
            <button
              key={f}
              type="button"
              onClick={() => onFilterChange?.(f)}
              aria-pressed={active}
              className={cn(
                'px-[18px] py-3 rounded-full text-sm font-medium transition-all border min-h-[44px] whitespace-nowrap flex-shrink-0',
                active
                  ? 'bg-ace-electric/10 border-ace-electric text-ace-white'
                  : 'bg-ace-glass border-ace-glass-border text-ace-silver hover:border-black/20'
              )}
            >
              {f}
            </button>
          )
        })}
      </div>
      <div className="flex gap-3 w-full lg:w-auto">
        <div className="relative flex-1 lg:w-[280px] min-w-0">
          <Search size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ace-silver pointer-events-none" />
          <label htmlFor={searchId} className="sr-only">{searchLabel}</label>
          <input
            id={searchId}
            type="search"
            value={searchValue ?? ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-ace-glass border border-ace-glass-border rounded-xl pl-10 pr-4 py-3 text-ace-white placeholder:text-ace-silver focus:outline-none focus:border-ace-electric text-sm min-h-[44px]"
          />
        </div>
        <label htmlFor={sortId} className="sr-only">{sortLabel}</label>
        <select
          id={sortId}
          value={sortValue ?? 'newest'}
          onChange={(e) => onSortChange?.(e.target.value as SortValue)}
          className="bg-ace-glass border border-ace-glass-border rounded-xl px-4 py-3 text-ace-silver text-sm focus:outline-none focus:border-ace-electric min-h-[44px] flex-shrink-0"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      {resultsLabel && <p className="sr-only" role="status" aria-live="polite">{resultsLabel}</p>}
    </div>
  )
}
