'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X, Search, ArrowUpRight } from 'lucide-react'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const menus = [
  { label: 'Laptops', href: '/laptops', brands: ['Apple', 'HP', 'Dell', 'Lenovo', 'ASUS', 'Microsoft'], classes: ['Premium laptops', 'Business laptops', 'Creator laptops', 'Gaming laptops', 'Student laptops'], featured: 'Find the right laptop for work, study and everything in between.' },
  { label: 'Smartphones', href: '/smartphones', brands: ['Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus', 'Motorola'], classes: ['Flagship', 'Upper mid-range', 'Mid-range', 'Budget phones', 'Foldables'], featured: 'Explore phones by brand, performance and the features that matter.' },
  { label: 'Accessories', href: '/accessories', brands: ['Apple', 'Sony', 'JBL', 'Bose', 'Anker', 'Logitech'], classes: ['Headphones', 'Earbuds', 'Speakers', 'Chargers & cables', 'Cases & protection', 'Computer accessories'], featured: 'The finishing touches for your everyday setup.' },
  { label: 'Gaming', href: '/gaming', brands: ['PlayStation', 'Xbox', 'Nintendo', 'Logitech', 'Razer', 'SteelSeries'], classes: ['Consoles', 'Controllers', 'Gaming headsets', 'Keyboards & mice', 'Gaming accessories'], featured: 'Gear up with the hardware and accessories you play on.' },
]

