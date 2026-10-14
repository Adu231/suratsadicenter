import { storageService } from './storageService.js';

export const orderService = {
  async createOrder(orderPayload) {
    return storageService.createOrder(orderPayload);
  },

  async getMyOrders() {
    return storageService.getOrders();
  },

  async getAllOrders() {
    return storageService.getOrders();
  },

  async getOrderByNumber(orderNumber) {
    return storageService.getOrderById(orderNumber);
  },

  async updateOrderStatus(orderNumber, status) {
    return storageService.updateOrderStatus(orderNumber, status);
  },

  async cancelOrder(orderNumber, reason) {
    return storageService.cancelOrder(orderNumber, reason);
  }
};
