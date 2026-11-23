import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns and Refunds Policy | ACE Electronics Ghana',
  description: 'How to contact ACE Electronics about a product concern, return, exchange or refund.',
}

export default function ReturnsPage() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-16 md:py-24">
        <PageContainer>
          <article className="mx-auto max-w-[800px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#0066CC]">Customer information</p>
            <h1 className="mb-2 font-heading text-[36px] font-semibold text-[#14233B] md:text-[48px]">Returns and Refunds</h1>
            <p className="mb-8 text-sm text-[#77879B]">Last reviewed: 23 November 2026</p>

            <p className="leading-7 text-[#53647B]">ACE Electronics currently handles product enquiries and sales directly with customers rather than through website checkout. Because products and their condition can differ, please confirm the applicable return, exchange and warranty terms for the specific item before completing a purchase.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">If something is wrong with your order</h2>
            <ol className="list-decimal space-y-2 pl-5 leading-7 text-[#53647B]">
              <li>Contact ACE as soon as reasonably possible using the WhatsApp link below.</li>
              <li>Share your order or purchase details, the device model and a clear description of the issue. Photos or a short video may help us understand the concern.</li>
              <li>Please keep the device, packaging and included accessories while the concern is being reviewed. Avoid attempting repairs or alterations before speaking with ACE.</li>
              <li>ACE will review the information and explain the available next steps based on the item, the terms confirmed at purchase and applicable consumer rights.</li>
            </ol>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Returns, exchanges and refunds</h2>
            <p className="leading-7 text-[#53647B]">A return, exchange, repair or refund is not automatic and will depend on the circumstances, the condition of the item, any terms agreed at purchase and applicable law. Contact ACE before sending or bringing an item back so that the correct process and arrangements can be confirmed. Nothing in this policy is intended to remove rights you may have under applicable Ghanaian law.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Check before you buy</h2>
            <p className="leading-7 text-[#53647B]">Before paying, ask ACE to confirm the exact model, whether it is new or pre-owned, its cosmetic and working condition, included accessories, warranty coverage, final price and delivery arrangements. Keep the written confirmation and proof of payment.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Contact ACE</h2>
            <p className="mb-5 leading-7 text-[#53647B]">Start a return or product-support enquiry through our official WhatsApp number. Please include your purchase details so the team can assist.</p>
            <ButtonWhatsApp text="Hello ACE, I need help with a product I purchased.">Contact ACE about a product</ButtonWhatsApp>

            <p className="mt-8 text-xs leading-6 text-[#77879B]">ACE should publish specific return windows, collection arrangements and refund timelines only after confirming that these match its actual operations and legal obligations. This page is not a substitute for legal advice.</p>
          </article>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
