import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

import { DemoNotice } from './components/DemoNotice.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { LoginModal } from './components/LoginModal.jsx';
import { WhatsAppButton } from './components/WhatsAppButton.jsx';
import { MobileBottomNav } from './components/MobileBottomNav.jsx';

import { Home } from './pages/Home.jsx';
import { Catalog } from './pages/Catalog.jsx';
import { ProductDetails } from './pages/ProductDetails.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { OrderConfirmation } from './pages/OrderConfirmation.jsx';
import { MyOrders } from './pages/MyOrders.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { NotFound } from './pages/NotFound.jsx';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <DemoNotice />
            <Navbar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmation />} />
                <Route path="/orders" element={<MyOrders />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
            <CartDrawer />
            <LoginModal />
            <WhatsAppButton />
            <MobileBottomNav />
          </div>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
