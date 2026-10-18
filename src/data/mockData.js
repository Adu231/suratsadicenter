// Surat Sadi Center - Master Mock Data (Frontend-Only Demo)
// Authentic Maharashtrian & Indian Sarees Catalog

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-paithani',
    name: 'Paithani Sarees',
    marathiName: 'Paithani Saree',
    slug: 'paithani-sarees',
    description: 'Traditional Maharashtrian pure silk Paithani with exquisite peacock, lotus zari motifs and rich pallu.',
    image: '/saree-paithani.png',
    featured: true
  },
  {
    id: 'cat-banarasi',
    name: 'Banarasi Silk Sarees',
    marathiName: 'Banarasi Silk Saree',
    slug: 'banarasi-silk-sarees',
    description: 'Opulent woven Banarasi brocades with royal gold and silver zari artistry from Varanasi.',
    image: '/saree-banarasi.png',
    featured: true
  },
  {
    id: 'cat-kanjivaram',
    name: 'Kanjivaram Silk Sarees',
    marathiName: 'Kanjivaram Silk Saree',
    slug: 'kanjivaram-silk-sarees',
    description: 'Heavy pure mulberry silk sarees with rich temple borders and contrasting zari pallu.',
    image: '/saree-kanjivaram.png',
    featured: true
  },
  {
    id: 'cat-chanderi',
    name: 'Chanderi & Cotton Sarees',
    marathiName: 'Chanderi & Cotton Saree',
    slug: 'chanderi-cotton-sarees',
    description: 'Lightweight, sheer, and breathable handloom sarees ideal for summer celebrations.',
    image: '/saree-chanderi.png',
    featured: false
  },
  {
    id: 'cat-bhagalpuri',
    name: 'Bhagalpuri Tussar Sarees',
    marathiName: 'Bhagalpuri Tussar Saree',
    slug: 'bhagalpuri-sarees',
    description: 'Natural texture Tussar silk sarees celebrated for resilience and understated rustic charm.',
    image: '/saree-bhagalpuri.png',
    featured: false
  },
  {
    id: 'cat-bridal',
    name: 'Bridal Heritage Sarees',
    marathiName: 'Bridal Saree Collection',
    slug: 'bridal-heritage-sarees',
    description: 'Grand royal trousseau sarees crafted specifically for wedding ceremonies and receptions.',
    image: '/saree-bridal.png',
    featured: true
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Royal Peacock Border Pure Silk Paithani Saree',
    marathiName: 'Royal Peacock Pure Silk Paithani Saree',
    slug: 'royal-peacock-border-pure-silk-paithani-saree',
    sku: 'SSC-PAI-001',
    description: 'Handcrafted pure silk Maharani Paithani featuring the iconic Muniya border, traditional Asavali motifs, and an opulent peacock zari pallu. Comes with matching running blouse piece.',
    careInstructions: 'Dry clean only. Store wrapped in a soft muslin cloth away from direct sunlight.',
    category: 'paithani-sarees',
    categoryName: 'Paithani Sarees',
    price: 8999,
    compareAtPrice: 12499,
    fabric: 'Pure Silk',
    colour: 'Deep Maroon',
    occasion: 'Wedding & Bridal',
    blousePiece: 'Included (0.8m running pure silk)',
    length: '6.3 Meters (incl. blouse)',
    images: [
      '/saree-paithani.png',
      '/saree-bridal.png'
    ],
    stockQuantity: 12,
    lowStockThreshold: 3,
    status: 'active',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prod-002',
    name: 'Golden Zari Meenakari Banarasi Silk Saree',
    marathiName: 'Golden Zari Meenakari Banarasi Silk Saree',
    slug: 'golden-zari-meenakari-banarasi-silk-saree',
    sku: 'SSC-BAN-002',
    description: 'Exquisite Katan silk Banarasi saree woven with intricate floral jaal and vibrant Meenakari accents. A heritage heirloom piece for grand wedding receptions.',
    careInstructions: 'Strictly dry clean. Do not spray perfume directly on zari threads.',
    category: 'banarasi-silk-sarees',
    categoryName: 'Banarasi Silk Sarees',
    price: 6499,
    compareAtPrice: 8999,
    fabric: 'Banarasi Katan Silk',
    colour: 'Royal Navy Blue',
    occasion: 'Wedding & Bridal',
    blousePiece: 'Included (0.8m brocade silk)',
    length: '6.3 Meters',
    images: [
      '/saree-banarasi.png',
      '/saree-kanjivaram.png'
    ],
    stockQuantity: 15,
    lowStockThreshold: 4,
    status: 'active',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 'prod-003',
    name: 'Crimson Temple Border Kanjivaram Silk Saree',
    marathiName: 'Crimson Temple Border Kanjivaram Silk Saree',
    slug: 'crimson-temple-border-kanjivaram-silk-saree',
    sku: 'SSC-KAN-003',
    description: 'Authentic South Indian Kanchipuram silk saree featuring traditional Korvai temple borders, dense golden zari body checks, and a grand heavy pallu.',
    careInstructions: 'Dry clean only. Roll rather than folding to protect metallic zari.',
    category: 'kanjivaram-silk-sarees',
    categoryName: 'Kanjivaram Silk Sarees',
    price: 11499,
    compareAtPrice: 15999,
    fabric: 'Mulberry Silk',
    colour: 'Crimson Red',
    occasion: 'Wedding & Bridal',
    blousePiece: 'Included (0.8m contrast gold blouse)',
    length: '6.3 Meters',
    images: [
      '/saree-kanjivaram.png',
      '/saree-bridal.png'
    ],
    stockQuantity: 8,
    lowStockThreshold: 2,
    status: 'active',
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 22
  },
  {
    id: 'prod-004',
    name: 'Handcrafted Chanderi Zari Buti Festive Saree',
    marathiName: 'Handcrafted Chanderi Zari Buti Saree',
    slug: 'handcrafted-chanderi-zari-buti-festive-saree',
    sku: 'SSC-CHA-004',
    description: 'Lightweight and translucent Chanderi silk-cotton saree with delicate hand-woven floral silver butis and a sheer zari border.',
    careInstructions: 'Gentle hand wash in cold water or mild dry clean.',
    category: 'chanderi-cotton-sarees',
    categoryName: 'Chanderi & Cotton Sarees',
    price: 2499,
    compareAtPrice: 3499,
    fabric: 'Chanderi Silk Cotton',
    colour: 'Sage Emerald Green',
    occasion: 'Festive',
    blousePiece: 'Included (0.8m running fabric)',
    length: '6.3 Meters',
    images: [
      '/saree-chanderi.png',
      '/saree-paithani.png'
    ],
    stockQuantity: 24,
    lowStockThreshold: 5,
    status: 'active',
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.7,
    reviewCount: 16
  },
  {
    id: 'prod-005',
    name: 'Bhagalpuri Tussar Silk Hand-Painted Saree',
    marathiName: 'Bhagalpuri Tussar Silk Hand-Painted Saree',
    slug: 'bhagalpuri-tussar-silk-hand-painted-saree',
    sku: 'SSC-BHA-005',
    description: 'Naturally textured pure Tussar silk saree featuring Madhubani hand-painted borders and floral motifs on earthy beige base.',
    careInstructions: 'Dry clean recommended. Iron on reverse side on low heat.',
    category: 'bhagalpuri-sarees',
    categoryName: 'Bhagalpuri Tussar Sarees',
    price: 3899,
    compareAtPrice: 5200,
    fabric: 'Pure Tussar Silk',
    colour: 'Earthy Mustard & Rust',
    occasion: 'Traditional Puja',
    blousePiece: 'Included (0.8m contrast fabric)',
    length: '6.3 Meters',
    images: [
      '/saree-bhagalpuri.png',
      '/saree-chanderi.png'
    ],
    stockQuantity: 10,
    lowStockThreshold: 3,
    status: 'active',
    isFeatured: false,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.6,
    reviewCount: 14
  },
  {
    id: 'prod-006',
    name: 'Maharani Heritage Red Velvet Bridal Saree',
    marathiName: 'Maharani Heritage Red Velvet Bridal Saree',
    slug: 'maharani-heritage-red-velvet-bridal-saree',
    sku: 'SSC-BRI-006',
    description: 'A masterpiece created for the royal bride. Intricately embellished with zardozi, dabka, and pearl embroidery over fine pure silk.',
    careInstructions: 'Strictly dry clean. Preserve in padded muslin saree box.',
    category: 'bridal-heritage-sarees',
    categoryName: 'Bridal Heritage Sarees',
    price: 14999,
    compareAtPrice: 19999,
    fabric: 'Raw Silk & Velvet Zari',
    colour: 'Sindoor Red',
    occasion: 'Wedding & Bridal',
    blousePiece: 'Included (1.0m heavily embroidered designer blouse piece)',
    length: '6.5 Meters',
    images: [
      '/saree-bridal.png',
      '/saree-paithani.png'
    ],
    stockQuantity: 4, // low stock!
    lowStockThreshold: 5,
    status: 'active',
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 41
  },
  {
    id: 'prod-007',
    name: 'Yeola Pure Silk Peshwai Paithani Saree',
    marathiName: 'Yeola Pure Silk Peshwai Paithani Saree',
    slug: 'yeola-pure-silk-peshwai-paithani-saree',
    sku: 'SSC-PAI-007',
    description: 'Traditional Yeola handloom Paithani adorned with vibrant parrot and mor motifs, finished with gold tissue border and pure zari work.',
    careInstructions: 'Dry clean only. Do not spray moisture directly on pallu.',
    category: 'paithani-sarees',
    categoryName: 'Paithani Sarees',
    price: 9800,
    compareAtPrice: 13500,
    fabric: 'Pure Silk',
    colour: 'Emerald Green & Gold',
    occasion: 'Wedding & Bridal',
    blousePiece: 'Included (0.8m running pure silk)',
    length: '6.3 Meters',
    images: [
      '/saree-paithani.png',
      '/saree-banarasi.png'
    ],
    stockQuantity: 7,
    lowStockThreshold: 3,
    status: 'active',
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 19
  },
  {
    id: 'prod-008',
    name: 'Varanasi Rose Gold Tanchoi Banarasi Saree',
    marathiName: 'Varanasi Rose Gold Tanchoi Banarasi Saree',
    slug: 'varanasi-rose-gold-tanchoi-banarasi-saree',
    sku: 'SSC-BAN-008',
    description: 'Ultra-soft Tanchoi weave Banarasi saree woven with satin base and pastel floral motifs. Glides smoothly for evening celebrations.',
    careInstructions: 'Dry clean only. Steam iron lightly if required.',
    category: 'banarasi-silk-sarees',
    categoryName: 'Banarasi Silk Sarees',
    price: 5999,
    compareAtPrice: 7999,
    fabric: 'Banarasi Satin Silk',
    colour: 'Blush Pink & Rose Gold',
    occasion: 'Party Wear',
    blousePiece: 'Included (0.8m brocade)',
    length: '6.3 Meters',
    images: [
      '/saree-banarasi.png',
      '/saree-chanderi.png'
    ],
    stockQuantity: 14,
    lowStockThreshold: 4,
    status: 'active',
    isFeatured: false,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 27
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'SSC-20261012-7A9B',
    orderNumber: 'SSC-20261012-7A9B',
    createdAt: '2026-10-12T14:32:00Z',
    customer: {
      name: 'Pooja Kulkarni',
      phone: '9823456789',
      email: 'pooja@example.com',
      address: 'Flat 302, Sai Shraddha Residency, Station Road',
      city: 'Dharashiv',
      state: 'Maharashtra',
      pincode: '413534'
    },
    items: [
      {
        id: 'prod-001',
        name: 'Royal Peacock Border Pure Silk Paithani Saree',
        marathiName: 'Royal Peacock Border Pure Silk Paithani Saree',
        sku: 'SSC-PAI-001',
        price: 8999,
        quantity: 1,
        image: '/saree-paithani.png'
      }
    ],
    subtotal: 8999,
    shippingFee: 0,
    total: 8999,
    paymentMethod: 'Cash on Delivery (Demo)',
    paymentStatus: 'Pending COD Verification',
    orderStatus: 'Processing',
    trackingNumber: 'TRK-MH-994135',
    notes: 'Please call before delivery.'
  },
  {
    id: 'SSC-20261009-4E2C',
    orderNumber: 'SSC-20261009-4E2C',
    createdAt: '2026-10-09T10:15:00Z',
    customer: {
      name: 'Ananya Deshmukh',
      phone: '9811223344',
      email: 'ananya@example.com',
      address: 'Plot 45, Gulmohar Enclave, Shivaji Nagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411005'
    },
    items: [
      {
        id: 'prod-002',
        name: 'Golden Zari Meenakari Banarasi Silk Saree',
        marathiName: 'Golden Zari Meenakari Banarasi Silk Saree',
        sku: 'SSC-BAN-002',
        price: 6499,
        quantity: 1,
        image: '/saree-banarasi.png'
      }
    ],
    subtotal: 6499,
    shippingFee: 0,
    total: 6499,
    paymentMethod: 'Cash on Delivery (Demo)',
    paymentStatus: 'Paid on Delivery',
    orderStatus: 'Delivered',
    trackingNumber: 'TRK-PN-882014',
    notes: 'Gift packaging requested.'
  }
];

export const DEMO_USERS = {
  customer: {
    id: 'user-pooja',
    name: 'Pooja Kulkarni',
    email: 'pooja@example.com',
    phone: '9823456789',
    role: 'customer',
    address: {
      fullName: 'Pooja Kulkarni',
      phone: '9823456789',
      pincode: '413534',
      addressLine1: 'Flat 302, Sai Shraddha Residency',
      locality: 'Station Road',
      city: 'Dharashiv',
      state: 'Maharashtra'
    }
  },
  admin: {
    id: 'user-admin',
    name: 'Surat Sadi Center Admin',
    email: 'admin@suratsadicenter.com',
    phone: '9876543210',
    role: 'admin',
    address: {
      fullName: 'Surat Sadi Center Storefront',
      phone: '9876543210',
      pincode: '413534',
      addressLine1: 'Main Market Road, Near Gandhi Chowk',
      locality: 'Central Bazar',
      city: 'Dharashiv',
      state: 'Maharashtra'
    }
  }
};
