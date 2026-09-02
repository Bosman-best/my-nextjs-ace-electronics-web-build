'use client'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { WHATSAPP_LINK } from '@/lib/utils'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <NavBar />
      <main id="main" className="min-h-[60vh] flex items-center py-16 md:py-24">
        <PageContainer className="text-center">
          <p className="font-heading text-[64px] md:text-[88px] font-bold text-ace-electric leading-none">Oops</p>
          <h1 className="font-heading text-[28px] md:text-[36px] font-semibold text-ace-white mt-4">Something went wrong</h1>
          <p className="text-ace-silver text-lg mt-3 max-w-[480px] mx-auto">
            We hit an unexpected problem while loading this page. Please try again — or message ACE on WhatsApp and we&apos;ll help right away.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonPrimary onClick={reset}>Try Again</ButtonPrimary>
            <ButtonSecondary href={WHATSAPP_LINK("Hi ACE, I'm having trouble loading your website.")} target="_blank">Chat on WhatsApp</ButtonSecondary>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
