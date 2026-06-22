'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoACE from './LogoACE'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import MobileMenu from './MobileMenu'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { Menu } from '@/components/ui/IconSet'
import { cn, WHATSAPP_LINK } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/laptops', label: 'Laptops' },
  { href: '/smartphones', label: 'Smartphones' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-[100] h-[72px] lg:h-20 border-b border-ace-glass-border bg-ace-black/80 backdrop-blur-xl">
        <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12 h-full flex items-center justify-between">
          <LogoACE />
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(l => {
              const active = pathname === l.href
              return (
                <Link key={l.href} href={l.href}
                  className={cn(
                    'text-[16px] font-medium transition-colors',
                    active ? 'text-ace-white' : 'text-ace-silver hover:text-ace-white'
                  )}
                  style={active ? { textDecoration: 'underline', textDecorationColor: '#3B82F6', textUnderlineOffset: '6px', textDecorationThickness: '2px' } : {}}
                >{l.label}</Link>
              )
            })}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden lg:block">
              <ButtonPrimary href={WHATSAPP_LINK("Hi ACE, I'm interested in a device.")} size="sm">Talk to ACE</ButtonPrimary>
            </div>
            <button className="lg:hidden p-2 text-ace-silver hover:text-ace-white" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}