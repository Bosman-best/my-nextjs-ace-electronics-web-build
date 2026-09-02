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
      <div className="ace-glass overflow-hidden group transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-ace-glow-strong hover:border-ace-electric/30 shadow-ace-card relative">
        <ProductGallery product={product} priority={priority} />

        <div className="p-6">
          <Link href={detailHref} className="font-heading text-xl font-medium text-ace-white hover:text-ace-electric transition-colors block">
            {product.name}
          </Link>
          <p className="text-ace-silver text-sm mt-1">{specSummary}</p>

          <ProductBadges badges={product.badges} className="mt-3" size="xs" />

          {!purchasable && (
            <p className="mt-2 inline-flex items-center rounded-lg bg-ace-black/60 border border-ace-glass-border px-3 py-1.5 text-ace-silver text-xs">
              {getAvailabilityLabel(product)}
            </p>
          )}

          {product.notes && (
            <p className="mt-2 inline-flex items-center w-full rounded-lg bg-ace-black/60 border border-ace-glass-border px-3 py-1.5 text-ace-silver text-xs">
              {product.notes}
            </p>
          )}

          <p className="text-ace-white font-semibold mt-3">
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

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <ButtonPrimary size="sm" href={detailHref}>View Details</ButtonPrimary>
            <ButtonSecondary size="sm" href={waLink} target="_blank" onClick={() => setToast(true)}>Quick Inquiry</ButtonSecondary>
          </div>
        </div>
      </div>

      <Toast show={toast} onClose={() => setToast(false)} />
    </>
  )
}
