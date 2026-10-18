import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, Award, ChevronRight, Phone, MessageSquare, MapPin } from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

export const Home = () => {
  const { products, categories, loading } = useProducts();
  const [activeTab, setActiveTab] = useState('bestsellers');

  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const displayedProducts = activeTab === 'bestsellers' ? bestsellers : newArrivals;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '72px', paddingBottom: '80px' }}>
      
      {/* 1. HAUTE COUTURE HERO SECTION */}
      <section style={{
        position: 'relative',
        backgroundColor: '#0F0D0D',
        color: 'var(--color-white)',
        overflow: 'hidden',
        minHeight: '560px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Editorial Atmospheric Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(100deg, rgba(15, 13, 13, 0.96) 0%, rgba(15, 13, 13, 0.82) 45%, rgba(94, 18, 29, 0.35) 100%), url('/hero-banner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '72px 16px' }}>
          <div style={{ maxWidth: '680px' }}>
            
            {/* Royal Insignia Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(197, 160, 89, 0.12)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              color: '#F4DE98',
              padding: '6px 16px',
              borderRadius: '2px',
              fontSize: '11px',
              fontWeight: 700,
              marginBottom: '22px',
              textTransform: 'uppercase',
              letterSpacing: '0.14em'
            }}>
              <Sparkles size={13} color="var(--color-antique-gold)" />
              HAUTE HANDLOOM • ESTABLISHED 1995 • DHARASHIV
            </div>

            {/* Majestic Headline */}
            <h1 style={{
              color: 'var(--color-white)',
              fontSize: 'clamp(2.1rem, 5.2vw, 3.5rem)',
              lineHeight: 1.15,
              marginBottom: '16px',
              fontFamily: 'var(--font-brand-display)',
              letterSpacing: '0.02em',
              fontWeight: 700
            }}>
              The Royal Heritage of <br />
              <span style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F5DE98 50%, #B89230 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Maharashtrian Paithani
              </span>
            </h1>

            <p style={{
              fontSize: '15px',
              color: 'rgba(250, 247, 242, 0.82)',
              lineHeight: 1.7,
              marginBottom: '32px',
              fontWeight: 300,
              fontFamily: 'var(--font-sans)',
              maxWidth: '580px'
            }}>
              Pure silk woven with certified metallic zari by generational master weavers in Yeola and Varanasi. Draped by discerning brides across Maharashtra and dispatched pan-India with Cash on Delivery.
            </p>

            {/* High-Fashion Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link to="/catalog?category=paithani-sarees" className="btn btn-primary btn-lg">
                Explore Paithani Atelier <ArrowRight size={16} />
              </Link>
              <Link to="/catalog" className="btn btn-outline btn-lg" style={{ color: 'var(--color-white)', borderColor: 'rgba(255, 255, 255, 0.35)' }}>
                View All Collections
              </Link>
            </div>

            {/* Four Luxury Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              marginTop: '44px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(197, 160, 89, 0.25)',
              fontSize: '11px',
              color: '#F4DE98'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} color="var(--color-antique-gold)" />
                <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>100% Tested Pure Silk</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={16} color="var(--color-antique-gold)" />
                <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Pan-India Free COD</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} color="var(--color-antique-gold)" />
                <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Heritage Weave Mark</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE DHARASHIV FLAGSHIP ATELIER & ROYAL NAMEPLATE */}
      <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div style={{
          backgroundColor: '#120F10',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid rgba(197, 160, 89, 0.35)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
          padding: 'clamp(20px, 4vw, 36px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          {/* Framed Royal Brass Nameplate Plaque */}
          <div style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '2px solid rgba(197, 160, 89, 0.6)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 24px rgba(197, 160, 89, 0.15)',
            backgroundColor: '#000000'
          }}>
            <img
              src="/surat-sadi-center-nameplate.png"
              alt="Surat Sadi Center Official Royal Nameplate - Premium Handloom & Bridal Sarees"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>

          {/* Boutique Heritage Narrative & Direct Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: 'rgba(94, 18, 29, 0.4)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                color: '#F4DE98',
                padding: '3px 10px',
                borderRadius: '2px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}>
                The Flagship Atelier
              </span>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '11px',
                letterSpacing: '0.04em'
              }}>
                Prop. Sumit Asalkar
              </span>
            </div>

            <h2 style={{
              color: 'var(--color-white)',
              fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)',
              margin: 0,
              fontFamily: 'var(--font-brand-display)',
              letterSpacing: '0.02em',
              lineHeight: 1.25
            }}>
              Surat Sadi Center Showroom
            </h2>

            <p style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.75)',
              lineHeight: 1.7,
              margin: 0
            }}>
              Located behind Eet Gram Panchayat, our flagship boutique is Dharashiv's premier bridal haven. In addition to royal handloom Paithanis and Banarasi brocades, we offer complete bespoke textile collections:
            </p>

            <div style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderLeft: '2px solid var(--color-antique-gold)',
              fontSize: '12px',
              color: 'var(--color-antique-gold)',
              fontWeight: 600,
              letterSpacing: '0.04em'
            }}>
              Suiting • Shirting • Children's Wear • Ladies Wear • Men's Apparel
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
              <a
                href="tel:9890076010"
                className="btn btn-primary btn-sm"
                style={{ gap: '6px', fontSize: '11px', height: '42px' }}
              >
                <Phone size={14} /> Call: +91 9890076010
              </a>
              <a
                href="https://wa.me/919890076010?text=Hello%20Surat%20Sadi%20Center,%20I%20would%20like%20to%20view%20your%20saree%20collection"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-sm"
                style={{ gap: '6px', fontSize: '11px', height: '42px' }}
              >
                <MessageSquare size={14} /> WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CURATED COLLECTIONS SHOWCASE */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
          <span style={{
            fontSize: '11px',
            color: 'var(--color-antique-gold)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.15em'
          }}>
            The Immortal Weaves of India
          </span>
          <h2 style={{
            fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)',
            marginTop: '8px',
            fontFamily: 'var(--font-brand-display)',
            letterSpacing: '0.02em'
          }}>
            Curated Saree Collections
          </h2>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '14px', marginTop: '8px', lineHeight: 1.6 }}>
            Explore six timeless weaving lineages, from pure gold zari Paithanis to regal Varanasi brocades and bridal heirlooms.
          </p>
        </div>

        {/* High-Fashion Category Grid */}
        <div className="mobile-grid-2col">
          {categories.map(cat => (
            <Link
              key={cat.id || cat.slug}
              to={`/catalog?category=${cat.slug}`}
              className="card"
              style={{
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(197, 160, 89, 0.25)',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{
                position: 'relative',
                paddingTop: '115%',
                overflow: 'hidden',
                backgroundColor: '#F5EFE6'
              }}>
                <img
                  src={cat.image || '/saree-paithani.png'}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/saree-paithani.png';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 13, 13, 0.88) 0%, rgba(15, 13, 13, 0.2) 60%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '14px',
                  right: '14px',
                  color: 'var(--color-white)'
                }}>
                  <h3 style={{
                    color: 'var(--color-white)',
                    fontSize: '15px',
                    margin: '0 0 3px 0',
                    lineHeight: 1.25,
                    fontFamily: 'var(--font-brand-display)',
                    letterSpacing: '0.02em',
                    fontWeight: 700
                  }}>
                    {cat.name}
                  </h3>
                  <span style={{
                    fontSize: '11px',
                    color: '#F4DE98',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}>
                    Discover Collection <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. HANDPICKED MASTERPIECES */}
      <section className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              color: 'var(--color-antique-gold)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em'
            }}>
              Silk Masterpieces
            </span>
            <h2 style={{
              fontSize: 'clamp(1.7rem, 3.8vw, 2.4rem)',
              marginTop: '6px',
              fontFamily: 'var(--font-brand-display)',
              letterSpacing: '0.02em'
            }}>
              Handpicked Heirlooms
            </h2>
          </div>

          {/* Luxury Filter Controls */}
          <div style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            backgroundColor: '#F5EFE6',
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            gap: '6px'
          }}>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`btn btn-sm ${activeTab === 'bestsellers' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ height: '36px', minHeight: '36px', padding: '0 18px', border: 'none' }}
            >
              ★ Curated Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`btn btn-sm ${activeTab === 'newArrivals' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ height: '36px', minHeight: '36px', padding: '0 18px', border: 'none' }}
            >
              New Editions
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mobile-grid-2col">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/catalog" className="btn btn-secondary btn-lg" style={{ width: '100%', maxWidth: '380px', margin: '0 auto', borderColor: 'var(--color-antique-gold)' }}>
            View Complete Haute Catalog ({products.length} Sarees) <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. HERITAGE CRAFTSMANSHIP & ATELIER STORY */}
      <section style={{
        backgroundColor: '#120F10',
        color: 'var(--color-white)',
        borderTop: '1px solid rgba(197, 160, 89, 0.25)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.25)',
        padding: '72px 0'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              color: 'var(--color-antique-gold)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.14em'
            }}>
              Yeola & Varanasi Craftsmanship
            </span>
            <h2 style={{
              fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
              marginTop: '10px',
              marginBottom: '18px',
              color: 'var(--color-white)',
              fontFamily: 'var(--font-brand-display)',
              letterSpacing: '0.02em'
            }}>
              Preserving Indian Handloom Heritage
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.75, marginBottom: '18px', fontSize: '14px' }}>
              At <strong>Surat Sadi Center</strong>, every saree represents weeks of rigorous pit-loom dedication. Master generational artisans weave intricate peacocks, kalash, and lotus buttis using 100% pure silk and tested metallic zari.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.78)', lineHeight: 1.75, marginBottom: '32px', fontSize: '14px' }}>
              Directly curated from Maharashtra's legendary handloom clusters and dispatched from our showroom <strong>Behind Eet Gram Panchayat, Dist. Dharashiv (PIN 413534)</strong>.
            </p>

            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <p style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-antique-gold)', lineHeight: 1, fontFamily: 'var(--font-brand-display)' }}>
                  30+
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Years Heritage
                </p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.3)', paddingLeft: '32px' }}>
                <p style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-antique-gold)', lineHeight: 1, fontFamily: 'var(--font-brand-display)' }}>
                  100%
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Pure Silk Tested
                </p>
              </div>
              <div style={{ borderLeft: '1px solid rgba(197, 160, 89, 0.3)', paddingLeft: '32px' }}>
                <p style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--color-antique-gold)', lineHeight: 1, fontFamily: 'var(--font-brand-display)' }}>
                  Pan-India
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Doorstep Delivery
                </p>
              </div>
            </div>
          </div>

          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: '1.5px solid rgba(197, 160, 89, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}>
            <img
              src="/saree-paithani.png"
              alt="Yeola Paithani Saree Craftsmanship"
              style={{
                width: '100%',
                height: '440px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: '18px',
              backgroundColor: 'rgba(15, 13, 13, 0.9)',
              color: 'var(--color-white)',
              padding: '12px 20px',
              borderRadius: '2px',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              backdropFilter: 'blur(8px)'
            }}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-antique-gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px 0' }}>
                Pure Yeola Paithani
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                Handwoven with Authentic Peacock Zari Pallu
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
