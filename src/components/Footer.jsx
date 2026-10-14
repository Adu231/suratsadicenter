import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-soft-charcoal)',
      color: 'var(--color-warm-ivory)',
      marginTop: 'auto',
      borderTop: '4px solid var(--color-antique-gold)'
    }}>
      {/* Trust Highlights Section */}
      <div style={{
        borderBottom: '1px solid rgba(227, 218, 206, 0.15)',
        padding: '32px 0',
        backgroundColor: '#1C1A18'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px'
        }}>
          {/* Fix 5: Replace skipped H4 with semantic paragraph titles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(209, 180, 119, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--color-warm-ivory)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                100% Handloom Authenticity
              </p>
              <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)' }}>
                Direct from master weavers
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(209, 180, 119, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <Truck size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--color-warm-ivory)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                Pan-India Free Shipping
              </p>
              <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)' }}>
                On all orders above ₹1,499
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(209, 180, 119, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <RefreshCw size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--color-warm-ivory)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                Cash on Delivery Available
              </p>
              <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)' }}>
                Inspect upon delivery
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(209, 180, 119, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-success)',
              flexShrink: 0
            }}>
              <Phone size={24} />
            </div>
            <div>
              <p style={{ color: 'var(--color-warm-ivory)', fontWeight: 600, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>
                WhatsApp Concierge
              </p>
              <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)' }}>
                Personal video call selection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '48px 16px 36px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px'
        }}>
          {/* Brand Col */}
          <div>
            <h3 className="font-devanagari" style={{ color: 'var(--color-antique-gold)', fontSize: 'var(--text-xl)', marginBottom: '8px' }}>
              सुरत साडी सेंटर
            </h3>
            <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)', lineHeight: 1.6, marginBottom: '16px' }}>
              Surat Sadi Center is a heritage textile house preserving Maharashtra's handloom traditions. Specializing in pure silk Paithani, royal Banarasi brocades, and bridal sarees with authentic zari artistry.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-secondary-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="var(--color-antique-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Main Market Road, Near Gandhi Chowk, Dharashiv, Maharashtra - 413534</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--color-antique-gold)" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--color-antique-gold)" style={{ flexShrink: 0 }} />
                <span>care@suratsadicenter.com</span>
              </div>
            </div>
          </div>

          {/* Saree Collections - Fix 5: Proper H3 level following H2 */}
          <div>
            <h3 style={{ color: 'var(--color-warm-ivory)', fontSize: 'var(--text-base)', marginBottom: '14px', letterSpacing: '0.02em' }}>
              Handcrafted Sarees
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--text-xs)' }}>
              <li>
                <Link to="/catalog?category=paithani-sarees" style={{ color: 'var(--color-secondary-surface)' }}>
                  Pure Silk Yeola Paithani (पैठणी साडी)
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=banarasi-silk-sarees" style={{ color: 'var(--color-secondary-surface)' }}>
                  Banarasi Katan Silk (बनारसी सिल्क)
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=kanjivaram-silk-sarees" style={{ color: 'var(--color-secondary-surface)' }}>
                  Kanjivaram Temple Silk (कांजीवरम)
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=chanderi-cotton-sarees" style={{ color: 'var(--color-secondary-surface)' }}>
                  Chanderi & Handloom Cotton (चांदेरी)
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=bridal-heritage-sarees" style={{ color: 'var(--color-secondary-surface)' }}>
                  Bridal Heritage Trousseau (वधू संग्रह)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care - Fix 5: Proper H3 level */}
          <div>
            <h3 style={{ color: 'var(--color-warm-ivory)', fontSize: 'var(--text-base)', marginBottom: '14px', letterSpacing: '0.02em' }}>
              Customer Care
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'var(--text-xs)' }}>
              <li>
                <Link to="/orders" style={{ color: 'var(--color-secondary-surface)' }}>
                  Track Demo Orders
                </Link>
              </li>
              <li>
                <Link to="/catalog" style={{ color: 'var(--color-secondary-surface)' }}>
                  Pan-India Shipping (PIN 413534 Origin)
                </Link>
              </li>
              <li>
                <span style={{ color: 'var(--color-secondary-surface)' }}>Cash on Delivery (COD) Guidelines</span>
              </li>
              <li>
                <span style={{ color: 'var(--color-secondary-surface)' }}>Pure Silk Care & Muslin Storage</span>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Surat%20Sadi%20Center,%20I%20want%20to%20view%20sarees%20on%20video%20call"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-antique-gold)', fontWeight: 600 }}
                >
                  Book Video Call Selection →
                </a>
              </li>
            </ul>
          </div>

          {/* Demo MVP Control Box - Fix 5: Proper H3 level */}
          <div style={{
            backgroundColor: '#1E1C1A',
            border: '1px solid rgba(209, 180, 119, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px'
          }}>
            <h3 style={{ color: 'var(--color-antique-gold)', fontSize: 'var(--text-base)', marginBottom: '8px' }}>
              Demo MVP Portal
            </h3>
            <p style={{ color: 'var(--color-secondary-surface)', fontSize: 'var(--text-xs)', lineHeight: 1.5, marginBottom: '14px' }}>
              This platform runs client-side in your browser using local storage. All product updates, cart actions, and orders persist locally.
            </p>
            {/* Fix 9: Unified standard secondary button */}
            <Link
              to="/admin"
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Access Admin Dashboard
            </Link>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(227, 218, 206, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-secondary-surface)'
        }}>
          <div>
            © {new Date().getFullYear()} Surat Sadi Center (सुरत साडी सेंटर). PIN: 413534.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted for authentic Indian handlooms • Frontend-Only Demo MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
