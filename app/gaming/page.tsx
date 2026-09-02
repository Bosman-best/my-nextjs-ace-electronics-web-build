import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ProductGrid from '@/components/ui/ProductGrid'
import ProductCard from '@/components/cards/ProductCard'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { queryProducts } from '@/lib/catalog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gaming Devices Ghana – Gaming Laptops, Consoles | ACE Electronics',
  description: 'Gaming-ready laptops in stock in Accra, Ghana. Consoles, controllers and gaming gear available on request — message ACE on WhatsApp for current availability.',
}

export default function Page() {
  // Gaming-ready laptops come from the canonical catalog via controlled values.
  const gamingLaptops = queryProducts({ category: 'laptops', subcategory: 'gaming' })
  return (
    <>
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-3">Gaming Devices</h1>
          <p className="text-ace-silver text-lg mb-10">Gaming-ready laptops in stock, plus consoles and gear on request — sourced from verified suppliers.</p>

          {gamingLaptops.length > 0 && (
            <section className="mb-16">
              <h2 className="font-heading text-2xl font-semibold text-ace-white mb-6">Gaming-ready laptops in stock</h2>
              <ProductGrid>
                {gamingLaptops.map(p => <ProductCard key={p.id} product={p} />)}
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
