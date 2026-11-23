import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Terms | ACE Electronics Ghana',
  description: 'Terms for using the ACE Electronics Ghana product catalogue and WhatsApp enquiry service.',
}

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-16 md:py-24">
        <PageContainer>
          <article className="mx-auto max-w-[800px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#0066CC]">Legal information</p>
            <h1 className="mb-2 font-heading text-[36px] font-semibold text-[#14233B] md:text-[48px]">Website Terms</h1>
            <p className="mb-8 text-sm text-[#77879B]">Last reviewed: 23 November 2026</p>

            <p className="leading-7 text-[#53647B]">These terms apply to your use of the ACE Electronics website (“ACE”, “we”, “us”). The website is a product catalogue and enquiry channel. It does not currently provide a shopping cart or online checkout.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">1. Product listings and enquiries</h2>
            <p className="leading-7 text-[#53647B]">Product descriptions, photographs, specifications, displayed prices and availability are provided as catalogue information and may change. An enquiry or message sent through the website or WhatsApp is not, by itself, confirmation that an item is reserved or that a sale has been concluded. Please obtain confirmation of the exact model, condition, included accessories, current price, availability and delivery arrangements from ACE before paying.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">2. Prices and payment</h2>
            <p className="leading-7 text-[#53647B]">Prices are displayed in Ghana cedis where shown. The final price, payment method, delivery fee and payment timing must be confirmed directly with ACE before an order is accepted. Do not send payment to an account or number unless ACE has confirmed it through an official communication channel. No payment is processed by this website.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">3. Product condition and warranty</h2>
            <p className="leading-7 text-[#53647B]">The condition and any warranty applicable to a particular device should be confirmed in writing before purchase. Warranty coverage can vary by item. See our <a className="text-[#0066CC] hover:underline" href="/warranty">Warranty Information</a> page and ask ACE to confirm the terms for the specific device. Nothing in these terms removes rights that cannot lawfully be excluded.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">4. Returns and refunds</h2>
            <p className="leading-7 text-[#53647B]">Please read our <a className="text-[#0066CC] hover:underline" href="/returns">Returns and Refunds Policy</a>. Any product-specific return, exchange or warranty arrangement should be confirmed with ACE. These terms do not limit any consumer rights that apply under Ghanaian law.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">5. Intellectual property and brand names</h2>
            <p className="leading-7 text-[#53647B]">ACE website content, layout and original materials belong to ACE or their respective rights holders. Product names and third-party trademarks are used to identify products; they remain the property of their respective owners. ACE is an independent retailer and is not the manufacturer of the products listed unless expressly stated.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">6. Website use</h2>
            <p className="leading-7 text-[#53647B]">You agree not to misuse the website, attempt unauthorised access, interfere with its operation or use its content for unlawful purposes. We may update, suspend or remove catalogue information or website features as needed.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">7. Contact</h2>
            <p className="leading-7 text-[#53647B]">For questions about these terms, contact ACE Electronics at <a className="text-[#0066CC] hover:underline" href="https://wa.me/233547981348">+233 54 798 1348 on WhatsApp</a>.</p>

            <p className="mt-8 text-xs leading-6 text-[#77879B]">These website terms are a practical starting point, not a legal opinion. They should be checked against ACE's actual sales, delivery, warranty and consumer-protection practices before launch.</p>
          </article>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
