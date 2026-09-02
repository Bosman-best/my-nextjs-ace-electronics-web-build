import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { buildGeneralInquiryLink } from '@/lib/catalog'

/** Shown when a product slug/ID doesn't resolve to a live catalog record. */
export default function ProductNotFound() {
  return (
    <>
      <NavBar />
      <main id="main" className="min-h-[60vh] flex items-center py-16 md:py-24">
        <PageContainer className="text-center">
          <p className="font-heading text-[64px] md:text-[88px] font-bold text-ace-electric leading-none">404</p>
          <h1 className="font-heading text-[26px] xs:text-[30px] md:text-[40px] font-semibold text-ace-white mt-4 tracking-tight">
            This product isn&apos;t available
          </h1>
          <p className="text-ace-silver text-base md:text-lg mt-3 max-w-[520px] mx-auto leading-relaxed">
            It may have sold out or been retired from the catalog. Browse what&apos;s in stock now, or ask ACE — we can often source it.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonPrimary href="/laptops">Browse Laptops</ButtonPrimary>
            <ButtonSecondary href="/smartphones">Browse Smartphones</ButtonSecondary>
          </div>
          <p className="text-ace-silver text-sm mt-8">
            Looking for something specific?{' '}
            <a
              href={buildGeneralInquiryLink("Hi ACE, I was looking at a product on your site that's no longer listed. Can you help me find it?")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ace-electric hover:underline font-medium"
            >
              Ask ACE on WhatsApp
            </a>{' '}
            or go <Link href="/" className="text-ace-electric hover:underline font-medium">home</Link>.
          </p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
