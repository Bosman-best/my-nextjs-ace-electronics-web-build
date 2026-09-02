import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import BrandStoryBlock from '@/components/sections/BrandStoryBlock'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About ACE — Trusted Tech Plug in Ghana',
  description: 'ACE Electronics – making quality tech accessible in Ghana and beyond. Authentic laptops and smartphones from verified suppliers, fast WhatsApp support.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <BrandStoryBlock as="h1" />
          <div className="mt-10">
            <h2 className="font-heading text-2xl font-semibold text-ace-white mb-4">Why ACE?</h2>
            <ul className="text-ace-silver space-y-2 text-lg">
              <li>• Authentic Devices Only — Verified suppliers</li>
              <li>• Expert Advice — We help you choose right</li>
              <li>• Fast WhatsApp Support — Response in minutes</li>
              <li>• Transparent Pricing — No hidden fees</li>
            </ul>
          </div>
          <div className="mt-8">
            <ButtonWhatsApp text="Hi ACE, tell me more about your store.">Talk to an Expert</ButtonWhatsApp>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
