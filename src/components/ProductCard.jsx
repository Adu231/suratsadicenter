import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= (product.lowStockThreshold || 3);

  return (
    <article className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      backgroundColor: 'var(--color-white)',
      border: '1px solid rgba(197, 160, 89, 0.22)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 4px 20px rgba(12, 10, 10, 0.04)',
      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Product Image & Badges */}
      <Link to={`/product/${product.slug}`} style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          paddingTop: '128%', // 4:5.1 Editorial Portrait Ratio
          position: 'relative',
          backgroundColor: '#F5EFE6',
          overflow: 'hidden'
        }}>
          <img
            src={product.images?.[0] || '/saree-paithani.png'}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/saree-paithani.png';
            }}
          />
        </div>

        {/* Floating Minimalist Luxury Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {product.isBestseller && (
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              color: '#8A641B',
              border: '1px solid rgba(197, 160, 89, 0.5)',
              padding: '3px 9px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              ★ Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span style={{
              backgroundColor: 'rgba(94, 18, 29, 0.9)',
              backdropFilter: 'blur(8px)',
              color: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.4)',
              padding: '3px 9px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '2px'
            }}>
              New Edition
            </span>
          )}
          {isLowStock && (
            <span style={{
              backgroundColor: 'rgba(20, 18, 18, 0.85)',
              color: '#F4DE98',
              padding: '3px 8px',
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '2px'
            }}>
              Only {product.stockQuantity} Left
            </span>
          )}
        </div>

        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(20, 18, 18, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}>
            <span style={{
              color: '#FFFFFF',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '8px 16px',
              backgroundColor: 'rgba(0,0,0,0.6)'
            }}>
              Archived / Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div style={{
        padding: '14px 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '6px'
      }}>
        <div>
          {/* Fabric & Rating */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
            fontSize: '11px'
          }}>
            <span style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-antique-gold)',
              fontSize: '10px'
            }}>
              {product.fabric}
            </span>
            {product.rating && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#B0882E', fontWeight: 600, fontSize: '11px' }}>
                <Star size={11} fill="currentColor" color="currentColor" /> {product.rating}
              </span>
            )}
          </div>

          {/* Saree Name */}
          <Link to={`/product/${product.slug}`}>
            <h3 style={{
              fontSize: '14px',
              lineHeight: 1.35,
              fontWeight: 600,
              fontFamily: 'var(--font-brand-display)',
              letterSpacing: '0.01em',
              color: 'var(--color-soft-charcoal)',
              margin: '0 0 6px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add To Cart */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid rgba(197, 160, 89, 0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)',
                fontFamily: 'var(--font-brand-display)',
                letterSpacing: '0.02em'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span style={{
                  fontSize: '12px',
                  textDecoration: 'line-through',
                  color: 'var(--color-muted-light)'
                }}>
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`btn ${added ? 'btn-secondary' : 'btn-primary'} btn-sm`}
            style={{
              padding: '0 12px',
              minHeight: '34px',
              height: '34px',
              fontSize: '10px',
              letterSpacing: '0.08em',
              gap: '5px'
            }}
            title={isOutOfStock ? 'Currently out of stock' : 'Add Saree to Bag'}
          >
            {added ? (
              <>
                <Check size={12} color="var(--color-success)" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={12} /> Bag
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
