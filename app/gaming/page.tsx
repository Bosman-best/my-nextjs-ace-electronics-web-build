import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PageContainer from '@/components/layout/PageContainer'
import SectionHeader from '@/components/ui/SectionHeader'
import ButtonWhatsApp from '@/components/ui/ButtonWhatsApp'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
export default function Page() {
  return (<><NavBar /><main><PageContainer className="py-28">
    <SectionHeader title="Gaming Devices" subtext="Consoles, controllers & gaming laptops — ask ACE for availability." />
    <ButtonWhatsApp text="Hi ACE, I'm looking for gaming devices. What's available?">Ask About Gaming Gear on WhatsApp</ButtonWhatsApp>
  </PageContainer></main><Footer /><FloatingWhatsAppWidget /></>)
}
