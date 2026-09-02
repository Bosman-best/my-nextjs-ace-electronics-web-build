// ACE Electronics – Real Inventory
// Pricing display rule: price ≤ 5000 → show price, >5000 → "Ask on WhatsApp"
// Sale: show was/now if now ≤ 5000
//
// PRODUCT IMAGE POLICY
// -------------------
// Every product image is GENERIC / REPRESENTATIVE studio imagery of the model —
// it depicts the product design, never a specific owner's/seller's physical unit.
// Products that share the exact same physical chassis/design (regardless of name,
// spec or generation) intentionally share one representative image.
// `imageAiGenerated: true` marks images produced to represent the model; existing
// studio/marketing images are always reused in preference to generating new ones.

export type ProductCategory = 'Gaming' | 'Business' | 'Student' | 'Ultrabook' | 'Flagship' | 'Mid-range' | 'Budget'
export type ProductType = 'laptop' | 'smartphone'

export interface Product {
  id: string
  name: string
  specs: string
  price: number
  salePrice?: number
  category: ProductCategory
  type: ProductType
  featured?: boolean
  notes?: string
  image: string
  images?: string[]
  imageAiGenerated?: boolean
}

const PRICE_SHOW_THRESHOLD = 5000

export function getDisplayPrice(p: Product): { show: boolean; price?: number; wasPrice?: number } {
  const effectivePrice = p.salePrice ?? p.price
  if (effectivePrice > PRICE_SHOW_THRESHOLD) return { show: false }
  const was = p.salePrice && p.price > p.salePrice ? p.price : undefined
  return { show: true, price: effectivePrice, wasPrice: was }
}

export function formatGHS(n: number): string {
  return `GHS ${n.toLocaleString('en-GH')}`
}

export function whatsappText(p: Product): string {
  return `Hi ACE, I'm interested in the ${p.name} - ${p.specs}. Is it in stock? What's the price?`
}

