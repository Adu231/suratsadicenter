import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService.js';
import { storageService } from '../services/storageService.js';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    const prods = storageService.getProducts();
    const cats = storageService.getCategories();
    setProducts(prods);
    setCategories(cats);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const saveProduct = async (productData) => {
    const updated = await productService.saveProduct(productData);
    setProducts(updated);
    return updated;
  };

  const deleteProduct = async (productId) => {
    const updated = await productService.deleteProduct(productId);
    setProducts(updated);
    return updated;
  };

  const updateStock = async (productId, quantity) => {
    const updated = await productService.updateStock(productId, quantity);
    setProducts(updated);
    return updated;
  };

  const saveCategory = async (categoryData) => {
    const updated = await productService.saveCategory(categoryData);
    setCategories(updated);
    return updated;
  };

  const deleteCategory = async (categoryId) => {
    const updated = await productService.deleteCategory(categoryId);
    setCategories(updated);
    return updated;
  };

  const resetAllData = () => {
    storageService.resetAllDemoData();
    refreshProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        loading,
        refreshProducts,
        saveProduct,
        deleteProduct,
        updateStock,
        saveCategory,
        deleteCategory,
        resetAllData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
