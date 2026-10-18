import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Phone,
  ShieldCheck,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export const Navbar = () => {
  const { user, isAdmin, logout, setIsLoginModalOpen, switchRole } = useAuth();
  const { itemCount, openDrawer } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Sarees', path: '/catalog' },
    { label: 'Paithani', path: '/catalog?category=paithani-sarees' },
    { label: 'Banarasi', path: '/catalog?category=banarasi-silk-sarees' },
    { label: 'Kanjivaram', path: '/catalog?category=kanjivaram-silk-sarees' },
    { label: 'Bridal Heritage', path: '/catalog?category=bridal-heritage-sarees' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 4px 25px rgba(12, 10, 10, 0.05)',
      borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
      transition: 'all var(--transition-fast)'
    }}>
      {/* Top Luxury Announcement Ribbon */}
      <div style={{
        backgroundColor: '#110E0E',
        color: 'var(--color-antique-gold)',
        fontSize: '11px',
        padding: '8px 0',
        textAlign: 'center',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        borderBottom: '1px solid rgba(197, 160, 89, 0.3)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            ✦ <strong>Atelier: Behind Eet Gram Panchayat</strong> • Prop. Sumit Asalkar
          </span>
          <span className="desktop-only" style={{ opacity: 0.6 }}>|</span>
          <a
            href="tel:9890076010"
            style={{
              color: '#F4DE98',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Phone size={12} /> +91 9890076010
          </a>
          <span className="desktop-only" style={{ opacity: 0.6 }}>|</span>
          <span className="desktop-only" style={{ color: 'var(--color-warm-ivory)' }}>
            ✦ Complimentary Pan-India Delivery on Sarees Above ₹1,499 • COD Available
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div style={{
        padding: '10px 0',
        backgroundColor: 'transparent'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          {/* Mobile menu trigger */}
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
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px'
            }}
            className="mobile-only"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Authentic Brand Identity - Featuring Shop Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              padding: '2px 0'
            }}
            aria-label="Surat Sadi Center Home"
          >
            <img
              src="/surat-sadi-center-logo.png"
              alt="Surat Sadi Center - Premium Handloom Sarees"
              style={{
                height: '56px',
                width: 'auto',
                maxWidth: '260px',
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
            {/* Fallback & Complementary Wordmark */}
            <div style={{ display: 'none', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-maroon)',
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-brand-display)',
                  letterSpacing: '0.08em'
                }}
              >
                SURAT SADI CENTER
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-antique-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Haute Handloom Atelier
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: 1,
              maxWidth: '460px',
              position: 'relative'
            }}
            className="desktop-only"
          >
            <input
              type="text"
              placeholder="Search handloom Paithani, Banarasi, Kanjivaram heirlooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                height: '44px',
                paddingLeft: '42px',
                paddingRight: '16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(250, 247, 242, 0.8)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.3s ease'
              }}
            />
            <Search
              size={17}
              color="var(--color-antique-gold)"
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}
            />
          </form>

          {/* Actions: Account & Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* User Dropdown / Login */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(197, 160, 89, 0.35)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 14px',
                      cursor: 'pointer',
                      color: 'var(--color-soft-charcoal)',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}
                  >
                    <User size={15} color="var(--color-primary-maroon)" />
                    <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={13} color="var(--color-antique-gold)" />
                  </button>

                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '110%',
                        backgroundColor: 'var(--color-white)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-card)',
                        minWidth: '220px',
                        padding: '8px 0',
                        zIndex: 200
                      }}
                      onMouseLeave={() => setUserDropdownOpen(false)}
                    >
                      <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border)' }}>
                        <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{user.name}</p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-text)' }}>{user.email}</p>
                        <span className="badge badge-gold" style={{ marginTop: '4px', fontSize: 'var(--text-xs)' }}>
                          Role: {user.role?.toUpperCase()}
                        </span>
                      </div>

                      <Link
                        to="/orders"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--color-soft-charcoal)'
                        }}
                      >
                        <Package size={16} /> My Demo Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-primary-maroon)',
                            fontWeight: 600,
                            backgroundColor: 'var(--color-maroon-light)'
                          }}
                        >
                          <SlidersHorizontal size={16} /> Admin Dashboard
                        </Link>
                      )}

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
                            padding: '8px 16px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-primary-maroon)',
                            cursor: 'pointer'
                          }}
                        >
                          ⇄ Switch to {isAdmin ? 'Customer' : 'Admin'} Mode
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
                            padding: '8px 16px',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--color-error)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <LogOut size={14} /> Sign Out (Demo)
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <User size={15} /> Sign In
                </button>
              )}
            </div>

            {/* Cart Icon */}
            <button
              onClick={openDrawer}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-warm-ivory)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                color: 'var(--color-primary-maroon)',
                transition: 'all var(--transition-fast)'
              }}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--color-primary-maroon)',
                    color: 'var(--color-white)',
                    borderRadius: '999px',
                    minWidth: '20px',
                    height: '20px',
                    padding: '0 5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    boxShadow: '0 2px 5px rgba(110, 36, 54, 0.3)'
                  }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links Bar - Desktop */}
      <nav
        style={{
          backgroundColor: 'var(--color-white)',
          borderBottom: '1px solid var(--color-border)',
          display: 'block'
        }}
        className="desktop-only"
        aria-label="Main Navigation"
      >
        {/* Fix 6: Nav container flex alignment with consistent vertical center line */}
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '46px'
        }}>
          <ul style={{
            display: 'flex',
            alignItems: 'center',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '28px'
          }}>
            {navLinks.map(link => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '46px',
                      fontSize: 'var(--text-sm)',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-primary-maroon)' : 'var(--color-soft-charcoal)',
                      borderBottom: isActive ? '2px solid var(--color-primary-maroon)' : '2px solid transparent',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Fix 6: Vertically centered utility links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            height: '46px'
          }}>
            <Link
              to="/admin"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-antique-gold)',
                backgroundColor: 'var(--color-soft-charcoal)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                lineHeight: 1
              }}
            >
              <SlidersHorizontal size={13} /> Admin Panel
            </Link>
            <a
              href="https://wa.me/919890076010?text=Hello%20Surat%20Sadi%20Center,%20I%20have%20an%20enquiry%20regarding%20sarees"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-success)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                lineHeight: 1
              }}
            >
              <Phone size={13} /> WhatsApp Support
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--color-white)',
          borderBottom: '2px solid var(--color-primary-maroon)',
          padding: '16px 20px 24px 20px',
          boxShadow: 'var(--shadow-hover)',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto'
        }}>
          {/* Shop Card in Mobile Drawer */}
          <div style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            marginBottom: '16px'
          }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-maroon)', margin: '0 0 2px 0', fontFamily: 'var(--font-serif)' }}>
              Surat Sadi Center
            </p>
            <p style={{ fontSize: '11px', color: 'var(--color-soft-charcoal)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
              Suiting | Shirting | Children's Wear | Ladies Wear | Men's Wear
            </p>
            <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '0 0 10px 0' }}>
              📍 Behind Eet Gram Panchayat • Prop. Sumit Asalkar
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="tel:9890076010"
                className="btn btn-primary btn-sm"
                style={{ flex: 1, fontSize: '12px', minHeight: '38px', gap: '6px' }}
              >
                <Phone size={13} /> Call: 9890076010
              </a>
              <a
                href="https://wa.me/919890076010?text=Hello%20Surat%20Sadi%20Center"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, fontSize: '12px', minHeight: '38px', color: '#1E7E45', borderColor: '#1E7E45', gap: '6px' }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search Paithani, Banarasi, Silk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '38px', height: '44px', fontSize: '15px' }}
              />
              <Search
                size={17}
                color="var(--color-muted-text)"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </form>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map(link => (
              <li key={link.path} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '13px 0',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: 'var(--color-soft-charcoal)'
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li style={{ borderBottom: '1px solid var(--color-border)' }}>
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', padding: '13px 0', fontSize: '15px', color: 'var(--color-soft-charcoal)', fontWeight: 500 }}
              >
                📦 My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center', padding: '13px 0', fontSize: '15px', color: 'var(--color-primary-maroon)', fontWeight: 600 }}
              >
                ⚙️ Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Responsive CSS helper classes */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-only { display: block; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};
