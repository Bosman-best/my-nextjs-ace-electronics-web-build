'use client'
import { useMemo, useState } from 'react'
import FilterBar, { type SortValue } from '@/components/ui/FilterBar'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import {
  buildGeneralInquiryLink,
  countByCategory,
  queryProducts,
  SUBCATEGORY_LABELS,
  type ProductCategory,
  type ProductSort,
  type ProductSubcategory,
} from '@/lib/catalog'

const ALL = 'All'

/**
 * One listing UI for every category. Filtering, search and sorting all run
 * through the catalog repository, so a change to a product record shows up here
 * with no page-level product data of any kind.
 */
export default function CategoryListing({
  category,
  subcategories,
  searchPlaceholder,
  emptyStateMessage,
}: {
  /** Controlled category value — products are read from the repository. */
  category: ProductCategory
  /** Controlled subcategory values that have live products in this category. */
  subcategories: ProductSubcategory[]
  searchPlaceholder: string
  emptyStateMessage: string
}) {
  const [filter, setFilter] = useState<string>(ALL)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortValue>('newest')

  // Map filter labels back to controlled subcategory values.
  const filterOptions = useMemo(
    () => [ALL, ...subcategories.map(s => SUBCATEGORY_LABELS[s])],
    [subcategories],
  )
  const labelToValue = useMemo(() => {
    const m = new Map<string, ProductSubcategory>()
    subcategories.forEach(s => m.set(SUBCATEGORY_LABELS[s], s))
    return m
  }, [subcategories])

  // Every filter/search/sort combination is answered by the canonical catalog.
  const items = useMemo(
    () =>
      queryProducts({
        category,
        subcategory: filter === ALL ? undefined : labelToValue.get(filter),
        search,
        sort: (sort === 'newest' ? 'catalog' : sort) as ProductSort,
      }),
    [category, filter, search, sort, labelToValue],
  )

  const totalInCategory = useMemo(() => countByCategory(category), [category])
  const isFiltered = filter !== ALL || search.trim() !== ''

  const resetFilters = () => {
    setFilter(ALL)
    setSearch('')
  }

  return (
    <>
      <FilterBar
        filters={filterOptions}
        activeFilter={filter}
        onFilterChange={setFilter}
        searchValue={search}
        onSearchChange={setSearch}
        sortValue={sort}
        onSortChange={setSort}
        searchPlaceholder={searchPlaceholder}
        resultsLabel={`${items.length} of ${totalInCategory} devices shown`}
      />

      {items.length > 0 ? (
        <>
          <ProductGrid>
            {items.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
          </ProductGrid>
          <p className="text-ace-silver text-sm mt-8">
            Showing {items.length} of {totalInCategory} devices
            {isFiltered && (
              <>
                {' — '}
                <button type="button" onClick={resetFilters} className="text-ace-electric hover:underline font-medium">
                  clear filters
                </button>
              </>
            )}
          </p>
        </>
      ) : (
        /* Empty state: explains what happened and always offers a way forward. */
        <div className="ace-glass p-8 md:p-12 text-center">
          <h2 className="font-heading text-xl md:text-2xl font-semibold text-ace-white">No devices match your search</h2>
          <p className="text-ace-silver mt-3 max-w-[520px] mx-auto leading-relaxed">
            {search.trim()
              ? <>We couldn&apos;t find anything for &ldquo;{search.trim()}&rdquo;{filter !== ALL ? ` in ${filter}` : ''}. Try a different term, or ask ACE directly — stock changes often.</>
              : <>There&apos;s nothing in {filter} right now. Try another filter, or ask ACE what&apos;s coming in.</>}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonSecondary onClick={resetFilters}>Clear filters</ButtonSecondary>
            <ButtonSecondary href={buildGeneralInquiryLink(emptyStateMessage)} target="_blank">
              Ask ACE on WhatsApp
            </ButtonSecondary>
          </div>
        </div>
      )}
    </>
  )
}
