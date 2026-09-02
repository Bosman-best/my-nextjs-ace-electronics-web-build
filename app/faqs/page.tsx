import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs – Laptops & Smartphones Ghana',
  description: 'Frequently asked questions about buying laptops and smartphones from ACE Electronics in Ghana. Ordering, delivery, warranty, payment – all answered.',
  alternates: { canonical: '/faqs' },
}

const faqs = [
  {
    q: 'Is ACE Electronics a manufacturer?',
    a: 'No. ACE Electronics is an independent third-party retailer and trusted tech plug. We source authentic laptops, smartphones, and gadgets from verified suppliers. We are not affiliated with Apple, Samsung, HP, Google, or any manufacturer – which is exactly why we can offer competitive, transparent pricing across brands.'
  },
  {
    q: 'How do I place an order?',
    a: 'Browse our catalog, tap "Quick Inquiry" on any device, and you\'ll be taken to WhatsApp with a pre-filled message. Tell us what you need – we\'ll confirm stock, price, and delivery in minutes. No online checkout, no account needed. Just chat with ACE.'
  },
  {
    q: 'Do you deliver nationwide in Ghana?',
    a: 'Yes — we deliver nationwide across Ghana. Delivery timelines and fees vary by location and will be confirmed with you on WhatsApp before your order is finalised. Contact us to get a delivery quote for your area.'
  },
  {
    q: 'What does "fairly used" mean?',
    a: 'Fairly used means pre-owned, tested, and fully functional. Cosmetic wear may be present – we always disclose condition honestly with photos on request. Looking for mint? Check our "99.99% clean" and "brand new sealed" listings instead.'
  },
  {
    q: 'Can I pay on delivery?',
    a: 'Yes. We accept MTN MoMo, Telecel Cash, bank transfer, and cash on delivery. Payment method and timing are confirmed with you on WhatsApp before dispatch. No payment is processed through this website.'
  },
  {
    q: 'Is there a warranty?',
    a: 'Yes. Every device is tested before delivery and covered by a 1-month warranty from the date of purchase. The warranty covers hardware defects present at time of sale. See our full Warranty Policy page for condition grading, what\'s covered, and how to claim. All claims are handled directly via WhatsApp.'
  },
  {
    q: 'Are your products authentic?',
    a: 'Always. We source exclusively from verified suppliers. Every device is authenticity-checked. No clones, no refurbished-sold-as-new. That\'s the ACE promise – your trusted tech plug in Ghana.'
  },
  {
    q: 'How do I contact ACE?',
    a: 'WhatsApp is fastest: +233 547 981 348, Mon–Sat 9AM–8PM GMT. Response time is usually under 2 minutes. You can also scan the QR code on our Contact page or join our WhatsApp Group for stock updates and deals.'
  },
]

export default function FAQsPage() {
  // FAQPage structured data generated from the same array the page renders,
  // so the rich result can never drift from the visible answers.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <div className="max-w-[800px]">
            <h1 className="font-heading text-[32px] xs:text-[32px] xs:text-[36px] md:text-[48px] font-semibold text-ace-white tracking-tight mb-3 tracking-tight">Frequently Asked Questions</h1>
            <p className="text-ace-silver text-base md:text-lg mb-10">Quick answers. Need more help? Talk to ACE on WhatsApp.</p>
            <div className="space-y-8">
              {faqs.map(f => (
                <div key={f.q} className="border-b border-ace-glass-border pb-6">
                  <h2 className="font-heading text-lg md:text-xl font-medium text-ace-white mb-2">{f.q}</h2>
                  <p className="text-ace-silver leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ButtonWhatsApp text="Hi ACE, I have a question not covered in the FAQs.">Ask ACE on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}