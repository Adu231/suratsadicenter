import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  Heart,
  Package,
  SlidersHorizontal,
  ChevronDown,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { STORE_CONFIG } from '../config/storeConfig.js';

export const Navbar = () => {
  const { user, isAdmin, logout, setIsLoginModalOpen, switchRole } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { categories } = useProducts();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (slug) => {
    if (slug === 'all') {
      navigate('/');
    } else {
      navigate(`/?category=${slug}`);
    }
    setMobileMenuOpen(false);
  };

  // Curated list of categories to show in the navigation bar
  const navCategories = [
    { label: 'All Sarees', slug: 'all' },
    { label: 'Silk Sarees', slug: 'silk-sarees' },
    { label: 'Cotton Sarees', slug: 'cotton-sarees' },
    { label: 'Paithani Sarees', slug: 'paithani-sarees' },
    { label: 'Party Wear', slug: 'party-wear' },
    { label: 'Wedding Collection', slug: 'wedding-collection' },
    { label: 'Daily Wear', slug: 'daily-wear' },
    { label: 'New Arrivals', slug: 'new-arrivals' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(197, 160, 89, 0.28)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Super-compact Micro Top Announcement Strip */}
      <div style={{
        backgroundColor: '#161313',
        color: '#F4DE98',
        fontSize: '11px',
        padding: '5px 0',
        letterSpacing: '0.06em'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <span style={{ color: 'var(--color-antique-gold)', fontWeight: 700 }}>✦ Surat Sadi Center</span>
            <span className="desktop-only" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Behind Eet Gram Panchayat, Dist. Dharashiv • {STORE_CONFIG.owner}
            </span>
            <span className="desktop-only" style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
            <span style={{ color: '#FFFFFF' }}>
              Free Pan-India Delivery Above ₹1,499 • COD Available
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <a
              href={`tel:${STORE_CONFIG.phone}`}
              style={{
                color: '#F4DE98',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px'
              }}
              title="Call Surat Sadi Center"
            >
              <Phone size={11} /> {STORE_CONFIG.displayPhone}
            </a>
            <Link
              to="/admin"
              className="desktop-only"
              style={{
                color: '#D4AF37',
                fontSize: '10px',
                fontWeight: 600,
                padding: '1px 6px',
                borderRadius: '2px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                backgroundColor: 'rgba(212, 175, 55, 0.1)'
              }}
            >
              Admin Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div style={{ padding: '8px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-soft-charcoal)',
              padding: '6px',
              minWidth: '38px',
              minHeight: '38px'
            }}
            className="mobile-only"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo Brand Identity */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0
            }}
            aria-label="Surat Sadi Center Home"
          >
            <img
              src="/surat-sadi-center-logo.png"
              alt="Surat Sadi Center Logo"
              style={{
                height: '42px',
                width: 'auto',
                maxWidth: '190px',
                objectFit: 'contain',
                display: 'block'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextElementSibling) {
                  e.target.nextElementSibling.style.display = 'flex';
                }
              }}
            />
            {/* Fallback Wordmark */}
            <div style={{ display: 'none', flexDirection: 'column' }}>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)',
                lineHeight: 1.1,
                fontFamily: 'var(--font-brand-display)',
                letterSpacing: '0.04em'
              }}>
                SURAT SADI CENTER
              </span>
              <span style={{ fontSize: '9px', color: 'var(--color-antique-gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Handloom & Bridal Sarees
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: 1,
              maxWidth: '480px',
              position: 'relative'
            }}
            className="desktop-only"
          >
            <input
              type="text"
              placeholder="Search by saree name, fabric (Silk, Paithani, Cotton)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                height: '40px',
                paddingLeft: '38px',
                paddingRight: '14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FAF7F2',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                fontSize: '13px'
              }}
            />
            <Search
              size={16}
              color="var(--color-muted-text)"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </form>

          {/* Right Action Icons: WhatsApp, Wishlist, User, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* WhatsApp Contact Action */}
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Surat Sadi Center, I would like to enquire about saree orders.')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#EAF7EE',
                color: '#1E7E45',
                border: '1px solid rgba(30, 126, 69, 0.25)',
                textDecoration: 'none'
              }}
              title="Chat with Surat Sadi Center on WhatsApp"
              aria-label="WhatsApp order and enquiry"
            >
              <MessageCircle size={18} />
            </a>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                navigate('/?filter=wishlist');
              }}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                color: wishlistCount > 0 ? '#E02424' : 'var(--color-soft-charcoal)'
              }}
              title="My Saree Wishlist"
              aria-label="View Wishlist"
            >
              <Heart size={18} fill={wishlistCount > 0 ? '#E02424' : 'none'} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  backgroundColor: '#E02424',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  minWidth: '17px',
                  height: '17px',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 700
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#FFFFFF',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--color-soft-charcoal)',
                      height: '38px'
                    }}
                    aria-label="User Account Menu"
                  >
                    <User size={15} color="var(--color-primary-maroon)" />
                    <span className="desktop-only" style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={12} color="var(--color-muted-text)" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-card)',
                        minWidth: '210px',
                        padding: '8px 0',
                        zIndex: 250
                      }}
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--color-border)' }}>
                        <p style={{ fontWeight: 600, fontSize: '13px', margin: 0 }}>{user.name}</p>
                        <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '2px 0 0 0' }}>{user.email}</p>
                        <span className="badge badge-gold" style={{ marginTop: '4px', fontSize: '9px' }}>
                          Mode: {user.role?.toUpperCase()}
                        </span>
                      </div>

                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 14px',
                          fontSize: '13px',
                          color: 'var(--color-soft-charcoal)'
                        }}
                      >
                        <Package size={15} /> My Demo Orders
                      </Link>

                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '9px 14px',
                          fontSize: '13px',
                          color: 'var(--color-primary-maroon)',
                          fontWeight: 600,
                          backgroundColor: 'var(--color-maroon-light)'
                        }}
                      >
                        <SlidersHorizontal size={15} /> Admin Dashboard
                      </Link>

                      <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '4px', paddingTop: '4px' }}>
                        <button
                          onClick={() => {
                            switchRole(isAdmin ? 'customer' : 'admin');
                            setUserDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            padding: '7px 14px',
                            fontSize: '11px',
                            color: 'var(--color-primary-maroon)',
                            cursor: 'pointer'
                          }}
                        >
                          ⇄ Switch to {isAdmin ? 'Customer' : 'Admin'} View
                        </button>
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            background: 'transparent',
                            border: 'none',
                            padding: '7px 14px',
                            fontSize: '11px',
                            color: 'var(--color-error)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <LogOut size={13} /> Sign Out (Demo)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    height: '38px',
                    padding: '0 10px',
                    fontSize: '12px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <User size={15} /> Sign In
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={openDrawer}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '38px',
                padding: '0 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary-maroon)',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '12px'
              }}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={17} />
              <span className="desktop-only">Cart</span>
              {itemCount > 0 && (
                <span style={{
                  backgroundColor: 'var(--color-antique-gold)',
                  color: '#161313',
                  borderRadius: '999px',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Row (Visible only on mobile screens) */}
      <div className="mobile-only" style={{ padding: '0 14px 8px 14px' }}>
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search Paithani, Silk, Cotton..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{
              height: '38px',
              minHeight: '38px',
              paddingLeft: '34px',
              fontSize: '13px',
              backgroundColor: '#FAF7F2',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <Search size={15} color="var(--color-muted-text)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </form>
      </div>

      {/* Category Navigation Bar — Compact Horizontal Strip Directly Below Header */}
      <nav
        aria-label="Saree Categories"
        style={{
          backgroundColor: '#FAF7F2',
          borderTop: '1px solid rgba(197, 160, 89, 0.2)',
          borderBottom: '1px solid rgba(197, 160, 89, 0.2)'
        }}
      >
        <div className="container" style={{ padding: 0 }}>
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              overflowX: 'auto',
              padding: '4px 12px',
              gap: '6px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {navCategories.map(cat => {
              const isSelected = (currentCategory === cat.slug) || (cat.slug === 'all' && (!currentCategory || currentCategory === 'all'));
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  style={{
                    flexShrink: 0,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1px solid var(--color-primary-maroon)' : '1px solid transparent',
                    backgroundColor: isSelected ? 'var(--color-primary-maroon)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--color-soft-charcoal)',
                    fontWeight: isSelected ? 700 : 500,
                    fontSize: '12px',
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {cat.slug === 'new-arrivals' && <Sparkles size={11} color={isSelected ? '#F4DE98' : 'var(--color-antique-gold)'} />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '2px solid var(--color-primary-maroon)',
          padding: '16px 20px',
          boxShadow: 'var(--shadow-card)',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto'
        }}>
          {/* Boutique quick card */}
          <div style={{
            backgroundColor: '#FAF7F2',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            marginBottom: '14px'
          }}>
            <strong style={{ fontSize: '13px', color: 'var(--color-primary-maroon)' }}>Surat Sadi Center</strong>
            <p style={{ fontSize: '11px', margin: '2px 0 6px 0', color: 'var(--color-muted-text)' }}>
              Behind Eet Gram Panchayat, Dist. Dharashiv • {STORE_CONFIG.owner}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`tel:${STORE_CONFIG.phone}`}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, minHeight: '34px', height: '34px', fontSize: '11px', gap: '4px' }}
              >
                <Phone size={12} /> Call Store
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Surat Sadi Center')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, minHeight: '34px', height: '34px', fontSize: '11px', color: '#1E7E45', borderColor: '#1E7E45', gap: '4px' }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-antique-gold)', margin: '0 0 8px 0' }}>
            Categories
          </p>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navCategories.map(cat => (
              <li key={cat.slug} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <button
                  onClick={() => handleCategoryClick(cat.slug)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '10px 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: currentCategory === cat.slug ? 700 : 500,
                    color: currentCategory === cat.slug ? 'var(--color-primary-maroon)' : 'var(--color-soft-charcoal)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{cat.label}</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-muted-light)' }}>→</span>
                </button>
              </li>
            ))}

            <li style={{ borderBottom: '1px solid var(--color-border)' }}>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 0', fontSize: '13px', color: 'var(--color-soft-charcoal)', fontWeight: 500 }}
              >
                📦 My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', padding: '10px 0', fontSize: '13px', color: 'var(--color-primary-maroon)', fontWeight: 700 }}
              >
                ⚙️ Admin Dashboard (Demo)
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Responsive helper styling */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: flex; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};
