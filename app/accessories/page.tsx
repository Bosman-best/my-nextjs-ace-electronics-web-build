import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessories Ghana – Chargers, Cases, Headphones | ACE Electronics',
  description: 'Phone and laptop accessories in Accra, Ghana — headphones, chargers, cases and more. Chat with ACE on WhatsApp for current availability.',
}

const accessoryCategories = [
  { emoji: '🎧', title: 'Headphones & Earbuds' },
  { emoji: '🔌', title: 'Chargers & Cables' },
  { emoji: '📱', title: 'Cases & Screen Protectors' },
  { emoji: '🔋', title: 'Power Banks' },
  { emoji: '⌚', title: 'Smartwatches & Wearables' },
  { emoji: '🎒', title: 'Laptop Bags & Sleeves' },
]

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="py-16 md:py-24">
        <PageContainer>
          <h1 className="font-heading text-[36px] md:text-[48px] font-semibold text-ace-white mb-3">Accessories</h1>
          <p className="text-ace-silver text-lg mb-10">Extras for your phone or laptop — message ACE on WhatsApp and we&apos;ll confirm what&apos;s in stock.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {accessoryCategories.map(a => (
              <div key={a.title} className="ace-glass p-8 flex items-center gap-4 min-h-[120px]">
                <span className="text-4xl" aria-hidden="true">{a.emoji}</span>
                <span className="font-heading text-lg font-medium text-ace-white">{a.title}</span>
              </div>
            ))}
          </div>

          <div className="ace-glass p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-ace-white">Ask what&apos;s in stock</h2>
            <p className="text-ace-silver text-base md:text-lg leading-relaxed max-w-[560px] mx-auto mt-4">
              Accessories change week to week. Tell us your device and what you need — we&apos;ll confirm availability and pricing on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonWhatsApp text="Hi ACE, I'm looking for accessories. What's in stock?">Ask About Accessories on WhatsApp</ButtonWhatsApp>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
