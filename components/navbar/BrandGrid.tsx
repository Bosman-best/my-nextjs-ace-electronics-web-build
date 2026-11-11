'use client'
import BrandPlaceholder from '@/components/ui/BrandPlaceholder'
import type { BrandInfo } from '@/lib/megaMenu'

export default function BrandGrid({
  title,
  brands,
}: {
  title?: string
  brands: BrandInfo[]
}) {
  return (
    <div>
      {title ? (
        <div className="text-[12px] uppercase text-[#6E6E73] tracking-[0.08em] mb-3 font-medium">
          {title}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {brands.map(brand => (
          <div key={brand.slug} className="flex items-center gap-3">
            <BrandPlaceholder name={brand.name} logo={brand.logo ?? null} size={44} />
            <span className="text-[15px] text-[#1D1D1F] font-medium">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