export default function StorefrontHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setActiveMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }, [pathname])

  const closeMenus = () => {
    setActiveMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }

  return (
    <>
    <header className={`${(scrolled || activeMenu || mobileOpen) ? 'fixed inset-x-0 top-0 isolate z-[1000] bg-white/78 lg:bg-white backdrop-blur-2xl lg:backdrop-blur-none shadow-[0_8px_30px_rgba(15,35,65,.07)] transition-[background-color,backdrop-filter,box-shadow] duration-300' : 'fixed inset-x-0 top-0 isolate z-[1000] bg-transparent transition-[background-color,backdrop-filter,box-shadow] duration-300'} onMouseLeave={() => setActiveMenu(null)}>
      {(activeMenu || mobileOpen) && <div aria-hidden="true" onClick={closeMenus} className="fixed inset-x-0 top-[64px] bottom-0 z-0 bg-[#0B1B3A]/[.10] backdrop-blur-md lg:top-[64px]" />}
      <div className="relative z-10 mx-auto flex h-[64px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <Link href="/" onClick={closeMenus} className="flex shrink-0 flex-col leading-[.9]" aria-label="ACE Electronics home">
          <span className="font-heading text-[25px] font-extrabold tracking-[-.08em] text-[#0066CC]">ACE</span>
          <span className="mt-1 text-[9px] font-bold tracking-[.08em] text-[#53647B]">Electronics</span>
        </Link>
        <nav className="hidden h-full items-center gap-6 lg:flex" aria-label="Main navigation">
          <Link href="/" className={pathname === '/' ? 'flex h-full items-center text-[13px] font-medium text-[#0066CC]' : 'flex h-full items-center text-[13px] font-medium text-slate-700 hover:text-[#0066CC]'}>Home</Link>
          {menus.map(menu => (
            <div key={menu.href} className="flex h-full items-center" onMouseEnter={() => setActiveMenu(menu.label)}>
              <Link href={menu.href} className={pathname.startsWith(menu.href) || activeMenu === menu.label ? 'flex h-full items-center text-[13px] font-medium text-[#0066CC]' : 'flex h-full items-center text-[13px] font-medium text-slate-700 hover:text-[#0066CC]'}>{menu.label}</Link>
              <button type="button" aria-label={'Open ' + menu.label + ' menu'} aria-expanded={activeMenu === menu.label} onFocus={() => setActiveMenu(menu.label)} onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)} className="ml-1 grid h-8 w-5 place-items-center text-slate-500 hover:text-[#0066CC]"><ChevronDown size={13} className={activeMenu === menu.label ? 'rotate-180 transition-transform' : 'transition-transform'}/></button>
            </div>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <form action="/search" className="flex h-10 w-[205px] items-center gap-2 rounded-full bg-black/[.045] px-3 focus-within:bg-black/[.07]">
            <Search size={16} className="shrink-0 text-slate-400" />
            <input name="q" aria-label="Search products" placeholder="Search products..." className="ace-search-input w-full min-w-0 bg-transparent text-xs text-[#17243A] outline-none placeholder:text-slate-400" />
          </form>
          <a href="https://wa.me/233547981348?text=Hello%20ACE%20Electronics%2C%20I%27d%20like%20to%20make%20an%20enquiry." target="_blank" rel="noreferrer" aria-label="Chat with ACE on WhatsApp" className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white transition hover:bg-[#1FB95A]"><WhatsAppIcon size={20} /></a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="https://wa.me/233547981348" target="_blank" rel="noreferrer" aria-label="Chat with ACE on WhatsApp" className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon size={18} /></a>
          <button type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => { setMobileOpen(!mobileOpen); setMobileSection(null) }} className="grid h-9 w-9 place-items-center rounded-full text-slate-800">{mobileOpen ? <X size={19}/> : <Menu size={19}/>}</button>
        </div>
      </div>
      {activeMenu && (
        <div className="absolute left-0 top-[64px] z-10 hidden max-h-[calc(100dvh-64px)] w-screen overflow-y-auto bg-white shadow-[0_24px_55px_rgba(15,35,65,.12)] lg:block">
          {menus.filter(menu => menu.label === activeMenu).map(menu => (
            <div key={menu.href} className="mx-auto grid max-w-[1440px] grid-cols-[1.05fr_1fr_1fr] gap-16 px-12 py-12 xl:px-20">
              <div className="max-w-[330px]">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#7A8798]">Explore {menu.label}</p>
                <h2 className="mt-3 font-heading text-[30px] font-semibold leading-tight tracking-[-.045em] text-[#1D1D1F]">{menu.label}, picked for you.</h2>
                <p className="mt-3 text-[14px] leading-6 text-[#6E6E73]">{menu.featured}</p>
                <Link href={menu.href} onClick={closeMenus} className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[#06c] hover:underline">Shop all {menu.label} <ArrowUpRight size={15}/></Link>
              </div>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.16em] text-[#86868B]">Shop by brand</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">{menu.brands.map(brand => <Link key={brand} href={menu.href + '?brand=' + encodeURIComponent(brand)} onClick={closeMenus} className="text-[15px] font-medium text-[#1D1D1F] transition hover:text-[#06c]">{brand}</Link>)}</div>
              </div>
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.16em] text-[#86868B]">Shop by category</p>
                <div className="grid grid-cols-1 gap-y-4">{menu.classes.map(item => <Link key={item} href={menu.href + '?category=' + encodeURIComponent(item)} onClick={closeMenus} className="text-[15px] font-medium text-[#1D1D1F] transition hover:text-[#06c]">{item}</Link>)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      {mobileOpen && (
        <div className="absolute right-3 top-[60px] z-10 max-h-[min(72dvh,560px)] w-[calc(100vw-24px)] overflow-y-auto rounded-[20px] bg-white px-5 pb-5 pt-3 shadow-[0_18px_55px_rgba(15,35,65,.18)] lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            <Link href="/" onClick={closeMenus} className="py-3 text-[15px] font-medium text-[#1D1D1F]">Home</Link>
            {menus.map(menu => (
              <div key={menu.href} className="py-1">
                <div className="flex items-center justify-between">
                  <Link href={menu.href} onClick={closeMenus} className="py-2.5 text-[15px] font-medium text-[#1D1D1F]">{menu.label}</Link>
                  <button type="button" aria-label={'Expand ' + menu.label} aria-expanded={mobileSection === menu.label} onClick={() => setMobileSection(mobileSection === menu.label ? null : menu.label)} className="grid h-9 w-9 place-items-center rounded-full text-slate-600"><ChevronDown size={16} className={mobileSection === menu.label ? 'rotate-180 transition-transform' : 'transition-transform'}/></button>
                </div>
                {mobileSection === menu.label && <div className="mb-3 ml-2 rounded-xl bg-[#F5F5F7] px-4 py-3">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#86868B]">Brands</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">{menu.brands.map(brand => <Link key={brand} href={menu.href + '?brand=' + encodeURIComponent(brand)} onClick={closeMenus} className="py-1 text-[13px] text-[#424245]">{brand}</Link>)}</div>
                  <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[.14em] text-[#86868B]">Categories</p>
                  <div className="grid grid-cols-1 gap-y-2">{menu.classes.map(item => <Link key={item} href={menu.href + '?category=' + encodeURIComponent(item)} onClick={closeMenus} className="py-1 text-[13px] text-[#424245]">{item}</Link>)}</div>
                </div>}
              </div>
            ))}
            <Link href="/about" onClick={closeMenus} className="py-3 text-[15px] font-medium text-[#1D1D1F]">About ACE</Link>
            <form action="/search" className="mt-2 flex h-10 items-center gap-2 rounded-full bg-[#F5F5F7] px-4"><Search size={15} className="text-slate-400"/><input name="q" aria-label="Search products" placeholder="Search products..." className="ace-search-input w-full bg-transparent text-[13px] outline-none"/></form>
          </nav>
        </div>
      )}
    </header>
    </>
  )
}
