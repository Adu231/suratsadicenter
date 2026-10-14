// Surat Sadi Center - LocalStorage Persistence Service
// Handles mock data initialization, safe JSON operations, and local state sync

import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_ORDERS, DEMO_USERS } from '../data/mockData.js';

const KEYS = {
  PRODUCTS: 'ssc_products_v1',
  CATEGORIES: 'ssc_categories_v1',
  CART: 'ssc_cart_v1',
  ORDERS: 'ssc_orders_v1',
  CURRENT_USER: 'ssc_current_user_v1'
};

// Safe storage getter with fallback
function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage, using fallback:`, err);
    return fallback;
  }
}

// Safe storage setter
function setToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// Ensure initial state exists in localStorage
export function initializeStorage() {
  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    setToStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    setToStorage(KEYS.CATEGORIES, INITIAL_CATEGORIES);
  }
  if (!localStorage.getItem(KEYS.ORDERS)) {
    setToStorage(KEYS.ORDERS, INITIAL_ORDERS);
  }
  if (!localStorage.getItem(KEYS.CART)) {
    setToStorage(KEYS.CART, []);
  }
  if (!localStorage.getItem(KEYS.CURRENT_USER)) {
    setToStorage(KEYS.CURRENT_USER, DEMO_USERS.customer);
  }
}

// Initialize on module import
initializeStorage();

export const storageService = {
  // PRODUCTS
  getProducts() {
    return getFromStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  getProductBySlug(slug) {
    const products = this.getProducts();
    return products.find(p => p.slug === slug) || null;
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  },

  saveProduct(productData) {
    const products = this.getProducts();
    let updated;
    if (productData.id) {
      // Edit existing
      updated = products.map(p => (p.id === productData.id ? { ...p, ...productData } : p));
    } else {
      // Add new
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        sku: productData.sku || `SSC-${Date.now().toString().slice(-4)}`,
        status: 'active',
        images: productData.images?.length ? productData.images : ['/saree-paithani.png'],
        stockQuantity: Number(productData.stockQuantity) || 10,
        price: Number(productData.price) || 4999,
        compareAtPrice: Number(productData.compareAtPrice) || 6999
      };
      updated = [newProduct, ...products];
    }
    setToStorage(KEYS.PRODUCTS, updated);
    return updated;
  },

  deleteProduct(productId) {
    const products = this.getProducts();
    const updated = products.filter(p => p.id !== productId);
    setToStorage(KEYS.PRODUCTS, updated);
    return updated;
  },

  updateStock(productId, newQuantity) {
    const products = this.getProducts();
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, stockQuantity: Math.max(0, Number(newQuantity)) };
      }
      return p;
    });
    setToStorage(KEYS.PRODUCTS, updated);
    return updated;
  },

  // CATEGORIES
  getCategories() {
    return getFromStorage(KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  // CART
  getCart() {
    return getFromStorage(KEYS.CART, []);
  },

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return cart;

    const existingIndex = cart.findIndex(item => item.productId === productId);
    let updated;

    if (existingIndex > -1) {
      updated = [...cart];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: Math.min(newQty, product.stockQuantity || 99)
      };
    } else {
      updated = [
        ...cart,
        {
          id: `cart-item-${Date.now()}`,
          productId: product.id,
          name: product.name,
          marathiName: product.marathiName,
          slug: product.slug,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: product.images[0] || '/saree-paithani.png',
          fabric: product.fabric,
          colour: product.colour,
          quantity: Math.min(quantity, product.stockQuantity || 99)
        }
      ];
    }

    setToStorage(KEYS.CART, updated);
    return updated;
  },

  updateCartQuantity(cartItemId, quantity) {
    const cart = this.getCart();
    let updated;
    if (quantity <= 0) {
      updated = cart.filter(item => item.id !== cartItemId);
    } else {
      updated = cart.map(item => (item.id === cartItemId ? { ...item, quantity } : item));
    }
    setToStorage(KEYS.CART, updated);
    return updated;
  },

  removeFromCart(cartItemId) {
    const cart = this.getCart();
    const updated = cart.filter(item => item.id !== cartItemId);
    setToStorage(KEYS.CART, updated);
    return updated;
  },

  clearCart() {
    setToStorage(KEYS.CART, []);
    return [];
  },

  // ORDERS
  getOrders() {
    return getFromStorage(KEYS.ORDERS, INITIAL_ORDERS);
  },

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.id === orderId || o.orderNumber === orderId) || null;
  },

  createOrder(orderPayload) {
    const orders = this.getOrders();
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `SSC-${dateStr}-${randomHex}`;

    const newOrder = {
      ...orderPayload,
      id: orderNumber,
      orderNumber,
      createdAt: now.toISOString(),
      orderStatus: 'Confirmed',
      paymentStatus: orderPayload.paymentMethod?.includes('Cash') ? 'Pending COD Verification' : 'Demo Verification',
      trackingNumber: `TRK-MH-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Deduct stock in products
    if (orderPayload.items && Array.isArray(orderPayload.items)) {
      const products = this.getProducts();
      const updatedProducts = products.map(prod => {
        const orderedItem = orderPayload.items.find(i => i.productId === prod.id || i.id === prod.id);
        if (orderedItem) {
          const newStock = Math.max(0, prod.stockQuantity - orderedItem.quantity);
          return { ...prod, stockQuantity: newStock };
        }
        return prod;
      });
      setToStorage(KEYS.PRODUCTS, updatedProducts);
    }

    const updatedOrders = [newOrder, ...orders];
    setToStorage(KEYS.ORDERS, updatedOrders);
    this.clearCart();

    return newOrder;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const updated = orders.map(o => {
      if (o.id === orderId || o.orderNumber === orderId) {
        return {
          ...o,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'Delivered' && o.paymentMethod?.includes('Cash')
            ? 'Paid on Delivery'
            : o.paymentStatus
        };
      }
      return o;
    });
    setToStorage(KEYS.ORDERS, updated);
    return updated;
  },

  cancelOrder(orderId, reason = 'Customer requested cancellation') {
    const orders = this.getOrders();
    const updated = orders.map(o => {
      if (o.id === orderId || o.orderNumber === orderId) {
        return {
          ...o,
          orderStatus: 'Cancelled',
          cancelReason: reason,
          cancelledAt: new Date().toISOString()
        };
      }
      return o;
    });
    setToStorage(KEYS.ORDERS, updated);
    return updated;
  },

  // USERS / AUTH
  getCurrentUser() {
    return getFromStorage(KEYS.CURRENT_USER, DEMO_USERS.customer);
  },

  setCurrentUser(user) {
    setToStorage(KEYS.CURRENT_USER, user);
    return user;
  },

  loginAs(role) {
    const user = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.customer;
    setToStorage(KEYS.CURRENT_USER, user);
    return user;
  },

  logoutUser() {
    localStorage.removeItem(KEYS.CURRENT_USER);
    return null;
  },

  // FACTORY RESET
  resetAllDemoData() {
    setToStorage(KEYS.PRODUCTS, INITIAL_PRODUCTS);
    setToStorage(KEYS.CATEGORIES, INITIAL_CATEGORIES);
    setToStorage(KEYS.ORDERS, INITIAL_ORDERS);
    setToStorage(KEYS.CART, []);
    setToStorage(KEYS.CURRENT_USER, DEMO_USERS.customer);
    return true;
  }
};
