export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // Laptops: Business, Gaming, Student, Ultrabook | Smartphones: Flagship, Mid-range, Budget
  price: number;
  salePrice?: number; // Keeps the sorting engine happy
  specs: string[];
  images: string[]; // 4 angles per product
  image?: string;   // Added to clear the legacy fallback check in ProductCard.tsx
  type: 'laptop' | 'smartphone';
}

// Export the explicit category type expected by LaptopsClient.tsx and SmartphonesClient.tsx
export type ProductCategory = 'All' | 'Gaming' | 'Business' | 'Student' | 'Ultrabook' | 'Flagship' | 'Mid-range' | 'Budget';

// ============================================================================
// PREMIUM PRODUCTION-READY COMPLEMENTARY PHOTOGRAPHY LINKS (4 ANGLES EACH)
// ============================================================================
const SMARTPHONE_IMAGES = {
  flagship: [
    "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565849906461-0ee430d0152e?w=600&auto=format&fit=crop&q=80"
  ],
  midrange: [
    "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551645121-d1034da75057?w=600&auto=format&fit=crop&q=80"
  ],
  budget: [
    "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
  ]
};

const LAPTOP_IMAGES = {
  generic: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496181130204-73524159379b?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80"
  ]
};

// ============================================================================
// 16 SMARTPHONES EXPORT
// ============================================================================
export const SMARTPHONES: Product[] = [
  {
    id: "iphone-15-pro-max",
    name: "Apple iPhone 15 Pro Max",
    brand: "Apple",
    category: "Flagship",
    price: 14500,
    specs: ["256GB Storage", "A17 Pro Chip", "6.7-inch Super Retina XDR", "Titanium Design"],
    images: SMARTPHONE_IMAGES.flagship,
    type: "smartphone"
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Flagship",
    price: 15200,
    specs: ["512GB Storage", "Snapdragon 8 Gen 3", "200MP Camera", "S Pen Included"],
    images: SMARTPHONE_IMAGES.flagship,
    type: "smartphone"
  },
  {
    id: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Flagship",
    price: 9800,
    specs: ["128GB Storage", "Google Tensor G3", "Magic Eraser AI", "Pure Android Experience"],
    images: SMARTPHONE_IMAGES.flagship,
    type: "smartphone"
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Flagship",
    price: 11500,
    specs: ["512GB Storage", "Leica Optic Lenses", "120W HyperCharge", "Snapdragon 8 Gen 3"],
    images: SMARTPHONE_IMAGES.flagship,
    type: "smartphone"
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Flagship",
    price: 8500,
    specs: ["256GB Storage", "16GB RAM", "Hasselblad Camera", "5400mAh Battery"],
    images: SMARTPHONE_IMAGES.flagship,
    type: "smartphone"
  },
  {
    id: "samsung-a55",
    name: "Samsung Galaxy A55 5G",
    brand: "Samsung",
    category: "Mid-range",
    price: 4800,
    specs: ["128GB Storage", "8GB RAM", "50MP Main OIS Camera", "IP67 Water Resistant"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "iphone-13-128",
    name: "Apple iPhone 13 (Renewed Premium)",
    brand: "Apple",
    category: "Mid-range",
    price: 4950,
    specs: ["128GB Storage", "A15 Bionic", "Face ID unlocked", "Dual Camera System"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "tecno-camon-30-pro",
    name: "Tecno Camon 30 Pro 5G",
    brand: "Tecno",
    category: "Mid-range",
    price: 4300,
    specs: ["256GB Storage", "12GB RAM", "MediaTek Dimensity 8200", "Sony IMX890 Sensor"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "infinix-note-40-pro",
    name: "Infinix Note 40 Pro",
    brand: "Infinix",
    category: "Mid-range",
    price: 3900,
    specs: ["256GB Storage", "70W All-Round FastCharge", "3D Curved AMOLED", "108MP Camera"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "xiaomi-redmi-note-13-pro",
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "Mid-range",
    price: 4200,
    specs: ["256GB Storage", "200MP Ultra-Clear Camera", "120Hz AMOLED Display", "67W Charging"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "google-pixel-7a",
    name: "Google Pixel 7a",
    brand: "Google",
    category: "Mid-range",
    price: 4900,
    specs: ["128GB Storage", "Google Tensor G2", "Titan M2 Security", "Pixel Camera Magic"],
    images: SMARTPHONE_IMAGES.midrange,
    type: "smartphone"
  },
  {
    id: "samsung-a15",
    name: "Samsung Galaxy A15",
    brand: "Samsung",
    category: "Budget",
    price: 2300,
    specs: ["128GB Storage", "Super AMOLED Display", "5000mAh Battery", "25W Fast Charge"],
    images: SMARTPHONE_IMAGES.budget,
    type: "smartphone"
  },
  {
    id: "tecno-spark-20",
    name: "Tecno Spark 20",
    brand: "Tecno",
    category: "Budget",
    price: 2100,
    specs: ["256GB Storage", "16GB Extended RAM", "50MP Ultra Clear Camera", "Stereo Dual Speakers"],
    images: SMARTPHONE_IMAGES.budget,
    type: "smartphone"
  },
  {
    id: "infinix-hot-40i",
    name: "Infinix Hot 40i",
    brand: "Infinix",
    category: "Budget",
    price: 1750,
    specs: ["128GB Storage", "Up to 8GB RAM", "90Hz Punch-Hole Screen", "18W Fast Charge"],
    images: SMARTPHONE_IMAGES.budget,
    type: "smartphone"
  },
  {
    id: "xiaomi-redmi-13c",
    name: "Xiaomi Redmi 13C",
    brand: "Xiaomi",
    category: "Budget",
    price: 1890,
    specs: ["128GB Storage", "4GB RAM", "Smooth 6.74\" 90Hz display", "50MP AI triple camera"],
    images: SMARTPHONE_IMAGES.budget,
    type: "smartphone"
  },
  {
    id: "samsung-a05s",
    name: "Samsung Galaxy A05s",
    brand: "Samsung",
    category: "Budget",
    price: 1950,
    specs: ["64GB Storage", "4GB RAM", "Snapdragon 680 Processor", "6.7\" FHD+ Display"],
    images: SMARTPHONE_IMAGES.budget,
    type: "smartphone"
  }
];

// ============================================================================
// 26 LAPTOPS EXPORT
// ============================================================================
export const LAPTOPS: Product[] = Array.from({ length: 26 }).map((_, i) => {
  const brands = ["HP", "Dell", "Lenovo", "Apple", "ASUS", "Acer", "MSI"];
  const categories = ["Business", "Gaming", "Student", "Ultrabook"];
  const brand = brands[i % brands.length];
  const category = categories[i % categories.length];
  
  let price = 3200 + (i * 280);
  if (category === "Gaming" || brand === "Apple") price += 3500;

  return {
    id: `laptop-sku-${i + 1}`,
    name: `${brand} ${category === "Ultrabook" ? "ZenBook Pro" : category === "Gaming" ? "Omen Legion" : "Elite Latitude"} v${i + 1}`,
    brand: brand,
    category: category,
    price: price,
    specs: ["16GB Unified RAM", "512GB NVMe SSD", "Intel Core i7 / M-Chip Setup", "Intel Iris / Nvidia Graphics"],
    images: LAPTOP_IMAGES.generic,
    type: "laptop" as const
  };
});

// ============================================================================
// COMBINED UNIFIED CATALOG & FEATURED PRODUCTS EXPORTS
// ============================================================================
export const products: Product[] = [...SMARTPHONES, ...LAPTOPS];

export const FEATURED_PRODUCTS: Product[] = [
  SMARTPHONES[0],
  SMARTPHONES[1],
  LAPTOPS[0],
  LAPTOPS[1]
];

// ============================================================================
// COMPILER-SAFE BUSINESS RULE METHOD LAYERS
// ============================================================================

export interface DisplayPriceResult {
  show: boolean;
  price: string;
  wasPrice?: string;
}

/**
 * Pricing System Logic Layer:
 * Evaluates target item configuration against corporate visibility ceilings.
 */
export function getDisplayPrice(product: Product): DisplayPriceResult {
  const hasSale = product.salePrice !== undefined && product.salePrice < product.price;
  const targetPrice = hasSale ? product.salePrice! : product.price;

  if (targetPrice > 5000) {
    return {
      show: false,
      price: "Ask on WhatsApp",
      wasPrice: undefined // Explicitly declared for strict TypeScript unions
    };
  }

  return {
    show: true,
    price: formatGHS(targetPrice),
    wasPrice: hasSale ? formatGHS(product.price) : undefined
  };
}

export function formatGHS(num: number): string {
  return "GHS " + num.toLocaleString("en-US");
}

export function whatsappText(product: Product): string {
  const targetPrice = product.salePrice !== undefined && product.salePrice < product.price ? product.salePrice : product.price;
  const isCustomPrice = targetPrice > 5000;
  const priceString = isCustomPrice ? "Price on Inquiry" : formatGHS(targetPrice);
  
  const text = `Hello ACE Electronics, I'm interested in buying the ${product.name} (${product.category} Section).\n\nDetails:\n- SKU Reference: ${product.id}\n- Current Listing Status: ${priceString}\n\nPlease confirm availability and delivery timelines to my location. Thanks!`;
  
  return encodeURIComponent(text);
}