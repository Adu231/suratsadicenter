import React from 'react';
import { Home } from './Home.jsx';

// Re-export Home as Catalog to guarantee 100% unified storefront behavior
export const Catalog = () => {
  return <Home />;
};
