import { Metadata } from 'next'
import LaptopsClient from './LaptopsClient'

export const metadata: Metadata = {
  title: 'Laptops for Sale Ghana – Gaming, Business, Student | ACE Electronics',
  description: 'Buy laptops in Accra, Ghana. HP EliteBook, Dell Latitude, Lenovo ThinkPad, ZBook – Gaming, Business, Student & Ultrabook. Verified authentic, WhatsApp support.',
  openGraph: {
    title: 'Laptops for Sale Ghana | ACE Electronics',
    description: 'HP EliteBook, Dell, Lenovo laptops in Ghana. Verified authentic, competitive prices.',
    images: [{ url: '/og-ace.jpg', width: 1200, height: 630 }],
  },
}

export default function Page() { return <LaptopsClient /> }
