import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Check, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stockQuantity <= 0) return;
    addToCart(product.id, 1, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= (product.lowStockThreshold || 3);
  const isWishlisted = isInWishlist(product.id);

  return (
    <article
      className="card product-card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(197, 160, 89, 0.25)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      {/* Product Image & Badges */}
      <Link
        to={`/product/${product.slug}`}
        style={{
          position: 'relative',
          display: 'block',
          overflow: 'hidden',
          backgroundColor: '#F8F5F0'
        }}
        aria-label={`View details of ${product.name}`}
      >
        <div style={{
          width: '100%',
          paddingTop: '122%', // 4:5 optimized ratio
          position: 'relative',
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
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
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
          top: '8px',
          left: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          zIndex: 2
        }}>
          {discountPercent > 0 && (
            <span style={{
              backgroundColor: 'var(--color-primary-maroon)',
              color: '#FFFFFF',
              padding: '2px 7px',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              borderRadius: '2px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}>
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#8A641B',
              border: '1px solid rgba(197, 160, 89, 0.6)',
              padding: '2px 6px',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: '2px'
            }}>
              ★ Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span style={{
              backgroundColor: '#1E7E45',
              color: '#FFFFFF',
              padding: '2px 6px',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              borderRadius: '2px'
            }}>
              New
            </span>
          )}
        </div>

        {/* Wishlist Heart Action Button */}
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '32px',
            height: '32px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 3,
            transition: 'transform 0.2s ease, background 0.2s ease',
            color: isWishlisted ? '#E02424' : '#666059'
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Toggle Wishlist"
        >
          <Heart
            size={16}
            fill={isWishlisted ? '#E02424' : 'none'}
            color={isWishlisted ? '#E02424' : 'currentColor'}
          />
        </button>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(20, 18, 18, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}>
            <span style={{
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              padding: '4px 10px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '2px'
            }}>
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div style={{
        padding: '10px 12px 12px 12px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '4px'
      }}>
        {/* Fabric & Stock info */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--color-muted-text)'
        }}>
          <span style={{
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontWeight: 600,
            color: 'var(--color-antique-gold)',
            fontSize: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '65%'
          }}>
            {product.fabric || 'Pure Silk'}
          </span>
          {isLowStock ? (
            <span style={{ color: '#C53030', fontWeight: 600, fontSize: '10px' }}>
              Only {product.stockQuantity} Left
            </span>
          ) : product.rating ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#B0882E', fontWeight: 600, fontSize: '10px' }}>
              <Star size={10} fill="currentColor" color="currentColor" /> {product.rating}
            </span>
          ) : null}
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '13px',
            lineHeight: 1.3,
            fontWeight: 600,
            color: 'var(--color-soft-charcoal)',
            margin: '2px 0 4px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '34px'
          }}>
            {product.name}
          </h3>
        </Link>

        {/* Price & Add to Cart Action */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '6px',
          borderTop: '1px solid rgba(197, 160, 89, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span style={{
                  fontSize: '11px',
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
              padding: '0 10px',
              minHeight: '32px',
              height: '32px',
              fontSize: '10px',
              letterSpacing: '0.04em',
              gap: '4px',
              flexShrink: 0
            }}
            title={isOutOfStock ? 'Sold out' : 'Add to Bag'}
          >
            {added ? (
              <>
                <Check size={11} color="var(--color-success)" /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={11} /> +Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
