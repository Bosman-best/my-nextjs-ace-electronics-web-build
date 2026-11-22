'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const links = [
  { label: 'Laptops', href: '/laptops' },
  { label: 'Smartphones', href: '/smartphones' },
  { label: 'Accessories', href: '/accessories' },
  { label: 'Gaming', href: '/gaming' },
]

export default function StorefrontHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 flex-col leading-[.9]" aria-label="ACE Electronics home">
          <span className="font-heading text-[25px] font-extrabold tracking-[-.08em] text-[#0066CC]">ACE</span>
          <span className="mt-1 text-[9px] font-bold tracking-[.08em] text-[#53647B]">Electronics</span>
        </Link>
        <nav className="hidden h-full items-center gap-7 lg:flex">
          <Link href="/" className={`relative flex h-full items-center text-[13px] font-semibold transition hover:text-[#0066CC] ${pathname === '/' ? 'text-[#0066CC] after:absolute after:bottom-[13px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0066CC]' : 'text-slate-600'}`}>Home</Link>
          {links.map(link => <Link key={link.href} href={link.href} className={`relative flex h-full items-center text-[13px] font-semibold transition hover:text-[#0066CC] ${pathname.startsWith(link.href) ? 'text-[#0066CC] after:absolute after:bottom-[13px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#0066CC]' : 'text-slate-600'}`}>{link.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <form action="/laptops" className="flex h-10 w-[205px] items-center gap-2 rounded-full bg-white/55 px-3 focus-within:border-[#0066CC] focus-within:bg-white">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input name="q" aria-label="Search laptops" placeholder="Search laptops..." className="w-full min-w-0 bg-transparent text-xs text-[#17243A] outline-none placeholder:text-slate-400" />
          </form>
          <a href="https://wa.me/233547981348?text=Hello%20ACE%20Electronics%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label="Chat with ACE on WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition hover:bg-[#1FB95A]"><WhatsAppIcon size={20} /></a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" aria-label="Chat with ACE on WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon size={20} /></a>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full text-slate-800">{menuOpen ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </div>
      {menuOpen && <div className="bg-white/90 px-5 pb-5 pt-2 shadow-xl lg:hidden"><nav className="mx-auto flex max-w-[1440px] flex-col"><Link href="/" onClick={() => setMenuOpen(false)} className="py-3.5 text-sm font-semibold text-slate-700">Home</Link>{links.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`py-3.5 text-sm font-semibold ${pathname.startsWith(link.href) ? 'text-[#0066CC]' : 'text-slate-700'}`}>{link.label}</Link>)}<Link href="/about" onClick={() => setMenuOpen(false)} className="py-3.5 text-sm font-semibold text-slate-700">About ACE</Link><form action="/laptops" className="mt-2 flex h-11 items-center gap-2 rounded-full bg-white/65 px-4"><Search size={16} className="text-slate-400"/><input name="q" aria-label="Search laptops" placeholder="Search laptops..." className="w-full bg-transparent text-sm outline-none"/></form></nav></div>}
    </header>
  )
}
