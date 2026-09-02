// ACE Electronics — Controlled vocabularies for the product catalog.
//
// These are the ONLY allowed values for category, subcategory, condition,
// availability and badge tone across the entire application (storefront today,
// admin panel later). Never hardcode raw strings in a page or component —
// import from here so a value can only ever be added/renamed in one place.

/* ------------------------------------------------------------------ */
/* Category                                                            */
/* ------------------------------------------------------------------ */

export const PRODUCT_CATEGORIES = ['laptops', 'smartphones', 'accessories', 'gaming'] as const
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export interface CategoryDefinition {
  value: ProductCategory
  label: string
  /** Singular noun used in copy, e.g. "laptop". */
  singular: string
  /** Storefront listing route for this category. */
  href: string
  emoji: string
  /** Allowed subcategory values for this category. */
  subcategories: readonly ProductSubcategory[]
}

/* ------------------------------------------------------------------ */
/* Subcategory                                                         */
/* ------------------------------------------------------------------ */

export const PRODUCT_SUBCATEGORIES = [
  'gaming',
  'business',
  'student',
  'ultrabook',
  'flagship',
  'mid_range',
  'budget',
  'audio',
  'power',
  'protection',
  'wearables',
  'bags',
  'console',
] as const
export type ProductSubcategory = (typeof PRODUCT_SUBCATEGORIES)[number]

export const SUBCATEGORY_LABELS: Record<ProductSubcategory, string> = {
  gaming: 'Gaming',
  business: 'Business',
  student: 'Student',
  ultrabook: 'Ultrabook',
  flagship: 'Flagship',
  mid_range: 'Mid-range',
  budget: 'Budget',
  audio: 'Audio',
  power: 'Power',
  protection: 'Protection',
  wearables: 'Wearables',
  bags: 'Bags & Sleeves',
  console: 'Consoles',
}

export const CATEGORY_DEFINITIONS: Record<ProductCategory, CategoryDefinition> = {
  laptops: {
    value: 'laptops',
    label: 'Laptops',
    singular: 'laptop',
    href: '/laptops',
    emoji: '💻',
    subcategories: ['gaming', 'business', 'student', 'ultrabook'],
  },
  smartphones: {
    value: 'smartphones',
    label: 'Smartphones',
    singular: 'smartphone',
    href: '/smartphones',
    emoji: '📱',
    subcategories: ['flagship', 'mid_range', 'budget'],
  },
  accessories: {
    value: 'accessories',
    label: 'Accessories',
    singular: 'accessory',
    href: '/accessories',
    emoji: '🎧',
    subcategories: ['audio', 'power', 'protection', 'wearables', 'bags'],
  },
  gaming: {
    value: 'gaming',
    label: 'Gaming Devices',
    singular: 'gaming device',
    href: '/gaming',
    emoji: '🎮',
    subcategories: ['console', 'gaming'],
  },
}

export const CATEGORY_LIST: CategoryDefinition[] = PRODUCT_CATEGORIES.map(c => CATEGORY_DEFINITIONS[c])

export function categoryLabel(c: ProductCategory): string {
  return CATEGORY_DEFINITIONS[c].label
}
export function subcategoryLabel(s: ProductSubcategory | undefined): string {
  return s ? SUBCATEGORY_LABELS[s] : ''
}
export function isProductCategory(v: unknown): v is ProductCategory {
  return typeof v === 'string' && (PRODUCT_CATEGORIES as readonly string[]).includes(v)
}
export function isProductSubcategory(v: unknown): v is ProductSubcategory {
  return typeof v === 'string' && (PRODUCT_SUBCATEGORIES as readonly string[]).includes(v)
}

/* ------------------------------------------------------------------ */
/* Condition                                                           */
/* ------------------------------------------------------------------ */

export const PRODUCT_CONDITIONS = ['new', 'used', 'refurbished', 'open_box'] as const
export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number]

export const CONDITION_LABELS: Record<ProductCondition, string> = {
  new: 'Brand New',
  used: 'Used',
  refurbished: 'Refurbished',
  open_box: 'Open Box',
}

/** schema.org itemCondition mapping — used by product structured data. */
export const CONDITION_SCHEMA_URL: Record<ProductCondition, string> = {
  new: 'https://schema.org/NewCondition',
  used: 'https://schema.org/UsedCondition',
  refurbished: 'https://schema.org/RefurbishedCondition',
  open_box: 'https://schema.org/NewCondition',
}

export function conditionLabel(c: ProductCondition | undefined): string {
  return c ? CONDITION_LABELS[c] : ''
}
export function isProductCondition(v: unknown): v is ProductCondition {
  return typeof v === 'string' && (PRODUCT_CONDITIONS as readonly string[]).includes(v)
}

/* ------------------------------------------------------------------ */
/* Availability                                                        */
/* ------------------------------------------------------------------ */

export const PRODUCT_AVAILABILITIES = ['in_stock', 'out_of_stock', 'reserved', 'coming_soon'] as const
export type ProductAvailability = (typeof PRODUCT_AVAILABILITIES)[number]

export const AVAILABILITY_LABELS: Record<ProductAvailability, string> = {
  in_stock: 'In stock',
  out_of_stock: 'Out of stock',
  reserved: 'Reserved',
  coming_soon: 'Coming soon',
}

export const AVAILABILITY_SCHEMA_URL: Record<ProductAvailability, string> = {
  in_stock: 'https://schema.org/InStock',
  out_of_stock: 'https://schema.org/OutOfStock',
  reserved: 'https://schema.org/LimitedAvailability',
  coming_soon: 'https://schema.org/PreOrder',
}

/** Availability states a customer can still buy/reserve today. */
export const PURCHASABLE_AVAILABILITIES: readonly ProductAvailability[] = ['in_stock', 'reserved']

export function availabilityLabel(a: ProductAvailability): string {
  return AVAILABILITY_LABELS[a]
}
export function isProductAvailability(v: unknown): v is ProductAvailability {
  return typeof v === 'string' && (PRODUCT_AVAILABILITIES as readonly string[]).includes(v)
}

/* ------------------------------------------------------------------ */
/* Currency                                                            */
/* ------------------------------------------------------------------ */

export const SUPPORTED_CURRENCIES = ['GHS'] as const
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number]
export const DEFAULT_CURRENCY: CurrencyCode = 'GHS'

/* ------------------------------------------------------------------ */
/* Badge tones                                                         */
/* ------------------------------------------------------------------ */

export const BADGE_TONES = ['neutral', 'accent', 'positive', 'warning'] as const
export type BadgeTone = (typeof BADGE_TONES)[number]
