// ACE Electronics — CANONICAL PRODUCT SEED DATA
//
// This file is the single seed of the product catalog. It is loaded by the
// repository in lib/catalog/repository.ts and is the ONLY place raw product
// records live. Pages, components, search, filters, featured sections and the
// future admin panel all read products through the repository — never from a
// hardcoded list of their own.
//
// IDs (product / image / specification / badge) are permanent and opaque: they
// are NOT derived from names, slugs or image filenames, so a record can be
// renamed or re-slugged without breaking links, inquiries or admin references.
//
// When the admin panel ships, this array becomes the initial migration payload
// for the persistent store; the record shape does not change.

import type { Product } from './types'

export const SEED_PRODUCTS: Product[] = [
  {
    "id": "prd_m5kt9omo8t1rma4o",
    "slug": "hp-elitebook-1030-g7-x360",
    "name": "HP EliteBook 1030 G7 x360",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "HP EliteBook 1030 G7 x360 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-10th Gen, 16GB/256GB, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 5400,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kt9n34jsymg4ct",
        "url": "/products/laptops/hp-elitebook-1030-g2.jpg",
        "alt": "HP EliteBook 1030 G7 x360 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kt9krsnn4ul84p",
        "label": "Processor",
        "value": "i5-10th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kt9ljkarz0udd9",
        "label": "Memory & Storage",
        "value": "16GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kt9mbceknrtbol",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kt9nuw4oqhnixd",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T09:00:00.000Z",
    "updatedAt": "2025-01-06T09:00:00.000Z"
  },
  {
    "id": "prd_m5kt9t9clzugt7wa",
    "slug": "hp-elitebook-840-g7",
    "name": "HP EliteBook 840 G7",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 840 G7 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-10th Gen, 8GB/256GB, Non-touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3800,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kt9rpsd58i95lg",
        "url": "/products/laptops/hp-elitebook-840-g7.jpg",
        "alt": "HP EliteBook 840 G7 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kt9peguia0aqjk",
        "label": "Processor",
        "value": "i5-10th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kt9q688v2fd59y",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kt9qy0v6shda19",
        "label": "Display",
        "value": "Non-touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kt9shk1euo8nhg",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T10:00:00.000Z",
    "updatedAt": "2025-01-06T10:00:00.000Z"
  },
  {
    "id": "prd_m5kt9xw0h5xdld02",
    "slug": "hp-elitebook-830-g7",
    "name": "HP EliteBook 830 G7",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 830 G7 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-10th Gen, 8GB/256GB, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3900,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kt9wcg8bb8at7t",
        "url": "/products/laptops/hp-elitebook-830-g7.jpg",
        "alt": "HP EliteBook 830 G7 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kt9u143q5rcrao",
        "label": "Processor",
        "value": "i5-10th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kt9uswf16nqipb",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kt9vkowgamjy3k",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kt9x48upkmb4kf",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T11:00:00.000Z",
    "updatedAt": "2025-01-06T11:00:00.000Z"
  },
  {
    "id": "prd_m5kta2iolx1jaebe",
    "slug": "hp-elitebook-830-g7-8gb-256gb",
    "name": "HP EliteBook 830 G7",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 830 G7 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-10th Gen, 8GB/256GB, Non-touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3750,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kta0z4wbztyarq",
        "url": "/products/laptops/hp-elitebook-830-g7.jpg",
        "alt": "HP EliteBook 830 G7 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kt9yns4lo27o7t",
        "label": "Processor",
        "value": "i5-10th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kt9zfk5d15w1wr",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kta07cz7pr2n22",
        "label": "Display",
        "value": "Non-touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kta1qw7nvocssu",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T12:00:00.000Z",
    "updatedAt": "2025-01-06T12:00:00.000Z"
  },
  {
    "id": "prd_m5kta75c0peol29e",
    "slug": "hp-elitebook-840-g6",
    "name": "HP EliteBook 840 G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 840 G6 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-8th Gen, 8GB/256GB, Non-touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3450,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kta5ls8yplpyj6",
        "url": "/products/laptops/hp-elitebook-840-g6.jpg",
        "alt": "HP EliteBook 840 G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kta3ag74abgj5q",
        "label": "Processor",
        "value": "i5-8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kta428epcyjcye",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kta4u0i2uh393t",
        "label": "Display",
        "value": "Non-touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kta6dkz3xpg3e7",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T13:00:00.000Z",
    "updatedAt": "2025-01-06T13:00:00.000Z"
  },
  {
    "id": "prd_m5ktabs05y5xgman",
    "slug": "hp-elitebook-830-g8",
    "name": "HP EliteBook 830 G8",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 830 G8 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-11th Gen, 8GB/256GB, Non-touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3850,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktaa8g3z1rzk22",
        "url": "/products/laptops/hp-elitebook-830-g8.jpg",
        "alt": "HP EliteBook 830 G8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kta7x476dxo5jm",
        "label": "Processor",
        "value": "i5-11th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5kta8ow0syeycdo",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5kta9gopk6v2jjy",
        "label": "Display",
        "value": "Non-touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktab08bzasfgqs",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T14:00:00.000Z",
    "updatedAt": "2025-01-06T14:00:00.000Z"
  },
  {
    "id": "prd_m5ktageorcsn5w8w",
    "slug": "hp-elitebook-830-g5-g6",
    "name": "HP EliteBook 830 G5/G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 830 G5/G6 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-8th Gen, 8GB/256GB, Glass Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3750,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktaev4c9216egy",
        "url": "/products/laptops/hp-elitebook-830-g5.jpg",
        "alt": "HP EliteBook 830 G5/G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktacjsinj0e7k1",
        "label": "Processor",
        "value": "i5-8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktadbkcgkw6hg0",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktae3cocccq9hg",
        "label": "Display",
        "value": "Glass Touch",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktafmwgdjsndo7",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T15:00:00.000Z",
    "updatedAt": "2025-01-06T15:00:00.000Z"
  },
  {
    "id": "prd_m5ktalt4q72w0krq",
    "slug": "hp-elitebook-745-g6",
    "name": "HP EliteBook 745 G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 745 G6 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3650,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktak9knqm50k11",
        "url": "/products/laptops/hp-elitebook-745-g6.jpg",
        "alt": "HP EliteBook 745 G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktah6gyt843lue",
        "label": "Processor",
        "value": "Ryzen 5 Pro",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktahy8gtzjntrl",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktaiq0aela2d7r",
        "label": "Graphics",
        "value": "2GB Dedicated",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktajhsq3xhiguk",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktal1cryl01juq",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T16:00:00.000Z",
    "updatedAt": "2025-01-06T16:00:00.000Z"
  },
  {
    "id": "prd_m5ktar7kpo10w04t",
    "slug": "hp-elitebook-745-g6-8gb-256gb",
    "name": "HP EliteBook 745 G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 745 G6 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Non-touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3400,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktapo0ag4ln769",
        "url": "/products/laptops/hp-elitebook-745-g6.jpg",
        "alt": "HP EliteBook 745 G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktamkwwhnqfcjz",
        "label": "Processor",
        "value": "Ryzen 5 Pro",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktanco274s5aih",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktao4gva300pyo",
        "label": "Graphics",
        "value": "2GB Dedicated",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktaow892bhua4r",
        "label": "Display",
        "value": "Non-touch",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktaqfsc4at6tve",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T17:00:00.000Z",
    "updatedAt": "2025-01-06T17:00:00.000Z"
  },
  {
    "id": "prd_m5ktawm0amo47wuq",
    "slug": "hp-elitebook-735-g6",
    "name": "HP EliteBook 735 G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 735 G6 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3650,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktav2glm9sdsfq",
        "url": "/products/laptops/hp-elitebook-735-g6.jpg",
        "alt": "HP EliteBook 735 G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktarzc5xm84va4",
        "label": "Processor",
        "value": "Ryzen 5 Pro",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktasr47ax9h7dn",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktatiwh5nfwbz5",
        "label": "Graphics",
        "value": "2GB Dedicated",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktauaoibjajn1r",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktavu8ci3pw3fj",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T18:00:00.000Z",
    "updatedAt": "2025-01-06T18:00:00.000Z"
  },
  {
    "id": "prd_m5ktb20gjl1gtuw5",
    "slug": "hp-elitebook-845-g8",
    "name": "HP EliteBook 845 G8",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP EliteBook 845 G8 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 5 Pro, 8GB/256GB, 2GB Dedicated, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 4400,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktb0gwl4qhh8f1",
        "url": "/products/laptops/hp-elitebook-845-g8.jpg",
        "alt": "HP EliteBook 845 G8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktaxdstk43eb38",
        "label": "Processor",
        "value": "Ryzen 5 Pro",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktay5kiod3acy6",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktayxcox5ub2dh",
        "label": "Graphics",
        "value": "2GB Dedicated",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktazp4esruzsrs",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktb18oqe5kj0gn",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T19:00:00.000Z",
    "updatedAt": "2025-01-06T19:00:00.000Z"
  },
  {
    "id": "prd_m5ktb6n4p78zbctv",
    "slug": "hp-elitebook-840-g3",
    "name": "HP EliteBook 840 G3",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "student",
    "description": "HP EliteBook 840 G3 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-6th Gen, 8GB/256GB, Keyboard light. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2700,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktb53kjt4a0pec",
        "url": "/products/laptops/hp-elitebook-840-g3.jpg",
        "alt": "HP EliteBook 840 G3 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktb2s88jcza35l",
        "label": "Processor",
        "value": "i5-6th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktb3k01xsie5t7",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktb4bsvtnz08ry",
        "label": "Keyboard",
        "value": "Keyboard light",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktb5vc4ko770o1",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T20:00:00.000Z",
    "updatedAt": "2025-01-06T20:00:00.000Z"
  },
  {
    "id": "prd_m5ktbc1kb7ttnlqp",
    "slug": "hp-elitebook-1030-g2-x360",
    "name": "HP EliteBook 1030 G2 x360",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "HP EliteBook 1030 G2 x360 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-7th Gen, 8GB/256GB, Touch, Face ID. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3850,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktbai0jz5p20vr",
        "url": "/products/laptops/hp-elitebook-1030-g2.jpg",
        "alt": "HP EliteBook 1030 G2 x360 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktb7ewdt0iietm",
        "label": "Processor",
        "value": "i5-7th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktb86oo7bv6d00",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktb8yg6e3nxs6o",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktb9q8hdcq0jlb",
        "label": "Security",
        "value": "Face ID",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktbb9s8lvo25ka",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T21:00:00.000Z",
    "updatedAt": "2025-01-06T21:00:00.000Z"
  },
  {
    "id": "prd_m5ktbi7svmxanc7z",
    "slug": "hp-elitebook-1030-g3-g4-x360",
    "name": "HP EliteBook 1030 G3/G4 x360",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "HP EliteBook 1030 G3/G4 x360 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-8th Gen, 16GB/256GB, Touch, Face ID. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 4700,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": true,
    "active": true,
    "images": [
      {
        "id": "img_m5ktbfwgkr7klo0b",
        "url": "/products/laptops/hp-elitebook-1030-g2.jpg",
        "alt": "HP EliteBook 1030 G3/G4 x360 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktbctcl8wfs24y",
        "label": "Processor",
        "value": "i5-8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktbdl4go3jokb4",
        "label": "Memory & Storage",
        "value": "16GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktbecwv5m22tkd",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktbf4oc11lrplz",
        "label": "Security",
        "value": "Face ID",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktbgo831qbhis5",
        "label": "Featured",
        "tone": "accent"
      },
      {
        "id": "bdg_m5ktbhg0j7qb4p9o",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T22:00:00.000Z",
    "updatedAt": "2025-01-06T22:00:00.000Z"
  },
  {
    "id": "prd_m5ktboe0w0whscn6",
    "slug": "lenovo-yoga-x380",
    "name": "Lenovo Yoga X380",
    "brand": "Lenovo",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "Lenovo Yoga X380 laptop from Lenovo, available at ACE Electronics in Accra, Ghana. i5-8th Gen, 8GB/256GB, x360, Fingerprint, Stylus. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3500,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktbmugd4j3jp7x",
        "url": "/products/laptops/lenovo-yoga-x380.jpg",
        "alt": "Lenovo Yoga X380 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktbizkb8vovrl4",
        "label": "Processor",
        "value": "i5-8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktbjrc7yxsoe2u",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktbkj4hfvjrmko",
        "label": "Form factor",
        "value": "x360",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktblawbiijts9s",
        "label": "Security",
        "value": "Fingerprint",
        "sortOrder": 3
      },
      {
        "id": "spc_m5ktbm2oz640r3v8",
        "label": "Included",
        "value": "Stylus",
        "sortOrder": 4
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktbnm8dq6s4x32",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-06T23:00:00.000Z",
    "updatedAt": "2025-01-06T23:00:00.000Z"
  },
  {
    "id": "prd_m5ktbvc0n6de5tup",
    "slug": "hp-zbook-fury-15-6-g8",
    "name": "HP ZBook Fury 15.6 G8",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP ZBook Fury 15.6 G8 laptop from HP, available at ACE Electronics in Accra, Ghana. i7-11800H, 32GB/512GB, RTX A2000 4GB, B&O, Face ID. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 9000,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": true,
    "active": true,
    "images": [
      {
        "id": "img_m5ktbt0oflylqw45",
        "url": "/products/laptops/hp-zbook-fury-g8.jpg",
        "alt": "HP ZBook Fury 15.6 G8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktbp5s5divu2lk",
        "label": "Processor",
        "value": "i7-11800H",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktbpxk1xaqe1fp",
        "label": "Memory & Storage",
        "value": "32GB/512GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktbqpc4c8zuh7n",
        "label": "Graphics",
        "value": "RTX A2000 4GB",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktbrh4r52i9adj",
        "label": "Audio",
        "value": "B&O",
        "sortOrder": 3
      },
      {
        "id": "spc_m5ktbs8wnx3bdh7b",
        "label": "Security",
        "value": "Face ID",
        "sortOrder": 4
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktbtsgzn2x8nyc",
        "label": "Featured",
        "tone": "accent"
      },
      {
        "id": "bdg_m5ktbuk8tsyhxxsx",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T00:00:00.000Z",
    "updatedAt": "2025-01-07T00:00:00.000Z"
  },
  {
    "id": "prd_m5ktc0qg6oko3op3",
    "slug": "hp-zbook-14-firefly-g8",
    "name": "HP ZBook 14 Firefly G8",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP ZBook 14 Firefly G8 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-11th Gen, 16GB/256GB, Face ID, Fingerprint. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 5000,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktbz6wk3lkukp3",
        "url": "/products/laptops/hp-elitebook-845-g8.jpg",
        "alt": "HP ZBook 14 Firefly G8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktbw3sm26z0vxu",
        "label": "Processor",
        "value": "i5-11th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktbwvklf5c3a18",
        "label": "Memory & Storage",
        "value": "16GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktbxncriiokmb0",
        "label": "Security",
        "value": "Face ID",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktbyf4oobzjvc4",
        "label": "Security",
        "value": "Fingerprint",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktbzyoulesvuxj",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T01:00:00.000Z",
    "updatedAt": "2025-01-07T01:00:00.000Z"
  },
  {
    "id": "prd_m5ktc64wphipqvf0",
    "slug": "hp-envy-15",
    "name": "HP Envy 15",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "HP Envy 15 laptop from HP, available at ACE Electronics in Accra, Ghana. i7-1195G7, 16GB/512GB, x360 Touch, Fingerprint. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 7500,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktc4lci7bsogue",
        "url": "/products/laptops/hp-envy-15.jpg",
        "alt": "HP Envy 15 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktc1i8kbcwj494",
        "label": "Processor",
        "value": "i7-1195G7",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktc2a0y4ugvkhr",
        "label": "Memory & Storage",
        "value": "16GB/512GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktc31s1g9sk8sm",
        "label": "Display",
        "value": "x360 Touch",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktc3tkieyjfhr6",
        "label": "Security",
        "value": "Fingerprint",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktc5d4che3whhd",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T02:00:00.000Z",
    "updatedAt": "2025-01-07T02:00:00.000Z"
  },
  {
    "id": "prd_m5ktcbjcmwhg5p3q",
    "slug": "lenovo-thinkpad-p15s-gen-1",
    "name": "Lenovo ThinkPad P15s Gen 1",
    "brand": "Lenovo",
    "category": "laptops",
    "subcategory": "business",
    "description": "Lenovo ThinkPad P15s Gen 1 laptop from Lenovo, available at ACE Electronics in Accra, Ghana. i7-10th Gen, 24GB/512GB, Quadro P520 2GB, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 6000,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktc9zsjvpttvla",
        "url": "/products/laptops/lenovo-thinkpad-p15s.jpg",
        "alt": "Lenovo ThinkPad P15s Gen 1 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktc6woylfnnfmt",
        "label": "Processor",
        "value": "i7-10th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktc7ogzsj91c1s",
        "label": "Memory & Storage",
        "value": "24GB/512GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktc8g865tcoz43",
        "label": "Graphics",
        "value": "Quadro P520 2GB",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktc980rghsjpfc",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktcarktnsqbqi7",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T03:00:00.000Z",
    "updatedAt": "2025-01-07T03:00:00.000Z"
  },
  {
    "id": "prd_m5ktcgxshcq3eget",
    "slug": "dell-latitude-5330",
    "name": "Dell Latitude 5330",
    "brand": "Dell",
    "category": "laptops",
    "subcategory": "ultrabook",
    "description": "Dell Latitude 5330 laptop from Dell, available at ACE Electronics in Accra, Ghana. i5-12th Gen, 16GB/512GB, x360 Touch, Face ID. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 5950,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktcfe8eq01mf82",
        "url": "/products/laptops/dell-latitude-5330.jpg",
        "alt": "Dell Latitude 5330 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktccb4hfx8q81d",
        "label": "Processor",
        "value": "i5-12th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktcd2w7pg8684g",
        "label": "Memory & Storage",
        "value": "16GB/512GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktcduo5salt4lt",
        "label": "Display",
        "value": "x360 Touch",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktcemgrbt2aa8s",
        "label": "Security",
        "value": "Face ID",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktcg60m9chyxyu",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T04:00:00.000Z",
    "updatedAt": "2025-01-07T04:00:00.000Z"
  },
  {
    "id": "prd_m5ktcn40ovdczlup",
    "slug": "hp-probook-x360-435-g8",
    "name": "HP ProBook x360 435 G8",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "business",
    "description": "HP ProBook x360 435 G8 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 7 Pro 5850U, 16GB/256GB, Touch, Face ID + Fingerprint. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 4900,
    "salePrice": 4600,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 125,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktcksod6x9uve0",
        "url": "/products/laptops/hp-probook-435-g8.jpg",
        "alt": "HP ProBook x360 435 G8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktchpkfq764gla",
        "label": "Processor",
        "value": "Ryzen 7 Pro 5850U",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktcihcfwf62sof",
        "label": "Memory & Storage",
        "value": "16GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktcj94ciwjifzm",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktck0wlt8bfanl",
        "label": "Security",
        "value": "Face ID + Fingerprint",
        "sortOrder": 3
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktclkgss9hkapq",
        "label": "Sale",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktcmc8q5os96al",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "notes": "125pcs in stock, Kumasi",
    "createdAt": "2025-01-07T05:00:00.000Z",
    "updatedAt": "2025-01-07T05:00:00.000Z"
  },
  {
    "id": "prd_m5ktcrqo1fvbfhll",
    "slug": "hp-elitebook-840-g1",
    "name": "HP EliteBook 840 G1",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "student",
    "description": "HP EliteBook 840 G1 laptop from HP, available at ACE Electronics in Accra, Ghana. i5-4th Gen, 4GB/500GB HDD, Fingerprint. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2400,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktcq745k71ly4s",
        "url": "/products/laptops/hp-elitebook-840-g1.jpg",
        "alt": "HP EliteBook 840 G1 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktcnvs3k82m94a",
        "label": "Processor",
        "value": "i5-4th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktconk1i2n4ifa",
        "label": "Memory & Storage",
        "value": "4GB/500GB HDD",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktcpfczn6yqm67",
        "label": "Security",
        "value": "Fingerprint",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktcqywzhdurcf7",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T06:00:00.000Z",
    "updatedAt": "2025-01-07T06:00:00.000Z"
  },
  {
    "id": "prd_m5ktcwdct0bnah6b",
    "slug": "hp-probook-x360-11-g5",
    "name": "HP ProBook x360 11 G5",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "student",
    "description": "HP ProBook x360 11 G5 laptop from HP, available at ACE Electronics in Accra, Ghana. Quadcore Silver 8th Gen, 8GB/128GB, Touch x360. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2300,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktcuts064ymro9",
        "url": "/products/laptops/hp-probook-11-g5.jpg",
        "alt": "HP ProBook x360 11 G5 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktcsig4at7h97i",
        "label": "Processor",
        "value": "Quadcore Silver 8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktcta8t378gedo",
        "label": "Memory & Storage",
        "value": "8GB/128GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktcu207bg5mw6c",
        "label": "Display",
        "value": "Touch x360",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktcvlk02016m1a",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T07:00:00.000Z",
    "updatedAt": "2025-01-07T07:00:00.000Z"
  },
  {
    "id": "prd_m5ktd100b36oh11y",
    "slug": "hp-probook-x360-11-g5-8gb-256gb",
    "name": "HP ProBook x360 11 G5",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "student",
    "description": "HP ProBook x360 11 G5 laptop from HP, available at ACE Electronics in Accra, Ghana. Quadcore Silver 8th Gen, 8GB/256GB, Touch x360. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2600,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktczggk3xtfbtr",
        "url": "/products/laptops/hp-probook-11-g5.jpg",
        "alt": "HP ProBook x360 11 G5 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktcx54s8nzonf1",
        "label": "Processor",
        "value": "Quadcore Silver 8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktcxwwhosziev3",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktcyoocs2fk6mv",
        "label": "Display",
        "value": "Touch x360",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktd088j40qfdg7",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T08:00:00.000Z",
    "updatedAt": "2025-01-07T08:00:00.000Z"
  },
  {
    "id": "prd_m5ktd5mou8jcr489",
    "slug": "dell-latitude-5300",
    "name": "Dell Latitude 5300",
    "brand": "Dell",
    "category": "laptops",
    "subcategory": "business",
    "description": "Dell Latitude 5300 laptop from Dell, available at ACE Electronics in Accra, Ghana. i5-8th Gen, 8GB/256GB, Keyboard light. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3100,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktd434qt66ersy",
        "url": "/products/laptops/dell-latitude-5300.jpg",
        "alt": "Dell Latitude 5300 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktd1rslzbofh29",
        "label": "Processor",
        "value": "i5-8th Gen",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktd2jkwew9riaa",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktd3bc7nk4hvqg",
        "label": "Keyboard",
        "value": "Keyboard light",
        "sortOrder": 2
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktd4uw3yzho3p4",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T09:00:00.000Z",
    "updatedAt": "2025-01-07T09:00:00.000Z"
  },
  {
    "id": "prd_m5ktdbsws2ablsxm",
    "slug": "hp-elitebook-745-g6-8gb-256gb-2",
    "name": "HP EliteBook 745 G6",
    "brand": "HP",
    "category": "laptops",
    "subcategory": "gaming",
    "description": "HP EliteBook 745 G6 laptop from HP, available at ACE Electronics in Accra, Ghana. Ryzen 5 Pro 3500U, 8GB/256GB, Radeon Vega 8, 2GB Dedicated, Touch. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3900,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktda9clefvvgv4",
        "url": "/products/laptops/hp-elitebook-745-g6.jpg",
        "alt": "HP EliteBook 745 G6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": false
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktd6eg7a9cjyyz",
        "label": "Processor",
        "value": "Ryzen 5 Pro 3500U",
        "sortOrder": 0
      },
      {
        "id": "spc_m5ktd7687m0lu6e8",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 1
      },
      {
        "id": "spc_m5ktd7y01sbybk2q",
        "label": "Graphics",
        "value": "Radeon Vega 8",
        "sortOrder": 2
      },
      {
        "id": "spc_m5ktd8psw6mbiu35",
        "label": "Graphics",
        "value": "2GB Dedicated",
        "sortOrder": 3
      },
      {
        "id": "spc_m5ktd9hkx93wcgzm",
        "label": "Display",
        "value": "Touch",
        "sortOrder": 4
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdb14ecfkciu1",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T10:00:00.000Z",
    "updatedAt": "2025-01-07T10:00:00.000Z"
  },
  {
    "id": "prd_m5ktdew0n2ad9nji",
    "slug": "redmi-14c",
    "name": "Redmi 14C",
    "brand": "Redmi",
    "category": "smartphones",
    "subcategory": "budget",
    "description": "Redmi 14C smartphone from Redmi, available at ACE Electronics in Accra, Ghana. 8GB/256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2350,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktddcg4fnu67v4",
        "url": "/products/smartphones/redmi-14c.jpg",
        "alt": "Redmi 14C – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdckoiivrq6vx",
        "label": "Memory & Storage",
        "value": "8GB/256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktde4807g7xg1k",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T11:00:00.000Z",
    "updatedAt": "2025-01-07T11:00:00.000Z"
  },
  {
    "id": "prd_m5ktdjiosedo4fuz",
    "slug": "google-pixel-10",
    "name": "Google Pixel 10",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Google Pixel 10 smartphone from Google, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 9950,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": true,
    "active": true,
    "images": [
      {
        "id": "img_m5ktdgfk8698znut",
        "url": "/products/smartphones/google-pixel-10.jpg",
        "alt": "Google Pixel 10 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdfnsxti8mzy0",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdh7cjrg682pl",
        "label": "Featured",
        "tone": "accent"
      },
      {
        "id": "bdg_m5ktdhz4uhnh9kgp",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktdiqwznq11rom",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T12:00:00.000Z",
    "updatedAt": "2025-01-07T12:00:00.000Z"
  },
  {
    "id": "prd_m5ktdo5cmkcuewng",
    "slug": "google-pixel-10-pro",
    "name": "Google Pixel 10 Pro",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Google Pixel 10 Pro smartphone from Google, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 10450,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": true,
    "active": true,
    "images": [
      {
        "id": "img_m5ktdl28500dz8u9",
        "url": "/products/smartphones/google-pixel-10.jpg",
        "alt": "Google Pixel 10 Pro – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdkagf6g2ky9w",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdlu0caba0er8",
        "label": "Featured",
        "tone": "accent"
      },
      {
        "id": "bdg_m5ktdmlsy6kp0soi",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktdndkzbe0bs61",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T13:00:00.000Z",
    "updatedAt": "2025-01-07T13:00:00.000Z"
  },
  {
    "id": "prd_m5ktds08ozahcuqa",
    "slug": "google-pixel-10a",
    "name": "Google Pixel 10a",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Google Pixel 10a smartphone from Google, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 7550,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktdpow7rspnewe",
        "url": "/products/smartphones/google-pixel-10a.jpg",
        "alt": "Google Pixel 10a – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdox4htyhps2w",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdqgocu8ev693",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktdr8goa5fy9fm",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T14:00:00.000Z",
    "updatedAt": "2025-01-07T14:00:00.000Z"
  },
  {
    "id": "prd_m5ktdvv4kumqvwy8",
    "slug": "google-pixel-9",
    "name": "Google Pixel 9",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Google Pixel 9 smartphone from Google, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 6450,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktdtjsi9t2stfv",
        "url": "/products/smartphones/google-pixel-9.jpg",
        "alt": "Google Pixel 9 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdss0dpizjjow",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdubk2ndouji7",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktdv3c2dxl9h1r",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T15:00:00.000Z",
    "updatedAt": "2025-01-07T15:00:00.000Z"
  },
  {
    "id": "prd_m5ktdzq036kk3nvu",
    "slug": "google-pixel-8",
    "name": "Google Pixel 8",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "mid_range",
    "description": "Google Pixel 8 smartphone from Google, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 4300,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktdxeotbcxojyw",
        "url": "/products/smartphones/google-pixel-8.jpg",
        "alt": "Google Pixel 8 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktdwmw7p09mfur",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktdy6glcghtnib",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5ktdyy8bai1dtbx",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T16:00:00.000Z",
    "updatedAt": "2025-01-07T16:00:00.000Z"
  },
  {
    "id": "prd_m5kte3kwcueit8dt",
    "slug": "google-pixel-6",
    "name": "Google Pixel 6",
    "brand": "Google",
    "category": "smartphones",
    "subcategory": "budget",
    "description": "Google Pixel 6 smartphone from Google, available at ACE Electronics in Accra, Ghana. 256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2950,
    "currency": "GHS",
    "condition": "new",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kte19k1zb7hctj",
        "url": "/products/smartphones/google-pixel-6.jpg",
        "alt": "Google Pixel 6 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kte0hscbxhpifg",
        "label": "Storage",
        "value": "256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kte21cddyva03k",
        "label": "Brand New Sealed",
        "tone": "positive"
      },
      {
        "id": "bdg_m5kte2t4mf80y91s",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T17:00:00.000Z",
    "updatedAt": "2025-01-07T17:00:00.000Z"
  },
  {
    "id": "prd_m5kte6o0ufi1e0w0",
    "slug": "samsung-galaxy-s26-ultra",
    "name": "Samsung Galaxy S26 Ultra",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Samsung Galaxy S26 Ultra smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 15000,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kte54gwp82jsbv",
        "url": "/products/smartphones/samsung-galaxy-s26-ultra.jpg",
        "alt": "Samsung Galaxy S26 Ultra – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kte4co1517tjvq",
        "label": "Storage",
        "value": "256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kte5w81wozzz4x",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T18:00:00.000Z",
    "updatedAt": "2025-01-07T18:00:00.000Z"
  },
  {
    "id": "prd_m5kte9r49ug1fnu8",
    "slug": "samsung-galaxy-s25-ultra",
    "name": "Samsung Galaxy S25 Ultra",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Samsung Galaxy S25 Ultra smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 512GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 12500,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kte87kc72ejzpp",
        "url": "/products/smartphones/samsung-galaxy-s25-ultra.jpg",
        "alt": "Samsung Galaxy S25 Ultra – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kte7fs0i0be7ts",
        "label": "Storage",
        "value": "512GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kte8zcgxla5k39",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T19:00:00.000Z",
    "updatedAt": "2025-01-07T19:00:00.000Z"
  },
  {
    "id": "prd_m5ktecu893vciiru",
    "slug": "samsung-galaxy-s24-plus",
    "name": "Samsung Galaxy S24+",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Samsung Galaxy S24+ smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 5960,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktebaohzmhcwp4",
        "url": "/products/smartphones/samsung-galaxy-s24-plus.jpg",
        "alt": "Samsung Galaxy S24+ – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5kteaiw7elsycx9",
        "label": "Storage",
        "value": "256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktec2gshj2er3e",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T20:00:00.000Z",
    "updatedAt": "2025-01-07T20:00:00.000Z"
  },
  {
    "id": "prd_m5ktefxcviunqgub",
    "slug": "samsung-galaxy-s24-ultra",
    "name": "Samsung Galaxy S24 Ultra",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Samsung Galaxy S24 Ultra smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 512GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 10050,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kteedsfijvjdf9",
        "url": "/products/smartphones/samsung-galaxy-s24-ultra.jpg",
        "alt": "Samsung Galaxy S24 Ultra – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktedm0q24890sc",
        "label": "Storage",
        "value": "512GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktef5kue1xtdjk",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T21:00:00.000Z",
    "updatedAt": "2025-01-07T21:00:00.000Z"
  },
  {
    "id": "prd_m5ktej0ggnzmvs29",
    "slug": "samsung-galaxy-s24-ultra-256gb",
    "name": "Samsung Galaxy S24 Ultra",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "flagship",
    "description": "Samsung Galaxy S24 Ultra smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 9300,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktehgwnfu0ctpf",
        "url": "/products/smartphones/samsung-galaxy-s24-ultra.jpg",
        "alt": "Samsung Galaxy S24 Ultra – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktegp4iduo681t",
        "label": "Storage",
        "value": "256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktei8o58nsj6yp",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T22:00:00.000Z",
    "updatedAt": "2025-01-07T22:00:00.000Z"
  },
  {
    "id": "prd_m5ktem3kpb7r8g1g",
    "slug": "samsung-galaxy-s23-fe",
    "name": "Samsung Galaxy S23 FE",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "mid_range",
    "description": "Samsung Galaxy S23 FE smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 12GB/256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 4000,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktekk0wp36h032",
        "url": "/products/smartphones/samsung-galaxy-s23-fe.jpg",
        "alt": "Samsung Galaxy S23 FE – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktejs8b01jl2o7",
        "label": "Memory & Storage",
        "value": "12GB/256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5ktelbs6bs0s06b",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-07T23:00:00.000Z",
    "updatedAt": "2025-01-07T23:00:00.000Z"
  },
  {
    "id": "prd_m5ktep6ono1fnt4r",
    "slug": "samsung-galaxy-s21-plus",
    "name": "Samsung Galaxy S21+",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "mid_range",
    "description": "Samsung Galaxy S21+ smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 256GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 3200,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktenn49jakcfur",
        "url": "/products/smartphones/samsung-galaxy-s21-plus.jpg",
        "alt": "Samsung Galaxy S21+ – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktemvcpiujklsl",
        "label": "Storage",
        "value": "256GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kteoew4qwcup4m",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-08T00:00:00.000Z",
    "updatedAt": "2025-01-08T00:00:00.000Z"
  },
  {
    "id": "prd_m5ktes9sk0dymsca",
    "slug": "samsung-galaxy-a16",
    "name": "Samsung Galaxy A16",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "budget",
    "description": "Samsung Galaxy A16 smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 128GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 2100,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5kteqq85fubtxv7",
        "url": "/products/smartphones/samsung-galaxy-a16.jpg",
        "alt": "Samsung Galaxy A16 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktepyg21ey6vqp",
        "label": "Storage",
        "value": "128GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kteri02caw430e",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-08T01:00:00.000Z",
    "updatedAt": "2025-01-08T01:00:00.000Z"
  },
  {
    "id": "prd_m5ktevcw60ki6th6",
    "slug": "samsung-galaxy-a21",
    "name": "Samsung Galaxy A21",
    "brand": "Samsung",
    "category": "smartphones",
    "subcategory": "budget",
    "description": "Samsung Galaxy A21 smartphone from Samsung, available at ACE Electronics in Accra, Ghana. 64GB. Sourced from verified suppliers and tested before delivery — message ACE on WhatsApp to confirm current stock, condition and delivery.",
    "price": 1500,
    "currency": "GHS",
    "availability": "in_stock",
    "stockQuantity": 1,
    "featured": false,
    "active": true,
    "images": [
      {
        "id": "img_m5ktettcd4neeyua",
        "url": "/products/smartphones/samsung-galaxy-a21.jpg",
        "alt": "Samsung Galaxy A21 – representative product image",
        "sortOrder": 0,
        "isPrimary": true,
        "aiGenerated": true
      }
    ],
    "specifications": [
      {
        "id": "spc_m5ktet1koltal10z",
        "label": "Storage",
        "value": "64GB",
        "sortOrder": 0
      }
    ],
    "badges": [
      {
        "id": "bdg_m5kteul4xrb82184",
        "label": "1-month warranty",
        "tone": "neutral"
      }
    ],
    "warranty": "1-month ACE seller warranty",
    "createdAt": "2025-01-08T02:00:00.000Z",
    "updatedAt": "2025-01-08T02:00:00.000Z"
  }
]
