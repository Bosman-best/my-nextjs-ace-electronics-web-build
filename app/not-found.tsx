import Link from 'next/link'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import { WHATSAPP_LINK } from '@/lib/utils'

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main className="min-h-[60vh] flex items-center py-16 md:py-24">
        <PageContainer className="text-center">
          <p className="font-heading text-[80px] md:text-[120px] font-bold text-ace-electric leading-none">404</p>
          <h1 className="font-heading text-[28px] md:text-[40px] font-semibold text-ace-white mt-4">Page not found</h1>
          <p className="text-ace-silver text-lg mt-3 max-w-[480px] mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back to the devices.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonPrimary href="/laptops">Browse Laptops</ButtonPrimary>
            <ButtonSecondary href="/smartphones">Browse Smartphones</ButtonSecondary>
          </div>
          <p className="text-ace-silver text-sm mt-8">
            Looking for something specific? <a href={WHATSAPP_LINK("Hi ACE, I couldn't find something on your site.")} target="_blank" rel="noopener noreferrer" className="text-ace-electric hover:underline font-medium">Chat with ACE on WhatsApp</a> or go{' '}
            <Link href="/" className="text-ace-electric hover:underline font-medium">home</Link>.
          </p>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
