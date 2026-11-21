'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search, MessageCircle } from 'lucide-react'

const links = [
  { label: 'Laptops', href: '/laptops' },
  { label: 'Smartphones', href: '/smartphones' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Gaming', href: '/gaming' },
  { label: 'About', href: '/about' },
]

export default function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5" aria-label="ACE Electronics home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0066CC] text-lg font-bold tracking-tight text-white">A</span>
          <span className="leading-tight"><span className="block text-[19px] font-bold tracking-[-0.06em] text-[#14233B]">ACE<span className="text-[#0066CC]">.</span></span><span className="block text-[9px] font-semibold uppercase tracking-[.22em] text-slate-500">Electronics Ghana</span></span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          <Link href="/" className="text-sm font-semibold text-[#0066CC]">Home</Link>
          {links.map(link => <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-[#0066CC]">{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/laptops" aria-label="Browse catalogue" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-[#0066CC] hover:text-[#0066CC]"><Search size={17}/></Link>
          <a href="https://wa.me/233547981348?text=Hello%20ACE%20Electronics%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0066CC] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,102,204,.18)] transition hover:-translate-y-0.5 hover:bg-[#0055ad]"><MessageCircle size={16}/> Chat with ACE</a>
        </div>
        <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 text-slate-800 lg:hidden">{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {menuOpen && <div className="border-t border-slate-100 bg-white px-5 pb-6 pt-3 shadow-xl lg:hidden"><nav className="mx-auto flex max-w-[1440px] flex-col">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-slate-100 py-4 text-[15px] font-medium text-slate-700">{link.label}</Link>)}<a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#0066CC] px-5 py-3.5 text-sm font-semibold text-white"><MessageCircle size={17}/> Chat with ACE</a></nav></div>}
    </header>
  )
}
