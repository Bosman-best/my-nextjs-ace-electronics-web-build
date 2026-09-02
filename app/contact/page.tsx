import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import Image from 'next/image'
import { WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — WhatsApp Support in Ghana',
  description: 'Contact ACE Electronics in Ghana via WhatsApp. Fast response Mon-Sat 9AM–8PM GMT. Get quotes for laptops and smartphones in minutes.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <main id="main" className="py-16 md:py-24">
        <PageContainer>
          <div className="max-w-[720px] mx-auto text-center">
            <h1 className="font-heading text-[32px] xs:text-[36px] md:text-[48px] font-semibold text-ace-white tracking-tight">Talk to ACE</h1>
            <p className="text-ace-silver text-lg mt-3">Fast response, Mon–Sat 9AM–8PM GMT</p>
            
            <div className="ace-glass mt-10 p-6 xs:p-8 md:p-10 shadow-ace-glow border-ace-electric/30">
              <Image src="/ace-whatsapp-qr.png" alt="WhatsApp QR code – scan to chat with ACE Electronics on wa.me/233547981348" width={220} height={220} priority className="mx-auto rounded-xl bg-white p-3 w-full max-w-[220px] h-auto aspect-square" />
              <p className="text-ace-silver text-[15px] mt-4">Scan to chat instantly</p>
              <div className="mt-4 flex justify-center"><ButtonWhatsApp size="lg">Open WhatsApp</ButtonWhatsApp></div>
              <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer" className="text-ace-electric text-[15px] font-medium mt-3 inline-block hover:underline">Join our WhatsApp Group →</a>
            </div>

            <div className="text-ace-silver text-sm mt-6">
              WhatsApp: {WHATSAPP_DISPLAY} &nbsp;|&nbsp; Hours: Mon-Sat 9AM–8PM GMT &nbsp;|&nbsp; Response ~2 min
            </div>

            <div className="ace-glass p-8 mt-12 text-left">
              <h3 className="font-heading text-xl font-semibold text-ace-white mb-3">Prefer to message?</h3>
              <p className="text-ace-silver mb-4">We handle all inquiries via WhatsApp for fastest response — usually under 2 minutes during business hours.</p>
              <ButtonWhatsApp text="Hi ACE, I have a question.">Message ACE on WhatsApp</ButtonWhatsApp>
              <p className="text-ace-silver text-xs mt-3">Mon–Sat 9AM–8PM GMT · {WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
