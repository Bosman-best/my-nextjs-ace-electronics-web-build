import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of use for ACE Electronics – inquiry-only e-commerce, WhatsApp sales, pricing, and third-party retailer disclosure.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <div className="max-w-[800px]">
            <h1 className="font-heading text-[32px] xs:text-[36px] md:text-[48px] font-semibold text-ace-white tracking-tight mb-2">Terms of Service</h1>
            <p className="text-ace-silver text-sm mb-8">Last updated: September 2026</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">1. Inquiry-only website</h2>
            <p className="text-ace-silver leading-relaxed">This website (the &quot;Site&quot;) is a product catalog and inquiry platform only. No checkout, cart, or online payment processing occurs on this website. All sales are finalized directly via WhatsApp with ACE Electronics (+233 547 981 348).</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">2. Third-party retailer disclosure</h2>
            <p className="text-ace-silver leading-relaxed">ACE Electronics is an independent third-party electronics retailer, not a manufacturer, and not affiliated with Apple, Samsung, HP, Google, Lenovo, Dell, or any brand shown on this site. All trademarks are property of their respective owners. Product names and images are used for identification only.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">3. Pricing</h2>
            <p className="text-ace-silver leading-relaxed">Prices displayed on this site are in Ghana Cedis (GHS) and are subject to change without notice due to exchange rate fluctuations and supplier availability. Final price is always confirmed via WhatsApp before purchase. Products priced above GHS 5,000 are listed as &quot;Ask on WhatsApp&quot; – contact ACE for current pricing.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">4. Product condition</h2>
            <p className="text-ace-silver leading-relaxed">Condition grades (Brand New Sealed / 99.99% Clean / Fairly Used) are defined in our <a href="/warranty" className="text-ace-electric hover:underline">Warranty Policy</a>. Condition is confirmed via WhatsApp with photos on request before purchase.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">5. Warranty</h2>
            <p className="text-ace-silver leading-relaxed">Warranty terms are as stated in our <a href="/warranty" className="text-ace-electric hover:underline">Warranty Policy</a>. Manufacturer warranties, where applicable, are subject to the manufacturer&apos;s own terms and are separate from ACE Electronics&apos; seller warranty.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">6. Limitation of liability</h2>
            <p className="text-ace-silver leading-relaxed">ACE Electronics provides product information in good faith from verified suppliers. To the extent permitted by Ghanaian law, we are not liable for indirect or consequential damages arising from use of products sold.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">7. Contact</h2>
            <p className="text-ace-silver">Questions about these terms? WhatsApp ACE Electronics: +233 547 981 348</p>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
