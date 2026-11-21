'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product, getDisplayPrice, formatGHS } from '@/lib/products'

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

  function next(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    setActiveIndex((index) => (index + 1) % gallery.length)
  }

  function prev(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length)
  }

  return (
    <article className="group relative">
      <Link href={detailHref} aria-label={`View ${pName}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[#F5F5F7] transition-colors duration-300 group-hover:bg-[#EEF1F4]">
          {activeSrc && !imgError ? (
            <Image
              src={activeSrc}
              alt={pName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-[#6E6E73]">
              Photo coming soon
            </div>
          )}

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D2D2D7] bg-white/90 text-[#1D1D1F] opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D2D2D7] bg-white/90 text-[#1D1D1F] opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>

        <div className="px-1 pb-2 pt-5">
          {product && (
            <p className="mb-1 text-[12px] font-medium uppercase tracking-[0.12em] text-[#6E6E73]">
              {product.brand} · {product.category}
            </p>
          )}
          <h3 className="min-h-[48px] font-heading text-[18px] font-semibold leading-[1.35] text-[#1D1D1F]">
            {pName}
          </h3>

          <div className="mt-4 flex min-h-[28px] items-baseline gap-2">
            {dp.show ? (
              <>
                {dp.wasPrice && <span className="text-[13px] text-[#6E6E73] line-through">{dp.wasPrice}</span>}
                <span className="text-[16px] font-semibold text-[#1D1D1F]">{dp.price}</span>
              </>
            ) : (
              <span className="text-[15px] font-medium text-[#0066CC]">Ask on WhatsApp</span>
            )}
          </div>

          <div className="mt-5 flex items-center gap-1 text-[14px] font-medium text-[#0066CC]">
            View Product <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  )
}