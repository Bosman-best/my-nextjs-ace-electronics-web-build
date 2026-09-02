import Link from 'next/link'
import LogoACE from './LogoACE'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import { WHATSAPP_LINK, WHATSAPP_GROUP_LINK, WHATSAPP_DISPLAY } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="bg-ace-surface-secondary border-t border-ace-border-light mt-32">
      <div className="max-w-ace mx-auto px-5 xs:px-6 md:px-8 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.5fr_1.5fr_1.5fr_2fr] gap-x-16 gap-y-12">
          <div>
            <LogoACE size="footer" />
            <p className="text-ace-text-muted mt-4 text-sm leading-relaxed max-w-xs">Your Trusted Tech Plug</p>
            <div className="mt-8 space-y-2">
              <p className="text-ace-text-secondary text-sm">WhatsApp: {WHATSAPP_DISPLAY}</p>
              <p className="text-ace-text-muted text-sm">Hours: Mon-Sat 9AM–8PM GMT</p>
            </div>
          </div>
          <div>
            <h4 className="text-ace-text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/laptops" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Laptops</Link></li>
              <li><Link href="/smartphones" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Smartphones</Link></li>
              <li><Link href="/accessories" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Accessories</Link></li>
              <li><Link href="/gaming" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Gaming Devices</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ace-text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Contact</Link></li>
              <li><Link href="/warranty" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">Warranty Policy</Link></li>
              <li><Link href="/faqs" className="text-ace-text-secondary text-sm hover:text-ace-electric transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ace-text-primary font-heading font-semibold text-sm uppercase tracking-wider mb-6">Connect</h4>
            <div className="space-y-4">
              <ButtonPrimary href={WHATSAPP_LINK("Hi ACE")} size="sm">WhatsApp Us</ButtonPrimary>
              <div>
                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ace-electric text-sm font-medium hover:underline inline-block"
                >
                  Join WhatsApp Group &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-ace-border-light mt-20 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-ace-text-muted text-xs gap-4">
          <span>&copy; 2026 ACE Electronics. All rights reserved.</span>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-ace-text-secondary hover:text-ace-electric transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-ace-text-secondary hover:text-ace-electric transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}