import { storageService } from './storageService.js';
import { DEMO_USERS } from '../data/mockData.js';

export const authService = {
  async register(data) {
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name || 'Demo Customer',
      email: data.email || 'customer@example.com',
      phone: data.phone || '9876543210',
      role: 'customer',
      address: {
        fullName: data.name || 'Demo Customer',
        phone: data.phone || '9876543210',
        pincode: data.pincode || '413534',
        addressLine1: data.addressLine1 || 'Main Market Road',
        locality: 'Central Bazar',
        city: 'Dharashiv',
        state: 'Maharashtra'
      }
    };
    storageService.setCurrentUser(newUser);
    return { user: newUser, token: 'demo-token-customer' };
  },

  async login(credentials) {
    const email = credentials?.email?.toLowerCase() || '';
    let user;
    if (email.includes('admin')) {
      user = DEMO_USERS.admin;
    } else {
      user = {
        ...DEMO_USERS.customer,
        email: credentials.email || DEMO_USERS.customer.email
      };
    }
    storageService.setCurrentUser(user);
    return { user, token: `demo-token-${user.role}` };
  },

  async switchRole(role) {
    const user = storageService.loginAs(role);
    return { user, token: `demo-token-${role}` };
  },

  getMe() {
    return storageService.getCurrentUser();
  },

  logout() {
    storageService.logoutUser();
    return true;
  }
};
