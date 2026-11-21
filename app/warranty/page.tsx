import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warranty Information | ACE Electronics Ghana',
  description: 'Contact ACE Electronics to confirm the warranty coverage and terms for a specific device before purchase.',
}

export default function WarrantyPage() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-16 md:py-24">
        <PageContainer>
          <div className="mx-auto max-w-[800px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#0066CC]">Customer information</p>
            <h1 className="mb-6 font-heading text-[36px] font-semibold text-[#14233B] md:text-[48px]">Warranty information</h1>
            <p className="mb-8 text-lg leading-8 text-[#53647B]">
              Warranty coverage can differ by device. Please confirm the exact coverage, duration and conditions with ACE before completing a purchase.
            </p>

            <section className="rounded-[22px] border border-[#E2E9F2] bg-white p-6 md:p-8">
              <h2 className="font-heading text-xl font-semibold text-[#14233B]">Before you buy</h2>
              <p className="mt-3 text-sm leading-7 text-[#53647B]">
                Ask us to confirm the warranty terms for the specific device you are considering. Any applicable coverage and its conditions should be clearly communicated before you decide.
              </p>
            </section>

            <section className="mt-5 rounded-[22px] border border-[#E2E9F2] bg-white p-6 md:p-8">
              <h2 className="font-heading text-xl font-semibold text-[#14233B]">Need help with a warranty question?</h2>
              <p className="mt-3 text-sm leading-7 text-[#53647B]">
                Message ACE with the device name and your purchase details, if applicable. Our team can help clarify the terms that were confirmed for that device.
              </p>
              <div className="mt-6">
                <ButtonWhatsApp text="Hi ACE, I would like to confirm the warranty terms for a device.">Ask ACE about warranty</ButtonWhatsApp>
              </div>
            </section>

            <p className="mt-7 text-xs leading-6 text-[#77879B]">
              Do not assume that a manufacturer warranty or a particular warranty period applies unless it has been expressly confirmed for your device.
            </p>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
