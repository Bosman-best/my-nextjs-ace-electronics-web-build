import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { getDisplayPrice, itemListJsonLd, queryProducts } from '@/lib/catalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gaming Devices Ghana – Gaming Laptops, Consoles',
  description: 'Gaming-ready laptops in stock in Accra, Ghana. Consoles, controllers and gaming gear available on request — message ACE on WhatsApp for current availability.',
  alternates: { canonical: '/gaming' },
}

export default function Page() {
    // Gaming-ready laptops plus anything filed under the dedicated gaming
    // category — all from the canonical catalog via controlled values.
  const gamingLaptops = queryProducts({ category: 'laptops', subcategory: 'gaming' })
  const gamingDevices = queryProducts({ category: 'gaming' })
  const all = [...gamingDevices, ...gamingLaptops]
  const listed = all.filter(p => getDisplayPrice(p).show)
  return (
    <>
      {listed.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd('Gaming Devices', listed)) }}
        />
      )}
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[32px] xs:text-[32px] xs:text-[36px] md:text-[48px] font-semibold text-ace-white tracking-tight mb-3 tracking-tight">Gaming Devices</h1>
          <p className="text-ace-silver text-base md:text-lg mb-10 max-w-[70ch]">Gaming-ready laptops in stock, plus consoles and gear on request — sourced from verified suppliers.</p>

          {all.length > 0 && (
            <section className="mb-16">
              <h2 className="font-heading text-2xl font-semibold text-ace-white mb-6">Gaming-ready devices in stock</h2>
              <ProductGrid>
                {all.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
              </ProductGrid>
            </section>
          )}

          <div className="ace-glass p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ace-white">Looking for a console, controller or gaming gear?</h2>
            <p className="text-ace-silver text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mt-4">
              Consoles, controllers, headsets and other gaming accessories aren&apos;t listed in the catalog yet. Message ACE on WhatsApp and we&apos;ll confirm current availability and pricing.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonWhatsApp text="Hi ACE, I'm looking for gaming devices. What's available?">Ask About Gaming Gear on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
