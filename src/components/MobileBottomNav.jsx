import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Sparkles, Search, ShoppingBag, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount, openDrawer } = useCart();

  const currentPath = location.pathname;

  return (
    <nav
      className="mobile-bottom-nav"
      aria-label="Mobile Navigation Bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-bottom-nav)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: '6px',
        paddingRight: '6px'
      }}
    >
      {/* 1. Home */}
      <Link
        to="/"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          flex: 1,
          height: '100%',
          color: currentPath === '/' ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: currentPath === '/' ? 700 : 500,
          fontSize: '11px',
          textDecoration: 'none',
          transition: 'color var(--transition-fast)'
        }}
      >
        <Home size={21} strokeWidth={currentPath === '/' ? 2.4 : 1.8} />
        <span>Home</span>
      </Link>

      {/* 2. Sarees / Catalog */}
      <Link
        to="/catalog"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          flex: 1,
          height: '100%',
          color: currentPath === '/catalog' ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: currentPath === '/catalog' ? 700 : 500,
          fontSize: '11px',
          textDecoration: 'none',
          transition: 'color var(--transition-fast)'
        }}
      >
        <Sparkles size={21} strokeWidth={currentPath === '/catalog' ? 2.4 : 1.8} />
        <span>Sarees</span>
      </Link>

      {/* 3. Search Quick Action */}
      <button
        onClick={() => {
          navigate('/catalog');
          // Focus search after short delay
          setTimeout(() => {
            const el = document.getElementById('catalog-search-input') || document.querySelector('input[type="text"]');
            if (el) el.focus();
          }, 150);
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          flex: 1,
          height: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-muted-text)',
          fontWeight: 500,
          fontSize: '11px',
          padding: 0
        }}
      >
        <Search size={21} strokeWidth={1.8} />
        <span>Search</span>
      </button>

      {/* 4. Cart / Bag with Badge */}
      <button
        onClick={openDrawer}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          flex: 1,
          height: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: currentPath === '/cart' ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: currentPath === '/cart' ? 700 : 500,
          fontSize: '11px',
          position: 'relative',
          padding: 0
        }}
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={21} strokeWidth={itemCount > 0 ? 2.2 : 1.8} />
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-7px',
                backgroundColor: 'var(--color-primary-maroon)',
                color: 'var(--color-white)',
                borderRadius: '999px',
                minWidth: '17px',
                height: '17px',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700,
                boxShadow: '0 1px 4px rgba(147, 26, 45, 0.4)'
              }}
            >
              {itemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* 5. Direct Call to Store (9890076010) */}
      <a
        href="tel:9890076010"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          flex: 1,
          height: '100%',
          color: 'var(--color-primary-maroon)',
          fontWeight: 600,
          fontSize: '11px',
          textDecoration: 'none'
        }}
        title="Call Surat Sadi Center at 9890076010"
      >
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-maroon-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary-maroon)'
        }}>
          <PhoneCall size={15} strokeWidth={2.2} />
        </div>
        <span style={{ fontSize: '10px' }}>Call Us</span>
      </a>

      {/* Mobile only media query */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
