import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, Award, ChevronRight } from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

export const Home = () => {
  const { products, categories, loading } = useProducts();
  const [activeTab, setActiveTab] = useState('bestsellers');

  const bestsellers = products.filter(p => p.isBestseller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const displayedProducts = activeTab === 'bestsellers' ? bestsellers : newArrivals;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', paddingBottom: '64px' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        backgroundColor: 'var(--color-soft-charcoal)',
        color: 'var(--color-white)',
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Image with Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(to right, rgba(37, 35, 33, 0.94) 0%, rgba(37, 35, 33, 0.75) 50%, rgba(37, 35, 33, 0.3) 100%), url('/hero-banner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '64px 16px' }}>
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(209, 180, 119, 0.15)',
              border: '1px solid rgba(209, 180, 119, 0.4)',
              color: 'var(--color-antique-gold)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              marginBottom: '18px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              <Sparkles size={14} /> Authentic Maharashtrian Heritage
            </div>

            <h1 style={{
              color: 'var(--color-white)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              lineHeight: 1.15,
              marginBottom: '12px'
            }}>
              अस्सल महाराष्ट्रीयन <br />
              <span style={{ color: 'var(--color-antique-gold)' }}>हातमाग साड्यांचा</span> शाही संग्रह
            </h1>

            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-secondary-surface)',
              lineHeight: 1.6,
              marginBottom: '28px',
              fontWeight: 300
            }}>
              Handcrafted Pure Silk Yeola Paithani, Royal Banarasi Brocades, and Bridal Kanjivaram sarees. Woven by generational artisans and delivered Pan-India with Cash on Delivery.
            </p>

            {/* Fix 9: Standardized design system button styles */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/catalog?category=paithani-sarees" className="btn btn-primary btn-lg">
                Explore Paithani Collection <ArrowRight size={18} />
              </Link>
              <Link to="/catalog" className="btn btn-outline btn-lg" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
                View All Sarees
              </Link>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              marginTop: '36px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-secondary-surface)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={18} color="var(--color-antique-gold)" />
                <span>100% Pure Silk & Zari</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={18} color="var(--color-antique-gold)" />
                <span>Free Shipping &gt; ₹1,499</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px auto' }}>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-primary-maroon)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            Explore Traditions
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginTop: '6px' }}>
            Curated Saree Collections
          </h2>
          <p style={{ color: 'var(--color-muted-text)', fontSize: 'var(--text-sm)', marginTop: '6px' }}>
            From grand bridal celebrations to lightweight everyday elegance, choose from India's finest handloom weaving traditions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px'
        }}>
          {categories.map(cat => (
            <Link
              key={cat.id || cat.slug}
              to={`/catalog?category=${cat.slug}`}
              className="card"
              style={{
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-white)',
                boxShadow: 'var(--shadow-subtle)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div style={{
                position: 'relative',
                paddingTop: '110%',
                overflow: 'hidden',
                backgroundColor: 'var(--color-secondary-surface)'
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
                    transition: 'transform 0.4s ease'
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/saree-paithani.png';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(37, 35, 33, 0.85) 0%, rgba(37, 35, 33, 0.2) 60%, transparent 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  color: 'var(--color-white)'
                }}>
                  <p className="font-devanagari" style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-antique-gold)',
                    fontWeight: 600,
                    marginBottom: '2px'
                  }}>
                    {cat.marathiName}
                  </p>
                  <h3 style={{ color: 'var(--color-white)', fontSize: 'var(--text-base)', marginBottom: '4px' }}>
                    {cat.name}
                  </h3>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-secondary-surface)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600
                  }}>
                    Shop Collection <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="container">
        {/* Fix 10: Tightly group filter controls with the heading */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-primary-maroon)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Masterpieces in Silk
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginTop: '4px' }}>
              Handpicked Sarees
            </h2>
          </div>

          {/* Fix 10: Filter Tabs positioned directly beneath the section heading */}
          <div style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            backgroundColor: 'var(--color-secondary-surface)',
            padding: '4px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            gap: '4px'
          }}>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`btn btn-sm ${activeTab === 'bestsellers' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', height: '34px', padding: '0 14px' }}
            >
              ★ Bestsellers
            </button>
            <button
              onClick={() => setActiveTab('newArrivals')}
              className={`btn btn-sm ${activeTab === 'newArrivals' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', height: '34px', padding: '0 14px' }}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Fix 9: Unified standard button */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/catalog" className="btn btn-secondary btn-lg">
            View All {products.length} Sarees in Catalogue <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Craftsmanship & Story Banner */}
      <section style={{
        backgroundColor: 'var(--color-secondary-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: '64px 0'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '48px'
        }}>
          <div>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-primary-maroon)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Yeola & Varanasi Craftsmanship
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginTop: '8px', marginBottom: '16px' }}>
              Preserving Indian Handloom Heritage
            </h2>
            <p style={{ color: 'var(--color-soft-charcoal)', lineHeight: 1.7, marginBottom: '16px', fontSize: 'var(--text-sm)' }}>
              At <strong>Surat Sadi Center (सुरत साडी सेंटर)</strong>, each saree represents weeks of meticulous handloom dedication. Our master weavers in Yeola and Varanasi employ centuries-old jacquard and pit-loom techniques to weave intricate peacocks, kalash, and lotus buttis using 100% pure silk and tested metallic zari.
            </p>
            <p style={{ color: 'var(--color-soft-charcoal)', lineHeight: 1.7, marginBottom: '24px', fontSize: 'var(--text-sm)' }}>
              Directly curated from Maharashtra's handloom clusters and dispatched from our registered retail center in <strong>Dharashiv (PIN 413534)</strong>.
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary-maroon)', lineHeight: 1 }}>
                  30+
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                  Years Textile Heritage
                </p>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '24px' }}>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary-maroon)', lineHeight: 1 }}>
                  100%
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                  Silk Handloom Tested
                </p>
              </div>
              <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '24px' }}>
                <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary-maroon)', lineHeight: 1 }}>
                  Pan-India
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                  Doorstep Delivery
                </p>
              </div>
            </div>
          </div>

          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-hover)'
          }}>
            <img
              src="/saree-paithani.png"
              alt="Yeola Paithani Saree Craftsmanship"
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'rgba(37, 35, 33, 0.85)',
              color: 'var(--color-white)',
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              backdropFilter: 'blur(4px)'
            }}>
              <p className="font-devanagari" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-antique-gold)' }}>
                शुद्ध येवला पैठणी
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-secondary-surface)' }}>
                Handwoven with Peacock Zari Pallu
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
