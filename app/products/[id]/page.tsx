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
import { BadgeCheck, Package } from '@/components/ui/IconSet'
import { SITE_URL } from '@/lib/site'
import {
  ALL_PRODUCTS,
  getProductById,
  getRelatedProducts,
  getDisplayPrice,
  formatGHS,
  whatsappText,
  type Product,
} from '@/lib/products'

export function generateStaticParams() {
  return ALL_PRODUCTS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductById(params.id)
  if (!product) return { title: 'Product not found | ACE Electronics' }
  return {
    title: `${product.name} – ${product.specs} | ACE Electronics Ghana`,
    description: `${product.name} (${product.specs}) for sale in Ghana from ACE Electronics. Contact us on WhatsApp for stock, condition and pricing.`,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      title: `${product.name} | ACE Electronics`,
      description: `${product.specs} — available via ACE Electronics Ghana.`,
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
  }
}

const CONDITION_TO_SCHEMA: Record<string, string> = {
  'Brand New Sealed': 'https://schema.org/NewCondition',
  '99.99% Clean': 'https://schema.org/UsedCondition',
  'Fairly Used': 'https://schema.org/UsedCondition',
  'UK Used': 'https://schema.org/UsedCondition',
}

function Crumb({ href, label, current }: { href?: string; label: string; current?: boolean }) {
  const cls = current ? 'text-ace-white' : 'text-ace-silver hover:text-ace-electric transition-colors'
  if (current) return <span className={cls} aria-current="page">{label}</span>
  return <Link href={href ?? '/'} className={cls}>{label}</Link>
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product: Product | undefined = getProductById(params.id)
  if (!product) notFound()

  const dp = getDisplayPrice(product)
  const categoryHref = product.type === 'laptop' ? '/laptops' : '/smartphones'
  const categoryLabel = product.type === 'laptop' ? 'Laptops' : 'Smartphones'
  const related = getRelatedProducts(product, 4)

  // Product structured data — only include an Offer when a real display price exists.
  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.specs,
    sku: product.id,
    category: product.category,
    image: product.image,
    brand: { '@type': 'Brand', name: product.brand },
    ...(product.condition ? { itemCondition: CONDITION_TO_SCHEMA[product.condition] } : {}),
    ...(dp.show && dp.price ? {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: dp.price,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'ACE Electronics' },
      },
    } : {}),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: categoryLabel, item: `${SITE_URL}${categoryHref}` },
      { '@type': 'ListItem', position: 3, name: product.name },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <NavBar />
      <main className="py-12 md:py-20">
        <PageContainer>
          <nav aria-label="Breadcrumb" className="text-sm mb-8 flex flex-wrap items-center gap-2 text-ace-silver">
            <Crumb href="/" label="Home" />
            <span aria-hidden="true">/</span>
            <Crumb href={categoryHref} label={categoryLabel} />
            <span aria-hidden="true">/</span>
            <Crumb label={product.name} current />
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="ace-glass overflow-hidden">
              <ProductGallery product={product} controls="always" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>

            <div>
              <h1 className="font-heading text-[30px] md:text-[40px] font-semibold text-ace-white leading-tight">{product.name}</h1>
              <p className="text-ace-silver text-lg mt-3">{product.specs}</p>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
                <span className="inline-flex items-center rounded-full bg-ace-electric/10 border border-ace-electric/25 text-ace-electric px-3 py-1.5 font-medium">{product.category}</span>
                <span className="inline-flex items-center rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">{categoryLabel.replace(/s$/, '')}</span>
                {product.condition && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">
                    <Package size={12} /> {product.condition}
                  </span>
                )}
                {product.warranty && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ace-glass border border-ace-glass-border text-ace-silver px-3 py-1.5">
                    <BadgeCheck size={12} className="text-ace-electric" /> {product.warranty}
                  </span>
                )}
              </div>

              {product.notes && (
                <p className="mt-5 inline-flex items-center rounded-lg bg-ace-black/60 border border-ace-glass-border px-3 py-2 text-ace-silver text-sm">
                  {product.notes}
                </p>
              )}

              <p className="mt-6 text-ace-white text-2xl font-semibold">
                {dp.show && dp.price ? (
                  <>
                    {dp.wasPrice && (
                      <span className="text-ace-silver line-through text-base font-normal mr-2">{formatGHS(dp.wasPrice)}</span>
                    )}
                    {formatGHS(dp.price)}
                  </>
                ) : (
                  'Ask on WhatsApp'
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonWhatsApp size="lg" text={whatsappText(product)}>Enquire on WhatsApp</ButtonWhatsApp>
                <Link href={categoryHref} className="inline-flex items-center justify-center px-9 py-[18px] rounded-full font-body font-medium text-ace-white border border-ace-glass-border transition-all duration-200 hover:bg-ace-glass-hover hover:border-black/20">
                  Back to {categoryLabel}
                </Link>
              </div>

              <p className="text-ace-silver text-sm mt-6 leading-relaxed max-w-md">
                Representative image shown. Message ACE on WhatsApp for current photos of the exact unit, stock, and delivery across Ghana.
                {!product.condition && ' Condition is confirmed on WhatsApp before purchase.'}
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-20 md:mt-28">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ace-white mb-8">
                More {product.type === 'laptop' ? 'laptops' : 'phones'} you might like
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
