import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import SectionHeader from '@/components/ui/SectionHeader'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
export default function Page() {
  return (<><NavBar /><main><PageContainer className="py-28">
    <SectionHeader title="Accessories" subtext="Headphones, chargers, cases & more — chat with ACE for current stock." />
    <ButtonWhatsApp text="Hi ACE, I'm looking for accessories. What's in stock?">Ask About Accessories on WhatsApp</ButtonWhatsApp>
  </PageContainer></main><Footer /><FloatingWhatsAppWidget /></>)
}
