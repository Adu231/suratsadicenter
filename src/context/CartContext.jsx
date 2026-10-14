import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService.js';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState({
    items: [],
    subtotal: 0,
    shippingFee: 0,
    total: 0,
    itemCount: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    const data = await cartService.getCart();
    setCartState(data);
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (productId, quantity = 1, openCartDrawer = true) => {
    const updated = await cartService.addToCart(productId, quantity);
    setCartState(updated);
    if (openCartDrawer) {
      setIsDrawerOpen(true);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const updated = await cartService.updateItemQuantity(itemId, quantity);
    setCartState(updated);
  };

  const removeFromCart = async (itemId) => {
    const updated = await cartService.removeItem(itemId);
    setCartState(updated);
  };

  const clearCart = async () => {
    const updated = await cartService.clearCart();
    setCartState(updated);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        ...cartState,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
