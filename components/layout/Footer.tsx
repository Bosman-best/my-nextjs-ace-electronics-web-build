import Link from 'next/link'
import LogoACE from './LogoACE'
import { WHATSAPP_LINK, WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-[#EEF4FC] mt-32">
      <div className="max-w-ace mx-auto px-6 xs:px-8 md:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <LogoACE size="footer" />
            <p className="text-[#6E6E73] mt-4 text-[14px] leading-relaxed max-w-xs">Your Trusted Tech Plug</p>
            <div className="mt-8 space-y-2 text-[12px] text-[#1D1D1F] leading-6">
              <p>WhatsApp: {WHATSAPP_DISPLAY}</p>
              <p>Hours: Mon-Sat 9AM–8PM GMT</p>
            </div>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-heading font-semibold text-[12px] uppercase tracking-[0.18em] mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/laptops" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Laptops</Link></li>
              <li><Link href="/smartphones" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Smartphones</Link></li>
              <li><Link href="/accessories" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Accessories</Link></li>
              <li><Link href="/gaming" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Gaming Devices</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-heading font-semibold text-[12px] uppercase tracking-[0.18em] mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Contact</Link></li>
              <li><Link href="/warranty" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">Warranty Policy</Link></li>
              <li><Link href="/faqs" className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#1D1D1F] font-heading font-semibold text-[12px] uppercase tracking-[0.18em] mb-6">Connect</h4>
            <div className="space-y-4">
              <a
                href={WHATSAPP_LINK("Hi ACE")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#3B82F6] px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#2563EB]"
              >
                WhatsApp Us
              </a>
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1D1D1F] text-[12px] leading-6 hover:text-[#0066CC] transition-colors inline-block"
              >
                Join WhatsApp Group →
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#D2D2D7] pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#6E6E73] text-[12px]">
          <span>&copy; 2026 ACE Electronics. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0066CC] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#0066CC] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}