export const LAPTOPS: Product[] = [
  // EliteBook x360 1030 (G2/G3/G4/G7 share the same silver convertible chassis)
  { id: 'lp-01', name: 'HP EliteBook 1030 G7 x360', specs: 'i5-10th Gen, 16GB/256GB, Touch', price: 5400, category: 'Ultrabook', type: 'laptop',
    image: '/products/laptops/hp-elitebook-1030-g2.jpg', imageAiGenerated: false },
  { id: 'lp-02', name: 'HP EliteBook 840 G7', specs: 'i5-10th Gen, 8GB/256GB, Non-touch', price: 3800, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-840-g7.jpg', imageAiGenerated: false },
  // 830 G7 touch & non-touch share the same chassis
  { id: 'lp-03', name: 'HP EliteBook 830 G7', specs: 'i5-10th Gen, 8GB/256GB, Touch', price: 3900, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-830-g7.jpg', imageAiGenerated: false },
  { id: 'lp-04', name: 'HP EliteBook 830 G7', specs: 'i5-10th Gen, 8GB/256GB, Non-touch', price: 3750, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-830-g7.jpg', imageAiGenerated: false },
  { id: 'lp-05', name: 'HP EliteBook 840 G6', specs: 'i5-8th Gen, 8GB/256GB, Non-touch', price: 3450, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-840-g6.jpg', imageAiGenerated: false },
  { id: 'lp-06', name: 'HP EliteBook 830 G8', specs: 'i5-11th Gen, 8GB/256GB, Non-touch', price: 3850, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-830-g8.jpg', imageAiGenerated: false },
  { id: 'lp-07', name: 'HP EliteBook 830 G5/G6', specs: 'i5-8th Gen, 8GB/256GB, Glass Touch', price: 3750, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-830-g5.jpg', imageAiGenerated: false },
  // 745 G6 touch / non-touch / gaming all share the same silver EliteBook chassis
  { id: 'lp-08', name: 'HP EliteBook 745 G6', specs: 'Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Touch', price: 3650, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-745-g6.jpg', imageAiGenerated: false },
  { id: 'lp-09', name: 'HP EliteBook 745 G6', specs: 'Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Non-touch', price: 3400, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-745-g6.jpg', imageAiGenerated: false },
  { id: 'lp-10', name: 'HP EliteBook 735 G6', specs: 'Ryzen 10th Gen, 8GB/256GB, 2GB Dedicated, Touch', price: 3650, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-735-g6.jpg', imageAiGenerated: false },
  { id: 'lp-11', name: 'HP EliteBook 845 G8', specs: 'Ryzen 10th Gen, 8GB/256GB, 2GB Dedicated, Touch', price: 4400, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-845-g8.jpg', imageAiGenerated: false },
  { id: 'lp-12', name: 'HP EliteBook 840 G3', specs: 'i5-6th Gen, 8GB/256GB, Keyboard light', price: 2700, category: 'Student', type: 'laptop',
    image: '/products/laptops/hp-elitebook-840-g3.jpg', imageAiGenerated: true },
  { id: 'lp-13', name: 'HP EliteBook 1030 G2 x360', specs: 'i5-7th Gen, 8GB/256GB, Touch, Face ID', price: 3850, category: 'Ultrabook', type: 'laptop',
    image: '/products/laptops/hp-elitebook-1030-g2.jpg', imageAiGenerated: false },
  { id: 'lp-14', name: 'HP EliteBook 1030 G3/G4 x360', specs: 'i5-8th Gen, 16GB/256GB, Touch, Face ID', price: 4700, category: 'Ultrabook', type: 'laptop', featured: true,
    image: '/products/laptops/hp-elitebook-1030-g2.jpg', imageAiGenerated: false },
  { id: 'lp-15', name: 'Lenovo Yoga X380', specs: 'i5-8th Gen, 8GB/256GB, x360, Fingerprint, Stylus', price: 3500, category: 'Ultrabook', type: 'laptop',
    image: '/products/laptops/lenovo-yoga-x380.jpg', imageAiGenerated: true },
  { id: 'lp-16', name: 'HP ZBook Fury 15.6 G8', specs: 'i7-11800H, 32GB/512GB, RTX A2000 4GB, B&O, Face ID', price: 9000, category: 'Business', type: 'laptop', featured: true,
    image: '/products/laptops/hp-zbook-fury-g8.jpg', imageAiGenerated: true },
  // ZBook Firefly 14 G8 shares the same 14" silver chassis as the EliteBook 845/840 G8
  { id: 'lp-17', name: 'HP ZBook 14 Firefly G8', specs: 'i5-11th Gen, 16GB/256GB, Face ID, Fingerprint', price: 5000, category: 'Business', type: 'laptop',
    image: '/products/laptops/hp-elitebook-845-g8.jpg', imageAiGenerated: false },
  { id: 'lp-18', name: 'HP Envy 15', specs: 'i7-1195G7, 16GB/512GB, x360 Touch, Fingerprint', price: 7500, category: 'Ultrabook', type: 'laptop',
    image: '/products/laptops/hp-envy-15.jpg', imageAiGenerated: true },
  { id: 'lp-19', name: 'Lenovo ThinkPad P15s Gen 1', specs: 'i7-10th Gen, 24GB/512GB, Quadro P520 2GB, Touch', price: 6000, category: 'Business', type: 'laptop',
    image: '/products/laptops/lenovo-thinkpad-p15s.jpg', imageAiGenerated: true },
  { id: 'lp-20', name: 'Dell Latitude 5330', specs: 'i5-12th Gen, 16GB/512GB, x360 Touch, Face ID', price: 5950, category: 'Ultrabook', type: 'laptop',
    image: '/products/laptops/dell-latitude-5330.jpg', imageAiGenerated: true },
  { id: 'lp-21', name: 'HP ProBook x360 435 G8', specs: 'Ryzen 7 Pro 5850U, 16GB/256GB, Touch, Face ID + Fingerprint', price: 4900, salePrice: 4600, category: 'Business', type: 'laptop', notes: '125pcs in stock, Kumasi',
    image: '/products/laptops/hp-probook-435-g8.jpg', imageAiGenerated: true },
  { id: 'lp-22', name: 'HP EliteBook 840 G1', specs: 'i5-4th Gen, 4GB/500GB HDD, Fingerprint', price: 2400, category: 'Student', type: 'laptop',
    image: '/products/laptops/hp-elitebook-840-g1.jpg', imageAiGenerated: true },
  // ProBook x360 11 G5 (both capacities share the same chassis)
  { id: 'lp-23', name: 'HP ProBook x360 11 G5', specs: 'Quadcore Silver 8th Gen, 8GB/128GB, Touch x360', price: 2300, category: 'Student', type: 'laptop',
    image: '/products/laptops/hp-probook-11-g5.jpg', imageAiGenerated: true },
  { id: 'lp-24', name: 'HP ProBook x360 11 G5', specs: 'Quadcore Silver 8th Gen, 8GB/256GB, Touch x360', price: 2600, category: 'Student', type: 'laptop',
    image: '/products/laptops/hp-probook-11-g5.jpg', imageAiGenerated: true },
  { id: 'lp-25', name: 'Dell Latitude 5300', specs: 'i5-8th Gen, 8GB/256GB, Keyboard light', price: 3100, category: 'Business', type: 'laptop',
    image: '/products/laptops/dell-latitude-5300.jpg', imageAiGenerated: true },
  { id: 'lp-26', name: 'HP EliteBook 745 G6', specs: 'Ryzen 5 Pro 3500U, 8GB/256GB, Radeon Vega 8, 2GB Dedicated, Touch', price: 3900, category: 'Gaming', type: 'laptop',
    image: '/products/laptops/hp-elitebook-745-g6.jpg', imageAiGenerated: false },
]

// All 16 smartphones – generic representative / studio imagery
export const SMARTPHONES: Product[] = [
  { id: 'sp-01', name: 'Redmi 14C', specs: '8GB/256GB', price: 2350, category: 'Budget', type: 'smartphone',
    image: '/products/smartphones/redmi-14c.jpg', imageAiGenerated: true },
  { id: 'sp-02', name: 'Google Pixel 10', specs: '128GB, Brand new sealed', price: 9950, category: 'Flagship', type: 'smartphone', featured: true,
    image: '/products/smartphones/google-pixel-10.jpg', imageAiGenerated: true },
  // Pixel 10 Pro shares the Pixel 10 design (official Pixel 10 line-up representative)
  { id: 'sp-03', name: 'Google Pixel 10 Pro', specs: '128GB, Brand new sealed', price: 10450, category: 'Flagship', type: 'smartphone', featured: true,
    image: '/products/smartphones/google-pixel-10.jpg', imageAiGenerated: true },
  { id: 'sp-04', name: 'Google Pixel 10a', specs: '128GB, Brand new sealed', price: 7550, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/google-pixel-10a.jpg', imageAiGenerated: true },
  { id: 'sp-05', name: 'Google Pixel 9', specs: '128GB, Brand new sealed', price: 6450, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/google-pixel-9.jpg', imageAiGenerated: true },
  { id: 'sp-06', name: 'Google Pixel 8', specs: '128GB, Brand new sealed', price: 4300, category: 'Mid-range', type: 'smartphone',
    image: '/products/smartphones/google-pixel-8.jpg', imageAiGenerated: true },
  { id: 'sp-07', name: 'Google Pixel 6', specs: '256GB, Brand new sealed', price: 2950, category: 'Budget', type: 'smartphone',
    image: '/products/smartphones/google-pixel-6.jpg', imageAiGenerated: true },
  { id: 'sp-08', name: 'Samsung Galaxy S26 Ultra', specs: '256GB', price: 15000, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s26-ultra.jpg', imageAiGenerated: true },
  { id: 'sp-09', name: 'Samsung Galaxy S25 Ultra', specs: '512GB', price: 12500, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s25-ultra.jpg', imageAiGenerated: true },
  { id: 'sp-10', name: 'Samsung Galaxy S24+', specs: '256GB', price: 5960, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s24-plus.jpg', imageAiGenerated: true },
  // S24 Ultra 512GB & 256GB are the same physical design → share one representative image
  { id: 'sp-11', name: 'Samsung Galaxy S24 Ultra', specs: '512GB', price: 10050, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s24-ultra.jpg', imageAiGenerated: true },
  { id: 'sp-12', name: 'Samsung Galaxy S24 Ultra', specs: '256GB', price: 9300, category: 'Flagship', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s24-ultra.jpg', imageAiGenerated: true },
  { id: 'sp-13', name: 'Samsung Galaxy S23 FE', specs: '12GB/256GB', price: 4000, category: 'Mid-range', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s23-fe.jpg', imageAiGenerated: true },
  { id: 'sp-14', name: 'Samsung Galaxy S21+', specs: '256GB', price: 3200, category: 'Mid-range', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-s21-plus.jpg', imageAiGenerated: true },
  { id: 'sp-15', name: 'Samsung Galaxy A16', specs: '128GB', price: 2100, category: 'Budget', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-a16.jpg', imageAiGenerated: true },
  { id: 'sp-16', name: 'Samsung Galaxy A21', specs: '64GB', price: 1500, category: 'Budget', type: 'smartphone',
    image: '/products/smartphones/samsung-galaxy-a21.jpg', imageAiGenerated: true },
]

export const FEATURED_PRODUCTS = [
  ...LAPTOPS.filter(p => p.featured),
  ...SMARTPHONES.filter(p => p.featured),
]

export const ALL_PRODUCTS: Product[] = [...LAPTOPS, ...SMARTPHONES]

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.type === product.type)
    .slice(0, limit)
}
