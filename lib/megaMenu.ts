export type MegaMenuType = 'Laptops' | 'Smartphones'

export interface MegaMenuCategory {
  label: string
  href: string
}

export interface BrandInfo {
  name: string
  slug: string
  logo?: string | null
}

export interface MegaMenuData {
  categories: MegaMenuCategory[]
  brands: BrandInfo[]
  accessoryBrands: BrandInfo[]
  supportLinks: MegaMenuCategory[]
}

export const MEGA_MENU: Record<MegaMenuType, MegaMenuData> = {
  Laptops: {
    categories: [
      { label: 'Business', href: '/laptops?category=Business' },
      { label: 'Gaming', href: '/laptops?category=Gaming' },
      { label: 'Student', href: '/laptops?category=Student' },
      { label: 'Ultrabook', href: '/laptops?category=Ultrabook' },
    ],
    brands: [
      { name: 'HP', slug: 'hp' },
      { name: 'Dell', slug: 'dell' },
      { name: 'Lenovo', slug: 'lenovo' },
      { name: 'Apple', slug: 'apple' },
      { name: 'ASUS', slug: 'asus' },
      { name: 'Acer', slug: 'acer' },
      { name: 'MSI', slug: 'msi' },
    ],
    accessoryBrands: [
      { name: 'ASUS ROG', slug: 'asus-rog' },
      { name: 'MSI', slug: 'msi' },
      { name: 'Logitech', slug: 'logitech' },
      { name: 'Razer', slug: 'razer' },
      { name: 'Corsair', slug: 'corsair' },
    ],
    supportLinks: [
      { label: 'Warranty', href: '/warranty' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  Smartphones: {
    categories: [
      { label: 'Flagship', href: '/smartphones?category=Flagship' },
      { label: 'Mid-range', href: '/smartphones?category=Mid-range' },
      { label: 'Budget', href: '/smartphones?category=Budget' },
    ],
    brands: [
      { name: 'Samsung', slug: 'samsung' },
      { name: 'Apple', slug: 'apple' },
      { name: 'Xiaomi', slug: 'xiaomi' },
      { name: 'Google', slug: 'google' },
      { name: 'OnePlus', slug: 'oneplus' },
      { name: 'Tecno', slug: 'tecno' },
      { name: 'Infinix', slug: 'infinix' },
    ],
    accessoryBrands: [],
    supportLinks: [
      { label: 'Warranty', href: '/warranty' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}