'use client'
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoACE from './LogoACE'
import MobileMenu from './MobileMenu'
import NavBarSearch from '@/components/ui/NavBarSearch'
import MegaDropdown from '@/components/navbar/MegaDropdown'
import { Menu, ShoppingCart, UserRound, Heart } from '@/components/ui/IconSet'
import { cn, WHATSAPP_LINK } from '@/lib/utils'
import { MEGA_MENU, type MegaMenuType } from '@/lib/megaMenu'

export default function NavBar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<MegaMenuType | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const laptopsTriggerRef = useRef<HTMLButtonElement | null>(null)
  const smartphonesTriggerRef = useRef<HTMLButtonElement | null>(null)
  const activeMenuData = useMemo(() => (openDropdown ? MEGA_MENU[openDropdown] : null), [openDropdown])

  const cancelCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const cancelOpenTimer = useCallback(() => {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
  }, [])

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null)
    cancelOpenTimer()
    cancelCloseTimer()
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus()
    })
  }, [cancelCloseTimer, cancelOpenTimer])

  const startCloseTimer = useCallback(() => {
    cancelOpenTimer()
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null)
      closeTimer.current = null
    }, 200)
  }, [cancelOpenTimer])

  const openDropdownMenu = useCallback((type: MegaMenuType, trigger: HTMLButtonElement | null) => {
    cancelCloseTimer()
    cancelOpenTimer()
    openTimer.current = setTimeout(() => {
      setOpenDropdown(type)
      lastTriggerRef.current = trigger
      openTimer.current = null
    }, 100)
  }, [cancelCloseTimer, cancelOpenTimer])

  useEffect(() => {
    if (openDropdown !== null) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const onEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeDropdown()
        }
      }

      document.addEventListener('keydown', onEscape)
      return () => {
        document.body.style.overflow = originalOverflow
        document.removeEventListener('keydown', onEscape)
      }
    }
    return undefined
  }, [openDropdown, closeDropdown])

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
      }
      if (openTimer.current) {
        clearTimeout(openTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current)
      }
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-[100] h-[64px] bg-white/95 ace-nav-shadow backdrop-blur-[20px]">
        <div className="relative max-w-ace mx-auto h-full px-5 xs:px-6 md:px-8 lg:px-12">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <LogoACE />
          </div>
          <nav className="absolute inset-y-0 left-1/2 hidden lg:flex items-center gap-8 -translate-x-1/2">
            <Link
              href="/"
              className={cn(
                'text-[14px] font-medium transition-colors',
                pathname === '/' ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
              )}
            >
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => openDropdownMenu('Laptops', laptopsTriggerRef.current)}
              onMouseLeave={startCloseTimer}
            >
              <button
  ref={laptopsTriggerRef}
  aria-expanded={openDropdown === 'Laptops'}
  aria-controls="mega-menu"
  onClick={() => window.location.href = '/laptops'}
  className={cn(
    'text-[14px] font-medium transition-colors py-2',
    pathname.startsWith('/laptops') ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
  )}
>
  Laptops
</button>
            </div>

            <div
              className="relative"
              onMouseEnter={() => openDropdownMenu('Smartphones', smartphonesTriggerRef.current)}
              onMouseLeave={startCloseTimer}
            >
              <button
  ref={smartphonesTriggerRef}
  aria-expanded={openDropdown === 'Smartphones'}
  aria-controls="mega-menu"
  onClick={() => window.location.href = '/smartphones'}
  className={cn(
    'text-[14px] font-medium transition-colors py-2',
    pathname.startsWith('/smartphones') ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
  )}
>
  Smartphones
</button>
            </div>

            <Link
              href="/accessories"
              className={cn(
                'text-[14px] font-medium transition-colors',
                pathname === '/accessories' ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
              )}
            >
              Accessories
            </Link>

            <Link
              href="/entertainment"
              className={cn(
                'text-[14px] font-medium transition-colors',
                pathname === '/entertainment' ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
              )}
            >
              Entertainment
            </Link>

            <Link
              href="/about"
              className={cn(
                'text-[14px] font-medium transition-colors',
                pathname === '/about' ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
              )}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                'text-[14px] font-medium transition-colors',
                pathname === '/contact' ? 'text-[#0066CC]' : 'text-[#1D1D1F] hover:text-[#0066CC]'
              )}
            >
              Contact
            </Link>
          </nav>
          <div className="absolute inset-y-0 right-0 flex items-center gap-4">
            <NavBarSearch />
            <a
              href={WHATSAPP_LINK("Hi ACE, I'm interested in a device.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp ACE"
              className="hidden xl:inline-flex h-9 w-9 items-center justify-center rounded-full text-[#25D366] hover:bg-[#EFFAF3]"
            >
              <Heart size={18} />
            </a>
            <Link href="/laptops" aria-label="Shopping cart" className="hidden xl:inline-flex h-9 w-9 items-center justify-center rounded-full text-[#142759] hover:bg-[#EEF4FF]">
              <ShoppingCart size={18} />
            </Link>
            <Link href="/contact" aria-label="Account" className="hidden xl:inline-flex h-9 w-9 items-center justify-center rounded-full text-[#142759] hover:bg-[#EEF4FF]">
              <UserRound size={18} />
            </Link>
            <button
              className="lg:hidden p-2 text-[#1D1D1F] hover:text-[#0066CC]"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {openDropdown !== null && activeMenuData && (
        <>
          <div
            className="fixed inset-0 top-[64px] z-[40] bg-[#142759]/20 backdrop-blur-sm"
            onClick={() => setOpenDropdown(null)}
          />
          <MegaDropdown
            data={activeMenuData}
            onClose={() => setOpenDropdown(null)}
            onMouseEnter={cancelCloseTimer}
            onMouseLeave={startCloseTimer}
          />
        </>
      )}

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}