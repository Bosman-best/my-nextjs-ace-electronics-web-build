import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const quickLinks = [['Home','/'],['Laptops','/laptops'],['Smartphones','/smartphones'],['Accessories','/accessories'],['Gaming','/gaming']] as const
const supportLinks = [['About ACE','/about'],['Contact','/contact'],['FAQs','/faqs'],['Warranty','/warranty']] as const

export default function StorefrontFooter() {
  return <footer className="border-t border-[#E3EAF3] bg-[#EEF4FC] text-[#17243A]">
    <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.1fr] lg:px-12 lg:py-14">
      <div><Link href="/" className="inline-flex flex-col leading-[.9]" aria-label="ACE Electronics home"><span className="font-heading text-[27px] font-extrabold tracking-[-.08em] text-[#0066CC]">ACE</span><span className="mt-1 text-[9px] font-bold tracking-[.08em] text-[#53647B]">Electronics</span></Link><p className="mt-5 max-w-xs text-sm leading-6 text-[#53647B]">Explore devices, compare the details and speak directly with the ACE team.</p></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#14233B]">Quick Links</h3><ul className="mt-4 space-y-3">{quickLinks.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-[#53647B] transition hover:text-[#0066CC]">{label}</Link></li>)}</ul></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#14233B]">Support</h3><ul className="mt-4 space-y-3">{supportLinks.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-[#53647B] transition hover:text-[#0066CC]">{label}</Link></li>)}</ul></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#14233B]">Connect With Us</h3><p className="mt-4 text-sm leading-6 text-[#53647B]">Questions about a device? Talk to the ACE team directly.</p><a href="tel:+233547981348" className="mt-3 block text-sm font-semibold text-[#14233B] hover:text-[#0066CC]">+233 54 798 1348</a><p className="mt-1 text-xs text-[#718096]">Accra, Ghana</p><a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#1FB95A]"><WhatsAppIcon size={16}/> WhatsApp ACE</a></div>
    </div>
    <div className="border-t border-[#DCE5F0]"><div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-xs text-[#718096] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><span>© {new Date().getFullYear()} ACE Electronics. All rights reserved.</span><span>Thoughtful tech. Straightforward service.</span></div></div>
  </footer>
}
