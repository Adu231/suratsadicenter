import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sparkles, Heart, ShoppingBag, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { STORE_CONFIG } from '../config/storeConfig.js';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const currentPath = location.pathname;
  const isWishlistActive = location.search.includes('filter=wishlist');

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
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(197, 160, 89, 0.3)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.06)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: '4px',
        paddingRight: '4px'
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
          gap: '2px',
          flex: 1,
          height: '100%',
          color: (currentPath === '/' && !isWishlistActive) ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: (currentPath === '/' && !isWishlistActive) ? 700 : 500,
          fontSize: '11px',
          textDecoration: 'none'
        }}
      >
        <Home size={19} strokeWidth={(currentPath === '/' && !isWishlistActive) ? 2.4 : 1.8} />
        <span>Shop</span>
      </Link>

      {/* 2. Paithani Collections */}
      <Link
        to="/?category=paithani-sarees"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          flex: 1,
          height: '100%',
          color: location.search.includes('category=paithani-sarees') ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: location.search.includes('category=paithani-sarees') ? 700 : 500,
          fontSize: '11px',
          textDecoration: 'none'
        }}
      >
        <Sparkles size={19} strokeWidth={1.8} />
        <span>Paithani</span>
      </Link>

      {/* 3. Wishlist */}
      <Link
        to="/?filter=wishlist"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          flex: 1,
          height: '100%',
          color: isWishlistActive ? '#E02424' : 'var(--color-muted-text)',
          fontWeight: isWishlistActive ? 700 : 500,
          fontSize: '11px',
          textDecoration: 'none',
          position: 'relative'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Heart size={19} fill={isWishlistActive ? '#E02424' : 'none'} strokeWidth={1.8} />
          {wishlistCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-6px',
              backgroundColor: '#E02424',
              color: '#FFFFFF',
              borderRadius: '999px',
              minWidth: '15px',
              height: '15px',
              padding: '0 3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: 700
            }}>
              {wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>

      {/* 4. Cart Bag with Live Count */}
      <button
        onClick={openDrawer}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          flex: 1,
          height: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: itemCount > 0 ? 'var(--color-primary-maroon)' : 'var(--color-muted-text)',
          fontWeight: itemCount > 0 ? 700 : 500,
          fontSize: '11px',
          position: 'relative',
          padding: 0
        }}
        aria-label="Open Cart"
      >
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={19} strokeWidth={itemCount > 0 ? 2.2 : 1.8} />
          {itemCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-7px',
                backgroundColor: 'var(--color-primary-maroon)',
                color: 'var(--color-white)',
                borderRadius: '999px',
                minWidth: '16px',
                height: '16px',
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700
              }}
            >
              {itemCount}
            </span>
          )}
        </div>
        <span>Bag</span>
      </button>

      {/* 5. Direct Call to Store */}
      <a
        href={`tel:${STORE_CONFIG.phone}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          flex: 1,
          height: '100%',
          color: 'var(--color-primary-maroon)',
          fontWeight: 600,
          fontSize: '11px',
          textDecoration: 'none'
        }}
        title={`Call Surat Sadi Center at ${STORE_CONFIG.displayPhone}`}
      >
        <div style={{
          width: '26px',
          height: '26px',
          borderRadius: '999px',
          backgroundColor: 'var(--color-maroon-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary-maroon)'
        }}>
          <PhoneCall size={14} strokeWidth={2} />
        </div>
        <span>Call</span>
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
