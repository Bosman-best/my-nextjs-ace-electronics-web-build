'use client'
import { useMemo, useState } from 'react'
import PageContainer from '@/components/layout/PageContainer'
import FilterBar, { type SortValue } from '@/components/ui/FilterBar'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
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

  return (
    <PageContainer>
      <FilterBar
        filters={filterOptions}
        activeFilter={filter}
        onFilterChange={setFilter}
        searchValue={search}
        onSearchChange={setSearch}
        sortValue={sort}
        onSortChange={setSort}
        searchPlaceholder={searchPlaceholder}
      />
      <ProductGrid>
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </ProductGrid>
      {items.length === 0 && (
        <p className="text-ace-silver">
          No devices match your search —{' '}
          <a
            href={buildGeneralInquiryLink(emptyStateMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ace-electric hover:underline"
          >
            ask ACE on WhatsApp
          </a>.
        </p>
      )}
      <p className="text-ace-silver text-sm mt-8">{items.length} of {totalInCategory} devices shown</p>
    </PageContainer>
  )
}
