import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import SectionHeader from '@/components/ui/SectionHeader'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
export default function Page() {
  return (
    <>
      <NavBar />
      <main className="ace-page min-h-[68vh]">
        <PageContainer className="py-16 md:py-24">
          <section className="ace-reference-hero rounded-[24px] px-6 py-16 text-center md:px-12 md:py-24">
            <SectionHeader title="Gaming Devices" subtext="Consoles, controllers & gaming laptops — ask ACE for availability." />
            <ButtonWhatsApp text="Hi ACE, I'm looking for gaming devices. What's available?">Ask About Gaming Gear on WhatsApp</ButtonWhatsApp>
          </section>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
