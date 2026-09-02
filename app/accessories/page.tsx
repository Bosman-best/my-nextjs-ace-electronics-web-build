import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { CATEGORY_DEFINITIONS, SUBCATEGORY_LABELS, itemListJsonLd, getDisplayPrice, queryProducts } from '@/lib/catalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessories Ghana – Chargers, Cases, Headphones',
  description: 'Phone and laptop accessories in Accra, Ghana — headphones, chargers, cases and more. Chat with ACE on WhatsApp for current availability.',
  alternates: { canonical: '/accessories' },
}

// Browse tiles are derived from the controlled accessory subcategories, so the
// page and the catalog can never disagree about what an accessory can be.
const SUBCATEGORY_EMOJI: Record<string, string> = {
  audio: '🎧',
  power: '🔋',
  protection: '📱',
  wearables: '⌚',
  bags: '🎒',
}

export default function Page() {
  // Accessories currently have no catalog records. As soon as the admin adds
  // them they render here automatically — no code change required.
  const accessories = queryProducts({ category: 'accessories' })
  const listed = accessories.filter(p => getDisplayPrice(p).show)
  const tiles = CATEGORY_DEFINITIONS.accessories.subcategories

  return (
    <>
      {listed.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd('Accessories', listed)) }}
        />
      )}
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[32px] xs:text-[32px] xs:text-[36px] md:text-[48px] font-semibold text-ace-white tracking-tight mb-3 tracking-tight">Accessories</h1>
          <p className="text-ace-silver text-base md:text-lg mb-10 max-w-[70ch]">
            Extras for your phone or laptop — message ACE on WhatsApp and we&apos;ll confirm what&apos;s in stock.
          </p>

          {accessories.length > 0 ? (
            <section className="mb-16">
              <h2 className="font-heading text-2xl font-semibold text-ace-white mb-6">Accessories in stock</h2>
              <ProductGrid>
                {accessories.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
              </ProductGrid>
            </section>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
              {tiles.map(s => (
                <div key={s} className="ace-glass p-6 md:p-8 flex items-center gap-4 min-h-[104px]">
                  <span className="text-4xl leading-none" aria-hidden="true">{SUBCATEGORY_EMOJI[s] ?? '📦'}</span>
                  <span className="font-heading text-base md:text-lg font-medium text-ace-white">{SUBCATEGORY_LABELS[s]}</span>
                </div>
              ))}
            </div>
          )}

          <div className="ace-glass p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ace-white">Ask what&apos;s in stock</h2>
            <p className="text-ace-silver text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mt-4">
              Accessories change week to week. Tell us your device and what you need — we&apos;ll confirm availability and pricing on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonWhatsApp text="Hi ACE, I'm looking for accessories. What's in stock?">Ask About Accessories on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
