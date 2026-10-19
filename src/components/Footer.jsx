import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Heart, MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.js';

export const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#161313',
      color: '#FAF7F2',
      marginTop: 'auto',
      borderTop: '3px solid var(--color-antique-gold)'
    }}>
      {/* Trust Highlights Section */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '24px 0',
        backgroundColor: '#110F0F'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', margin: '0 0 2px 0' }}>
                100% Genuine Handloom
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '11px', margin: 0 }}>
                Directly from master weavers
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <Truck size={20} />
            </div>
            <div>
              <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', margin: '0 0 2px 0' }}>
                Pan-India Free Shipping
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '11px', margin: 0 }}>
                On all saree orders above ₹1,499
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', margin: '0 0 2px 0' }}>
                Cash on Delivery (COD)
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '11px', margin: 0 }}>
                Doorstep cash & UPI verification
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-antique-gold)',
              flexShrink: 0
            }}>
              <Phone size={20} />
            </div>
            <div>
              <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '13px', margin: '0 0 2px 0' }}>
                WhatsApp Video Consultation
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '11px', margin: 0 }}>
                Inspect real saree pallu on video
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="container" style={{ padding: '36px 16px 24px 16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '32px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '12px' }}>
              <img
                src="/surat-sadi-center-logo.png"
                alt="Surat Sadi Center"
                style={{
                  height: '42px',
                  maxWidth: '220px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <p style={{ color: 'var(--color-antique-gold)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Suiting • Shirting • Children's Wear • Ladies • Men's
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
              Surat Sadi Center — Dharashiv's trusted retail haven for authentic Maharashtrian Paithani, Banarasi, Kanjivaram, and wedding trousseau sarees.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="var(--color-antique-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{STORE_CONFIG.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="var(--color-antique-gold)" style={{ flexShrink: 0 }} />
                <a href={`tel:${STORE_CONFIG.phone}`} style={{ color: '#F4DE98', fontWeight: 600 }}>
                  {STORE_CONFIG.owner} • {STORE_CONFIG.displayPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Saree Categories */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '12px', letterSpacing: '0.04em' }}>
              Shop Sarees
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <li>
                <Link to="/?category=paithani-sarees" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Yeola Pure Silk Paithani
                </Link>
              </li>
              <li>
                <Link to="/?category=silk-sarees" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Banarasi & Kanjivaram Silks
                </Link>
              </li>
              <li>
                <Link to="/?category=cotton-sarees" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Chanderi & Handloom Cotton
                </Link>
              </li>
              <li>
                <Link to="/?category=party-wear" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Party Wear & Evening Georgette
                </Link>
              </li>
              <li>
                <Link to="/?category=wedding-collection" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Bridal Heritage Wedding Trousseau
                </Link>
              </li>
              <li>
                <Link to="/?category=daily-wear" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  Daily Wear & Mulmul Sarees
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & WhatsApp */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '12px', letterSpacing: '0.04em' }}>
              Customer Support & Demo
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
              <li>
                <Link to="/orders" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                  📦 My Demo Orders
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--color-antique-gold)', fontWeight: 600 }}>
                  ⚙️ Admin Management Portal
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello Surat Sadi Center, I would like to book a video call to view sarees.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#4ADE80', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                >
                  <MessageCircle size={14} /> WhatsApp Video Call Booking →
                </a>
              </li>
              <li style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
                Store Hours: {STORE_CONFIG.operatingHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          marginTop: '32px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <div>
            © {new Date().getFullYear()} Surat Sadi Center. All Rights Reserved. • Behind Eet Gram Panchayat, Dist. Dharashiv - 413534
          </div>
          <div>
            Online E-Commerce Frontend Demonstration (React + Vite)
          </div>
        </div>
      </div>
    </footer>
  );
};
