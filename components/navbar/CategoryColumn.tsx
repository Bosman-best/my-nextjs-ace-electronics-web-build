'use client'
import Link from 'next/link'
import type { MegaMenuCategory } from '@/lib/megaMenu'

export default function CategoryColumn({
  title,
  categories,
  onClose,
}: {
  title: string
  categories: MegaMenuCategory[]
  onClose: () => void
}) {
  return (
    <div>
      <div className="text-[12px] uppercase text-[#6E6E73] tracking-[0.08em] mb-3 font-medium">
        {title}
      </div>
      <div className="space-y-2">
        {categories.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block text-[17px] text-[#1D1D1F] hover:text-[#0066CC] py-2 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
