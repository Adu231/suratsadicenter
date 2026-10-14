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
      transition: 'transform var(--transition-base), box-shadow var(--transition-base)'
    }}>
      {/* Product Image & Badges */}
      <Link to={`/product/${product.slug}`} style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          paddingTop: '125%', // 4:5 Aspect Ratio
          position: 'relative',
          backgroundColor: 'var(--color-secondary-surface)',
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
              transition: 'transform 0.4s ease'
            }}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/saree-paithani.png';
            }}
          />
        </div>

        {/* Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {product.isBestseller && (
            <span className="badge badge-gold">
              ★ Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="badge badge-maroon">
              New Arrival
            </span>
          )}
          {discountPercent > 0 && (
            <span className="badge badge-success">
              {discountPercent}% OFF
            </span>
          )}
          {isLowStock && (
            <span className="badge badge-error">
              Only {product.stockQuantity} Left!
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
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}>
            <span className="badge badge-error" style={{ fontSize: 'var(--text-sm)', padding: '6px 12px' }}>
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Card Content - Fix 8: Tightly grouped with minimal gap, eliminating excess vertical space */}
      <div style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '4px'
      }}>
        <div>
          {/* Category & Tags */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-muted-text)'
          }}>
            <span style={{ textTransform: 'capitalize', letterSpacing: '0.02em', fontWeight: 500 }}>
              {product.fabric}
            </span>
            {product.rating && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-antique-gold)', fontWeight: 600 }}>
                <Star size={12} fill="currentColor" color="currentColor" /> {product.rating}
              </span>
            )}
          </div>

          {/* Fix 4: Changed H4 to H3 to prevent skipping heading levels (H2 -> H3) */}
          <Link to={`/product/${product.slug}`}>
            <h3 style={{
              fontSize: 'var(--text-sm)',
              lineHeight: 1.35,
              fontWeight: 600,
              color: 'var(--color-soft-charcoal)',
              margin: '0 0 2px 0',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {product.name}
            </h3>
          </Link>

          {/* Marathi Name */}
          {product.marathiName && (
            <p className="font-devanagari" style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-primary-maroon)',
              margin: '0 0 4px 0',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {product.marathiName}
            </p>
          )}
        </div>

        {/* Pricing & Add To Cart - Fix 8: Grouped tightly beneath product details */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '8px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span style={{
                  fontSize: 'var(--text-xs)',
                  textDecoration: 'line-through',
                  color: 'var(--color-muted-text)'
                }}>
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Fix 9: Unified standard button styling */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`btn ${added ? 'btn-secondary' : 'btn-primary'} btn-sm`}
            style={{
              padding: '0 12px',
              gap: '4px'
            }}
            title={isOutOfStock ? 'Currently out of stock' : 'Add Saree to Bag'}
          >
            {added ? (
              <>
                <Check size={14} color="var(--color-success)" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
