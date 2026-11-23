import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Notice | ACE Electronics Ghana',
  description: 'Information about cookies and similar technologies on the ACE Electronics website.',
}

export default function CookieNoticePage() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-16 md:py-24">
        <PageContainer>
          <article className="mx-auto max-w-[800px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#0066CC]">Legal information</p>
            <h1 className="mb-2 font-heading text-[36px] font-semibold text-[#14233B] md:text-[48px]">Cookie Notice</h1>
            <p className="mb-8 text-sm text-[#77879B]">Last reviewed: 23 November 2026</p>

            <p className="leading-7 text-[#53647B]">Cookies are small files that a website or a service it uses may place on your browser or device. Similar technologies can store or read limited technical information.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">What the ACE website currently uses</h2>
            <p className="leading-7 text-[#53647B]">Our current storefront is a product catalogue with WhatsApp enquiry links. In the code reviewed for this notice, we did not identify Google Analytics, advertising pixels or a separate marketing-cookie integration. Our hosting and security provider may use strictly necessary technical technologies to deliver, protect and troubleshoot the website.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">WhatsApp links</h2>
            <p className="leading-7 text-[#53647B]">If you choose to open WhatsApp, you leave the ACE website and use a third-party service. WhatsApp may use its own cookies and technologies under Meta's policies; ACE does not control those technologies.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Your browser controls</h2>
            <p className="leading-7 text-[#53647B]">Most browsers let you view, block or delete cookies through their privacy settings. Blocking all cookies or site storage may affect how some websites function. You can still browse the ACE catalogue without opening WhatsApp.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Changes</h2>
            <p className="leading-7 text-[#53647B]">If ACE adds analytics, advertising, embedded media or other optional tracking tools, this notice will be updated and any required choices will be provided before those technologies are used.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Contact</h2>
            <p className="leading-7 text-[#53647B]">For questions about this notice, contact ACE Electronics at <a className="text-[#0066CC] hover:underline" href="https://wa.me/233547981348">+233 54 798 1348 on WhatsApp</a>.</p>
          </article>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
