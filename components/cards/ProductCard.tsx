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
  const activeSrc = gallery[activeIndex]
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
      <div className="relative overflow-hidden rounded-2xl border border-[#E8E8ED] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C8D9F5] hover:shadow-[0_12px_32px_rgba(20,39,89,0.09)]">
        <Link href={detailHref} aria-label={`View ${pName}`} className="block">
          <div className="relative aspect-[5/4] overflow-hidden bg-[#F7F8FA]">
            {activeSrc && !imgError ? (
              <Image src={activeSrc} alt={pName} fill sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw" className="object-contain p-3 sm:p-5 transition-transform duration-500 group-hover:scale-[1.035]" onError={() => setImgError(true)} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs text-[#7A8494]">Product photo coming soon</div>
            )}
          </div>
          <div className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
            {product && <p className="mb-1 truncate text-[10px] font-semibold uppercase tracking-[0.11em] text-[#718096] sm:text-[11px]">{product.brand} <span className="px-1 text-[#B5BFCC]">/</span> {product.category}</p>}
            <h3 className="min-h-[40px] line-clamp-2 font-heading text-[13px] font-semibold leading-[1.45] text-[#172B4D] sm:min-h-[48px] sm:text-[16px]">{pName}</h3>
            {product?.specs?.length ? <p className="mt-1 min-h-[32px] line-clamp-2 text-[10px] leading-[1.5] text-[#778295] sm:text-xs">{product.specs.slice(0, 2).join(' · ')}</p> : specs ? <p className="mt-1 min-h-[32px] line-clamp-2 text-[10px] text-[#778295] sm:text-xs">{specs}</p> : null}
            <div className="mt-3 flex min-h-[24px] flex-wrap items-baseline gap-x-2 gap-y-1">
              {dp.show ? <><span className="text-[13px] font-bold text-[#172B4D] sm:text-[15px]">{dp.price}</span>{dp.wasPrice && <span className="text-[10px] text-[#8A94A4] line-through sm:text-xs">{dp.wasPrice}</span>}</> : <span className="text-[12px] font-semibold text-[#1455D9] sm:text-sm">Ask for price</span>}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1455D9] sm:text-xs">View details <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" /></span>
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
