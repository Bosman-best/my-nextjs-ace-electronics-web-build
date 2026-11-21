import Link from 'next/link'
import { ArrowUpRight, MessageCircle } from 'lucide-react'

const shop = [['Laptops','/laptops'],['Smartphones','/smartphones'],['Accessories','/accessories'],['Gaming','/gaming']] as const
const company = [['About ACE','/about'],['Contact','/contact'],['FAQs','/faqs'],['Warranty','/warranty']] as const

export default function StorefrontFooter() {
  return <footer className="bg-[#101E34] text-white">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-12 lg:py-20">
      <div><Link href="/" className="inline-flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1478DF] text-xl font-bold">A</span><span className="leading-tight"><span className="block text-xl font-bold tracking-[-.06em]">ACE<span className="text-[#58A5FF]">.</span></span><span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[.2em] text-slate-400">Electronics Ghana</span></span></Link><p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">Technology, made easier. Explore devices, compare the details and speak directly with the ACE team.</p><a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#14233B] transition hover:bg-blue-50"><MessageCircle size={17}/> Talk to ACE <ArrowUpRight size={15}/></a></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.2em] text-blue-200">Explore</h3><ul className="mt-5 space-y-4">{shop.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</Link></li>)}</ul></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.2em] text-blue-200">ACE Electronics</h3><ul className="mt-5 space-y-4">{company.map(([label,href])=><li key={href}><Link href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</Link></li>)}</ul></div>
      <div><h3 className="text-xs font-bold uppercase tracking-[.2em] text-blue-200">Let’s talk tech</h3><p className="mt-5 text-sm leading-7 text-slate-300">Need help choosing a device? Send us a message and ask about current prices and availability.</p><a href="tel:+233547981348" className="mt-4 inline-block text-sm font-semibold text-white transition hover:text-blue-200">+233 54 798 1348</a><p className="mt-1 text-xs text-slate-400">Accra, Ghana</p><a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-200 transition hover:text-white"><MessageCircle size={14}/> WhatsApp ACE</a></div>
    </div>
    <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-6 text-xs text-slate-400 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><span>© {new Date().getFullYear()} ACE Electronics. All rights reserved.</span><span>Thoughtful tech. Straightforward service.</span></div></div>
  </footer>
}
