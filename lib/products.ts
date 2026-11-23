export interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  salePrice?: number
  specs: string[]
  images: string[]
  image?: string
  type: 'laptop' | 'smartphone'
}

export type ProductCategory =
  | 'All'
  | 'Gaming'
  | 'Business'
  | 'Student'
  | 'Ultrabook'
  | 'Flagship'
  | 'Mid-range'
  | 'Budget'

export interface DisplayPriceResult {
  show: boolean
  price: string
  wasPrice?: string
}

export function getDisplayPrice(product: Product): DisplayPriceResult {
  const hasSale = product.salePrice !== undefined && product.salePrice < product.price
  const targetPrice = hasSale ? product.salePrice! : product.price

  if (targetPrice > 5000) {
    return { show: false, price: 'Ask on WhatsApp' }
  }

  return {
    show: true,
    price: formatGHS(targetPrice),
    wasPrice: hasSale ? formatGHS(product.price) : undefined,
  }
}

export function formatGHS(num: number): string {
  return 'GH₵ ' + num.toLocaleString('en-US')
}

export function whatsappText(product: Product): string {
  const targetPrice = product.salePrice !== undefined && product.salePrice < product.price
    ? product.salePrice
    : product.price
  const priceString = targetPrice > 5000 ? 'Price on Inquiry' : formatGHS(targetPrice)
  const message = `Hello ACE Electronics, I'm interested in buying the ${product.name} (${product.category} Section).

Details:
- Product Reference: ${product.id}
- Current Listing Status: ${priceString}

Please confirm availability and delivery timelines to my location. Thanks!`
  return encodeURIComponent(message)
}
