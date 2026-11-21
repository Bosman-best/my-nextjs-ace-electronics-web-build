'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product, getDisplayPrice } from '@/lib/products'

type Props = {
  product?: Product
  name?: string
  specs?: string
  price?: string
  badge?: string
}

export default function ProductCard({ product, name, specs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imgError, setImgError] = useState(false)
  const pName = product?.name ?? name ?? ''
  const gallery = product?.images?.length ? product.images : (product?.image ? [product.image] : [])
  const dp = product ? getDisplayPrice(product) : { show: false, price: '', wasPrice: undefined }
  const detailHref = product ? `/products/${product.id}` : '#'

  function moveGallery(event: React.MouseEvent, direction: number) {
    event.preventDefault()
    event.stopPropagation()
    setImgError(false)
    setActiveIndex((index) => (index + direction + gallery.length) % gallery.length)
  }

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden rounded-[20px] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(23,43,77,0.09)]">
        <Link href={detailHref} aria-label={`View ${pName}`} className="block">
          <div className="relative aspect-[1.12/1] overflow-hidden rounded-[20px] bg-[#F3F5F8]">
            {activeSrc && !imgError ? (
              <Image src={activeSrc} alt={pName} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-contain p-3 sm:p-6 transition-transform duration-500 group-hover:scale-[1.04]" onError={() => setImgError(true)} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-[#7A8494]">Product photo coming soon</div>
            )}
          </div>
          <div className="px-1 pb-3 pt-4 sm:px-2 sm:pb-4">
            {product && <p className="mb-1.5 truncate text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8290A3]">{product.brand} <span className="px-1 text-[#C2CAD5]">/</span> {product.category}</p>}
            <h3 className="min-h-[38px] line-clamp-2 font-heading text-[12px] sm:text-[15px] font-semibold leading-[1.45] tracking-[-0.015em] text-[#172B4D]">{pName}</h3>
            {product?.specs?.length ? <p className="mt-1.5 min-h-[30px] line-clamp-2 text-[10px] sm:text-[11px] leading-[1.55] text-[#8792A2]">{product.specs.slice(0, 2).join(' · ')}</p> : specs ? <p className="mt-1.5 min-h-[30px] line-clamp-2 text-[10px] sm:text-[11px] text-[#8792A2]">{specs}</p> : null}
            <div className="mt-3 flex min-h-[22px] flex-wrap items-baseline gap-x-2 gap-y-1">
              {dp.show ? <><span className="text-[13px] sm:text-[15px] font-bold tracking-[-0.02em] text-[#172B4D]">{dp.price}</span>{dp.wasPrice && <span className="text-[10px] text-[#98A2B1] line-through">{dp.wasPrice}</span>}</> : <span className="text-[12px] sm:text-[13px] font-semibold text-[#1265CF]">Ask for price</span>}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-[#1265CF]">View details <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>
        {gallery.length > 1 && <div className="pointer-events-none absolute right-2 top-2 flex gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <button type="button" onClick={(event) => moveGallery(event, -1)} aria-label="Previous photo" className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full border border-[#E1E6EE] bg-white/95 text-[#172B4D] shadow-sm"><ChevronLeft size={14} /></button>
          <button type="button" onClick={(event) => moveGallery(event, 1)} aria-label="Next photo" className="pointer-events-auto flex h-7 w-7 items-center justify-center rounded-full border border-[#E1E6EE] bg-white/95 text-[#172B4D] shadow-sm"><ChevronRight size={14} /></button>
        </div>}
      </div>
    </article>
  )
}
