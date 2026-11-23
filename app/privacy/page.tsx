import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ACE Electronics Ghana',
  description: 'Learn how ACE Electronics handles personal information when you browse our catalogue or contact us through WhatsApp.',
}

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-screen py-16 md:py-24">
        <PageContainer>
          <article className="mx-auto max-w-[800px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-[#0066CC]">Legal information</p>
            <h1 className="mb-2 font-heading text-[36px] font-semibold text-[#14233B] md:text-[48px]">Privacy Policy</h1>
            <p className="mb-8 text-sm text-[#77879B]">Last reviewed: 23 November 2026</p>

            <p className="leading-7 text-[#53647B]">This notice explains how ACE Electronics (“ACE”, “we”, “us”) handles personal information when you browse our website, ask about a product or contact our team. We operate a product catalogue and enquiry service; the website does not provide an online checkout.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Information you may provide</h2>
            <p className="leading-7 text-[#53647B]">If you contact us, you may choose to share your name, telephone number, WhatsApp profile details, delivery area, product interests, and the contents of your messages. Please do not send payment card details, passwords or other sensitive information through an enquiry.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">How we use information</h2>
            <ul className="list-disc space-y-2 pl-5 leading-7 text-[#53647B]">
              <li>To respond to product questions and confirm availability, prices and delivery arrangements.</li>
              <li>To provide customer support and, where you proceed with a purchase, coordinate the transaction.</li>
              <li>To maintain appropriate business records, protect the website and address misuse or security issues.</li>
              <li>To meet legal obligations where they apply.</li>
            </ul>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">WhatsApp and other service providers</h2>
            <p className="leading-7 text-[#53647B]">When you choose a WhatsApp link, you leave our website and interact with WhatsApp, operated by Meta. Meta handles information under its own terms and privacy policy. Our website is hosted by Vercel; hosting and security services may process technical information such as IP address, browser details and request logs to deliver and protect the site. Those providers operate under their own terms.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Cookies and similar technologies</h2>
            <p className="leading-7 text-[#53647B]">We have not identified an analytics or advertising tracker in the storefront code reviewed for this policy. The website or its hosting provider may use strictly necessary technical storage or similar technologies for security and reliable operation. See our <a className="text-[#0066CC] hover:underline" href="/cookies">Cookie Notice</a>. If optional analytics, advertising tools or additional integrations are introduced, this notice will be updated before they are used.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Sharing and retention</h2>
            <p className="leading-7 text-[#53647B]">We do not sell personal information. Information may be handled by service providers where needed to operate communications, hosting or customer support, or disclosed where required by law. We keep enquiry and transaction information only for as long as reasonably needed for the purpose collected, legitimate business records, dispute handling and legal requirements. Actual retention periods depend on the record and applicable obligations.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Your choices and requests</h2>
            <p className="leading-7 text-[#53647B]">You may choose not to provide personal information, although we may then be unable to respond to an enquiry or arrange a requested service. You can contact us to ask about information associated with your enquiry or to request correction or deletion, subject to applicable legal and record-keeping requirements.</p>

            <h2 className="mt-8 mb-3 font-heading text-xl font-semibold text-[#14233B]">Contact</h2>
            <p className="leading-7 text-[#53647B]">For privacy questions, contact ACE Electronics at <a className="text-[#0066CC] hover:underline" href="https://wa.me/233547981348">+233 54 798 1348 on WhatsApp</a>.</p>

            <p className="mt-8 text-xs leading-6 text-[#77879B]">This website notice describes the storefront's current enquiry-led setup. ACE must keep it aligned with its actual business processes, service providers and data practices. It is not a substitute for advice from a Ghanaian data-protection professional.</p>
          </article>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
