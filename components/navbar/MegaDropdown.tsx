'use client'
import { memo } from 'react'
import type { MegaMenuData } from '@/lib/megaMenu'
import CategoryColumn from './CategoryColumn'
import BrandGrid from './BrandGrid'
import { WHATSAPP_LINK } from '@/lib/utils'

interface MegaDropdownProps {
  data: MegaMenuData
  onClose: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function MegaDropdownInner({ data, onClose, onMouseEnter, onMouseLeave }: MegaDropdownProps) {
  const uniqueSupportLinks = data.supportLinks.filter(
    (link, index, self) => index === self.findIndex((l) => l.label === link.label)
  )

  return (
    <div className="fixed inset-x-0 top-[44px] z-[50] pointer-events-auto" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="mx-auto max-w-ace px-5 xs:px-6 md:px-8 lg:px-12">
        <div className="pointer-events-auto overflow-hidden rounded-[12px] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr_1.2fr]">
            <CategoryColumn title="Category" categories={data.categories} onClose={onClose} />
            <div className="space-y-6">
              <BrandGrid title="Brands" brands={data.brands} />
              {data.accessoryBrands && data.accessoryBrands.length > 0 && (
                <div>
                  <div className="text-[12px] uppercase text-[#6E6E73] tracking-[0.08em] mb-3 font-medium">
                    Gaming & Accessories
                  </div>
                  <BrandGrid title="" brands={data.accessoryBrands} />
                </div>
              )}
            </div>
            <div>
              <div className="text-[12px] uppercase text-[#6E6E73] tracking-[0.08em] mb-3 font-medium">
                Support
              </div>
              <div className="space-y-2">
                {uniqueSupportLinks
                  .filter((link) => link.label.toLowerCase() !== 'contact')
                  .map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className="block text-[17px] text-[#1D1D1F] hover:text-[#0066CC] py-2 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                <a
                  href={WHATSAPP_LINK('Hi ACE, I need help with a product.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="block text-[17px] text-[#1D1D1F] hover:text-[#0066CC] py-2 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(MegaDropdownInner)
