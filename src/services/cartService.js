import { storageService } from './storageService.js';

export const cartService = {
  async getCart() {
    const items = storageService.getCart();
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 1499 || items.length === 0 ? 0 : 79;
    const total = subtotal + shippingFee;

    return {
      items,
      subtotal,
      shippingFee,
      total,
      itemCount: items.reduce((acc, i) => acc + i.quantity, 0)
    };
  },

  async addToCart(productId, quantity = 1) {
    storageService.addToCart(productId, quantity);
    return this.getCart();
  },

  async updateItemQuantity(itemId, quantity) {
    storageService.updateCartQuantity(itemId, quantity);
    return this.getCart();
  },

  async removeItem(itemId) {
    storageService.removeFromCart(itemId);
    return this.getCart();
  },

  async clearCart() {
    storageService.clearCart();
    return this.getCart();
  }
};
