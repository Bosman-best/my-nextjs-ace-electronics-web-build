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
            <SectionHeader title="Accessories" subtext="Headphones, chargers, cases & more — chat with ACE for current stock." />
            <ButtonWhatsApp text="Hi ACE, I'm looking for accessories. What's in stock?">Ask About Accessories on WhatsApp</ButtonWhatsApp>
          </section>
        </PageContainer>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
