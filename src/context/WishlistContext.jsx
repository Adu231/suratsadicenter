import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext.jsx';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'ssc_wishlist_v2';

export const WishlistProvider = ({ children }) => {
  const { products } = useProducts();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-003'];
    } catch {
      return ['prod-001', 'prod-003'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistCount: wishlistIds.length,
        wishlistProducts,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
