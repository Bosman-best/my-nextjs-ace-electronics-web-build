import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsAppWidget from '@/components/whatsapp/FloatingWhatsAppWidget'
import HeroHome from '@/components/sections/HeroHome'
import TrustFeatureCard from '@/components/cards/TrustFeatureCard'
import CategoryCard from '@/components/cards/CategoryCard'
import ProductCard from '@/components/cards/ProductCard'
import WhyChooseACE from '@/components/sections/WhyChooseACE'
import ContactQRBlock from '@/components/sections/ContactQRBlock'
import ProductGrid from '@/components/ui/ProductGrid'
import SectionHeader from '@/components/ui/SectionHeader'
import dynamic from 'next/dynamic'
import { ShieldCheck, BadgeCheck, MessageCircle, Tag, Search } from '@/components/ui/IconSet'
import Link from 'next/link'
import { FEATURED_PRODUCTS, LAPTOPS, SMARTPHONES } from '@/lib/products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ACE Electronics – Laptops & Smartphones for Sale in Ghana | Trusted Tech Plug',
  description: 'Buy authentic laptops and smartphones in Accra, Ghana. HP EliteBook, Dell, Samsung Galaxy, Google Pixel – competitive prices, verified devices, fast WhatsApp support from ACE Electronics.',
}

const Reveal = dynamic(() => import('@/components/motion/Reveal'), { ssr: false })
const RevealStagger = dynamic(() => import('@/components/motion/RevealStagger'), { ssr: false })

const trustItems = [
  { icon: ShieldCheck, title: 'Verified Products', description: 'Every device sourced from verified suppliers. Authenticity guaranteed.' },
  { icon: BadgeCheck, title: 'Quality Assurance', description: 'Tested, certified, and backed by warranty. No surprises.' },
  { icon: MessageCircle, title: 'Fast Response WhatsApp', description: 'Expert help in minutes, Mon-Sat 9AM–8PM GMT.' },
  { icon: Tag, title: 'Competitive Pricing', description: 'Premium tech at fair, transparent prices. No hidden fees.' },
]

const categories = [
  { title: 'Smartphones', count: `${SMARTPHONES.length} devices in stock`, href: '/smartphones', emoji: '📱' },
  { title: 'Laptops', count: `${LAPTOPS.length} devices in stock`, href: '/laptops', emoji: '💻' },
  { title: 'Accessories', count: 'Ask on WhatsApp', href: '/accessories', emoji: '🎧' },
  { title: 'Gaming Devices', count: 'Ask on WhatsApp', href: '/gaming', emoji: '🎮' },
]

const howToBuy = [
  { icon: Search, title: 'Browse the catalog', description: 'Laptops and smartphones with clear specs and transparent GHS pricing.' },
  { icon: MessageCircle, title: 'Chat with ACE on WhatsApp', description: 'Tap "Quick Inquiry" or message us — we confirm stock, price and delivery in minutes.' },
  { icon: BadgeCheck, title: 'Get your verified device', description: 'Authentic, tested devices with honest advice and nationwide delivery.' },
]

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroHome />
        <section className="py-16 md:py-28 bg-ace-gradient">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <RevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" stagger={0.08}>
              {trustItems.map(t => <TrustFeatureCard key={t.title} {...t} />)}
            </RevealStagger>
          </div>
        </section>
        <section className="py-16 md:py-28">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="Shop By Category" subtext="Premium devices across every category, all verified authentic." align="left" /></Reveal>
            <RevealStagger className="grid md:grid-cols-2 gap-6 md:gap-8" stagger={0.08}>
              {categories.map(c => <CategoryCard key={c.title} {...c} />)}
            </RevealStagger>
          </div>
        </section>
        <section className="py-16 md:py-28 bg-ace-gradient">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-12">
                <SectionHeader title="Featured Devices" align="left" className="!mb-0" />
                <span className="hidden md:flex gap-5 text-sm font-medium">
                  <Link href="/laptops" className="text-ace-electric hover:underline">Laptops →</Link>
                  <Link href="/smartphones" className="text-ace-electric hover:underline">Smartphones →</Link>
                </span>
              </div>
            </Reveal>
            <RevealStagger>
              <ProductGrid>
                {FEATURED_PRODUCTS.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 2} />)}
              </ProductGrid>
            </RevealStagger>
          </div>
        </section>
        <Reveal><WhyChooseACE /></Reveal>
        <section className="py-16 md:py-28">
          <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12">
            <Reveal><SectionHeader title="How to Buy From ACE" subtext="Simple and direct — no account, no online checkout." /></Reveal>
            <RevealStagger className="grid md:grid-cols-3 gap-6 md:gap-8" stagger={0.08}>
              {howToBuy.map(s => <TrustFeatureCard key={s.title} {...s} />)}
            </RevealStagger>
          </div>
        </section>
        <Reveal><ContactQRBlock /></Reveal>
      </main>
      <Footer />
      <FloatingWhatsAppWidget />
    </>
  )
}
