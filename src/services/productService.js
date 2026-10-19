import { storageService } from './storageService.js';

export const productService = {
  async getProducts(params = {}) {
    let products = storageService.getProducts();

    // Category filter
    if (params.category && params.category !== 'all') {
      products = products.filter(p => p.category === params.category || p.categorySlug === params.category);
    }

    // Fabric filter
    if (params.fabric && params.fabric.length > 0) {
      const fabrics = Array.isArray(params.fabric) ? params.fabric : params.fabric.split(',');
      products = products.filter(p => fabrics.includes(p.fabric));
    }

    // Occasion filter
    if (params.occasion && params.occasion.length > 0) {
      const occasions = Array.isArray(params.occasion) ? params.occasion : params.occasion.split(',');
      products = products.filter(p => occasions.includes(p.occasion));
    }

    // Price range
    if (params.minPrice !== undefined) {
      products = products.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice !== undefined) {
      products = products.filter(p => p.price <= Number(params.maxPrice));
    }

    // In stock only
    if (params.inStockOnly === true || params.inStockOnly === 'true') {
      products = products.filter(p => p.stockQuantity > 0);
    }

    // Keyword Search
    if (params.search && params.search.trim()) {
      const query = params.search.trim().toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        (p.marathiName && p.marathiName.toLowerCase().includes(query)) ||
        p.fabric.toLowerCase().includes(query) ||
        p.occasion.toLowerCase().includes(query) ||
        p.colour.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (params.sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'bestseller') {
      products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (params.sort === 'newest') {
      products.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return {
      products,
      total: products.length,
      facets: {
        fabrics: ['Pure Silk', 'Banarasi Katan Silk', 'Mulberry Silk', 'Chanderi Silk Cotton', 'Pure Tussar Silk', 'Raw Silk & Velvet Zari', 'Banarasi Satin Silk'],
        occasions: ['Wedding & Bridal', 'Festive', 'Traditional Puja', 'Party Wear']
      }
    };
  },

  async getProductBySlug(slug) {
    return storageService.getProductBySlug(slug);
  },

  async getProductById(id) {
    return storageService.getProductById(id);
  },

  async getHomepageCollections() {
    const products = storageService.getProducts();
    return {
      featured: products.filter(p => p.isFeatured),
      bestsellers: products.filter(p => p.isBestseller),
      newArrivals: products.filter(p => p.isNewArrival)
    };
  },

  async getCategories() {
    return storageService.getCategories();
  },

  async saveProduct(productData) {
    return storageService.saveProduct(productData);
  },

  async deleteProduct(productId) {
    return storageService.deleteProduct(productId);
  },

  async updateStock(productId, quantity) {
    return storageService.updateStock(productId, quantity);
  },

  async saveCategory(categoryData) {
    return storageService.saveCategory(categoryData);
  },

  async deleteCategory(categoryId) {
    return storageService.deleteCategory(categoryId);
  }
};
