import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import CategoryListing from './CategoryListing'
import {
  getActiveSubcategories,
  getDisplayPrice,
  itemListJsonLd,
  queryProducts,
  type ProductCategory,
} from '@/lib/catalog'

/**
 * Server shell for a category listing page. All product data — the grid, the
 * filter options and the structured data — is read from the canonical catalog
 * repository, so no category page holds product records of its own.
 */
export default function CategoryPage({
  category,
  heading,
  intro,
  searchPlaceholder,
  emptyStateMessage,
}: {
  category: ProductCategory
  heading: string
  intro: string
  searchPlaceholder: string
  emptyStateMessage: string
}) {
  const products = queryProducts({ category })
  const subcategories = getActiveSubcategories(category)
  // Only list products whose price is actually published.
  const listed = products.filter(p => getDisplayPrice(p).show)
  const jsonLd = itemListJsonLd(heading, listed)

  return (
    <>
      {listed.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-3">{heading}</h1>
          <p className="text-ace-silver text-lg mb-10">{intro}</p>
        </PageContainer>
        <CategoryListing
          category={category}
          subcategories={subcategories}
          searchPlaceholder={searchPlaceholder}
          emptyStateMessage={emptyStateMessage}
        />
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
