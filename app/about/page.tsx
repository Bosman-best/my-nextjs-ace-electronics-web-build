import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import BrandStoryBlock from '@/components/sections/BrandStoryBlock'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ACE Electronics – Trusted Tech Plug Ghana',
  description: 'ACE Electronics – making quality tech accessible in Ghana and beyond. Authentic laptops and smartphones from verified suppliers, fast WhatsApp support.',
}

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <BrandStoryBlock />
          <div className="mt-10 max-w-[900px] mx-auto">
            <h3 className="font-heading text-2xl font-semibold text-[#1D1D1F] mb-4">Why ACE?</h3>
            <ul className="text-[#6E6E73] space-y-2 text-lg">
              <li>• Authentic Devices Only — Verified suppliers</li>
              <li>• Expert Advice — We help you choose right</li>
              <li>• Fast WhatsApp Support — Response in minutes</li>
              <li>• Transparent Pricing — No hidden fees</li>
            </ul>
          </div>
          <div className="mt-8 max-w-[900px] mx-auto">
            <ButtonWhatsApp text="Hi ACE, tell me more about your store.">Talk to an Expert</ButtonWhatsApp>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
