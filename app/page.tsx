import type { Metadata } from 'next'
import StorefrontHeader from '@/components/redesign/StorefrontHeader'
import StorefrontHome from '@/components/redesign/StorefrontHome'
import StorefrontFooter from '@/components/redesign/StorefrontFooter'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'

export const metadata: Metadata = {
  title: 'ACE Electronics Ghana | Find the Tech That Moves You',
  description: 'Explore laptops, smartphones, audio accessories and gaming devices at ACE Electronics Ghana. Get clear product information and direct WhatsApp support.',
}

export default function HomePage() {
  return <>
    <StorefrontHeader />
    <StorefrontHome />
    <StorefrontFooter />
    <FloatingWhatsAppWidget />
  </>
}
