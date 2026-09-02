'use client'
import { useState } from 'react'
import Link from 'next/link'
import ButtonPrimary from '@/components/ui/ButtonPrimary'
import ButtonSecondary from '@/components/ui/ButtonSecondary'
import Toast from '@/components/ui/Toast'
import ProductGallery from '@/components/products/ProductGallery'
import ProductBadges from '@/components/products/ProductBadges'
import {
  buildInquiryLink,
  getAvailabilityLabel,
  getDisplayPrice,
  getProductPath,
  getSpecSummary,
  isPurchasable,
  type Product,
} from '@/lib/catalog'

type Props = {
  /** A canonical product record from the catalog repository. */
  product: Product
  /** Mark the main image as the LCP/above-the-fold image (use sparingly). */
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: Props) {
  const [toast, setToast] = useState(false)

  const specSummary = getSpecSummary(product)
  const waLink = buildInquiryLink(product)
  const dp = getDisplayPrice(product)
  const detailHref = getProductPath(product)
  const purchasable = isPurchasable(product)

  return (
    <>
      {/* h-full + flex column keeps every card in a grid row the same height,
          with the CTA row pinned to the bottom regardless of title length. */}
      <div className="ace-glass overflow-hidden group transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-ace-glow-strong hover:border-ace-electric/30 shadow-ace-card relative flex flex-col h-full">
        <ProductGallery product={product} priority={priority} />

        <div className="p-5 md:p-6 flex flex-col flex-1 min-w-0">
          <Link
            href={detailHref}
            className="font-heading text-lg md:text-xl font-medium text-ace-white hover:text-ace-electric transition-colors block line-clamp-2 break-words"
          >
            {product.name}
          </Link>
          <p className="text-ace-silver text-sm mt-1 line-clamp-2 break-words">{specSummary}</p>

          <ProductBadges badges={product.badges} className="mt-3" size="xs" />

          {!purchasable && (
            <p className="mt-2 inline-flex self-start items-center rounded-lg bg-amber-500/10 border border-amber-500/25 px-3 py-1.5 text-amber-700 text-xs font-medium">
              {getAvailabilityLabel(product)}
            </p>
          )}

          {product.notes && (
            <p className="mt-2 inline-flex items-center w-full rounded-lg bg-black/[0.03] border border-ace-glass-border px-3 py-1.5 text-ace-silver text-xs break-words">
              {product.notes}
            </p>
          )}

          {/* mt-auto pushes price + CTAs to the bottom of the card. */}
          <p className="text-ace-white font-semibold mt-auto pt-3">
            {dp.show && dp.formatted ? (
              <>
                {dp.formattedWas && (
                  <span className="text-ace-silver line-through text-sm font-normal mr-2">{dp.formattedWas}</span>
                )}
                {dp.formatted}
              </>
            ) : (
              dp.fallbackLabel
            )}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-4">
            <ButtonPrimary size="sm" href={detailHref}>View Details</ButtonPrimary>
            <ButtonSecondary
              size="sm"
              href={waLink}
              target="_blank"
              onClick={() => setToast(true)}
              aria-label={`Ask ACE about the ${product.name} on WhatsApp`}
            >
              Quick Inquiry
            </ButtonSecondary>
          </div>
        </div>
      </div>

      <Toast show={toast} onClose={() => setToast(false)} />
    </>
  )
}
