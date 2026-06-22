import { Metadata } from 'next'
import SmartphonesClient from './SmartphonesClient'

export const metadata: Metadata = {
  title: 'Smartphones for Sale Ghana – Samsung, Google Pixel | ACE Electronics',
  description: 'Buy smartphones in Accra, Ghana. Samsung Galaxy S24/S25, Google Pixel 10/9/8 – Flagship, Mid-range & Budget. Authentic devices, WhatsApp support.',
  openGraph: {
    title: 'Smartphones for Sale Ghana | ACE Electronics',
    description: 'Samsung Galaxy, Google Pixel phones in Ghana. Verified authentic.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() { return <SmartphonesClient /> }
