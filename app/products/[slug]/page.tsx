import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ProductGallery from '@/components/products/ProductGallery'
import ProductBadges from '@/components/products/ProductBadges'
import { BadgeCheck, Package } from '@/components/ui/IconSet'
import {
  breadcrumbJsonLd,
  buildInquiryMessage,
  getAllProducts,
  getAvailabilityLabel,
  getCategoryDefinition,
  getConditionLabel,
  getDisplayPrice,
  getPrimaryImageUrl,
  getProductPath,
  getProductReference,
  getRelatedProducts,
  getSpecifications,
  getSpecSummary,
  getSubcategoryLabel,
  isPurchasable,
  productJsonLd,
  resolveProduct,
  type Product,
} from '@/lib/catalog'

/** Pre-render one page per live product, addressed by its current slug. */
export function generateStaticParams() {
  return getAllProducts().map(p => ({ slug: p.slug }))
}

/**
 * Slugs outside generateStaticParams are still rendered on demand so that
 * permanent-ID links (and freshly added products) resolve — resolveProduct
 * below decides between a redirect and a real 404.
 */
export const dynamicParams = true

// NOTE: this segment deliberately has NO loading.tsx. A loading boundary makes
// Next stream the response, which commits HTTP 200 before notFound() /
// permanentRedirect() run — unresolvable slugs would then return "200 soft
// 404" and ID links would render instead of redirecting. Product pages are
// statically prerendered, so there is nothing to wait on anyway.

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = resolveProduct(params.slug)
  if (!product) return { title: 'Product not found' }
  const specs = getSpecSummary(product)
  const image = getPrimaryImageUrl(product)
  return {
    // The root layout appends '| ACE Electronics', so don't repeat the brand.
    title: `${product.name}${specs ? ` – ${specs}` : ''}`,
    description: product.description,
    alternates: { canonical: getProductPath(product) },
    openGraph: {
      title: `${product.name} | ACE Electronics`, // OG titles are standalone
      description: product.description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
  }
}

function Crumb({ href, label, current }: { href?: string; label: string; current?: boolean }) {
  const cls = current ? 'text-ace-white' : 'text-ace-silver hover:text-ace-electric transition-colors'
  if (current) return <span className={`${cls} max-w-full truncate`} aria-current="page">{label}</span>
  return <Link href={href ?? '/'} className={cls}>{label}</Link>
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // Accepts the current slug OR the permanent internal ID, so links shared
  // before a re-slug (and every past WhatsApp inquiry) keep resolving.
  // Permanent-ID URLs are redirected to the canonical slug by middleware.ts
  // before they reach this component, so anything that doesn't resolve to a
  // live product here is a genuine 404.
  const product: Product | undefined = resolveProduct(params.slug)
  if (!product || product.slug !== params.slug) notFound()

  const dp = getDisplayPrice(product)
  const category = getCategoryDefinition(product)
  const specs = getSpecifications(product)
  const related = getRelatedProducts(product, 4)
  const condition = getConditionLabel(product)
  const subcategory = getSubcategoryLabel(product)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(product)) }} />

      <NavBar />
      <main id="main" className="py-12 md:py-20">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="text-sm mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-ace-silver min-w-0">
            <Crumb href="/" label="Home" />
            <span aria-hidden="true">/</span>
            <Crumb href={category.href} label={category.label} />
            <span aria-hidden="true">/</span>
            <Crumb label={product.name} current />
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="ace-glass overflow-hidden">
              <ProductGallery product={product} controls="always" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>

            <div>
              <h1 className="font-heading text-[26px] xs:text-[30px] md:text-[40px] font-semibold text-ace-white leading-tight tracking-tight break-words">{product.name}</h1>
              <p className="text-ace-silver text-lg mt-3">{getSpecSummary(product)}</p>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                {subcategory && (
                  <span className="inline-flex items-center rounded-full bg-ace-electric/10 border border-ace-electric/25 text-ace-electric px-3 py-1.5 font-medium">{subcategory}</span>
                )}
                <span className="inline-flex items-center rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">{category.singular}</span>
                <span className="inline-flex items-center rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">
                  {getAvailabilityLabel(product)}
                </span>
                {condition && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">
                    <Package size={12} /> {condition}
                  </span>
                )}
                {product.warranty && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">
                    <BadgeCheck size={12} className="text-ace-electric" /> {product.warranty}
                  </span>
                )}
              </div>

              <ProductBadges badges={product.badges} className="mt-4" />

              {product.notes && (
                <p className="mt-5 inline-flex items-center rounded-lg bg-ace-black/60 border border-ace-glass-border px-3 py-2 text-ace-silver text-sm">
                  {product.notes}
                </p>
              )}

              <p className="mt-6 text-ace-white text-2xl font-semibold">
                {dp.show && dp.formatted ? (
                  <>
                    {dp.formattedWas && (
                      <span className="text-ace-silver line-through text-base font-normal mr-2">{dp.formattedWas}</span>
                    )}
                    {dp.formatted}
                  </>
                ) : (
                  dp.fallbackLabel
                )}
              </p>

              {product.description && (
                <p className="text-ace-silver text-base mt-5 leading-relaxed max-w-prose">{product.description}</p>
              )}

              {specs.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-heading text-lg font-semibold text-ace-white mb-3">Specifications</h2>
                  <dl className="ace-glass divide-y divide-ace-glass-border overflow-hidden">
                    {specs.map(s => (
                      <div key={s.id} className="grid grid-cols-1 sm:grid-cols-[minmax(0,10rem)_1fr] gap-x-4 gap-y-0.5 px-4 py-3 text-sm">
                        <dt className="text-ace-silver">{s.label}</dt>
                        <dd className="text-ace-white break-words min-w-0">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonWhatsApp size="lg" text={buildInquiryMessage(product)}>Enquire on WhatsApp</ButtonWhatsApp>
                <Link href={category.href} className="inline-flex items-center justify-center px-9 py-[18px] rounded-full font-body font-medium text-ace-white border border-ace-glass-border transition-all duration-200 hover:bg-ace-glass-hover hover:border-black/20">
                  Back to {category.label}
                </Link>
              </div>

              <p className="text-ace-silver text-sm mt-6 leading-relaxed max-w-md">
                Quote <span className="text-ace-white font-medium">{getProductReference(product)}</span> when you message us — it identifies this exact product.
                {' '}Representative image shown. Message ACE on WhatsApp for current photos of the exact unit, stock, and delivery across Ghana.
                {!condition && ' Condition is confirmed on WhatsApp before purchase.'}
                {!isPurchasable(product) && ` This product is currently ${getAvailabilityLabel(product).toLowerCase()}.`}
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ace-white mb-8">
                More {category.label.toLowerCase()} you might like
              </h2>
              <ProductGrid>
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </ProductGrid>
            </section>
          )}
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
