import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ACE Electronics Ghana',
  description: 'How ACE Electronics handles your personal data. Name, WhatsApp number, and inquiry messages only – no data sales, no tracking beyond standard analytics.',
}

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <div className="max-w-[800px]">
            <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-2">Privacy Policy</h1>
            <p className="text-ace-silver text-sm mb-8">Last updated: June 2026</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">What data we collect</h2>
            <p className="text-ace-silver leading-relaxed">When you contact ACE Electronics via WhatsApp, we collect: your name, your phone/WhatsApp number, and the content of your messages. That&apos;s it. This website does not require accounts, does not store payment information, and does not use advertising or analytics tracking cookies.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">How we use your data</h2>
            <ul className="text-ace-silver space-y-2 list-disc pl-5">
              <li>To respond to your product inquiries and fulfill orders</li>
              <li>To provide customer support via WhatsApp</li>
              <li>To improve our product catalog and service</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">What we don&apos;t do</h2>
            <ul className="text-ace-silver space-y-2 list-disc pl-5">
              <li>We do not sell your personal data to third parties</li>
              <li>We do not process payments on this website – all transactions are handled directly via WhatsApp</li>
              <li>We do not use advertising tracking pixels unless disclosed</li>
            </ul>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">Data retention</h2>
            <p className="text-ace-silver leading-relaxed">WhatsApp conversation history is retained per WhatsApp&apos;s own policies and for our order record-keeping.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">Your rights</h2>
            <p className="text-ace-silver leading-relaxed">You can request deletion of your contact information at any time by messaging ACE on WhatsApp at +233 547 981 348.</p>

            <h2 className="font-heading text-2xl font-semibold text-ace-white mt-8 mb-3">Contact</h2>
            <p className="text-ace-silver">Privacy questions? WhatsApp ACE Electronics: +233 547 981 348</p>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
