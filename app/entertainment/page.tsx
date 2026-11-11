import { Metadata } from 'next'
import EntertainmentPageClient from './EntertainmentPageClient'

export const metadata: Metadata = {
  title: 'Entertainment – Netflix & Crunchyroll Premium Ghana | ACE Electronics',
  description: 'Premium Netflix and Crunchyroll subscriptions coming soon to ACE Electronics Ghana. Top anime, blockbuster movies, ad-free streaming.',
}

export default function Page() {
  return <EntertainmentPageClient />
}
