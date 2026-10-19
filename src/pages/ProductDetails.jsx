import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
  Check,
  ChevronRight,
  Phone,
  MessageCircle,
  Heart,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { shippingService } from '../services/shippingService.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { STORE_CONFIG, getWhatsAppProductEnquiryUrl } from '../config/storeConfig.js';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find(p => p.slug === slug || p.id === slug);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState('413534');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [checkingDelivery, setCheckingDelivery] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || '/saree-paithani.png');
      window.scrollTo(0, 0);
      handleCheckPincode('413534');
    }
  }, [product, slug]);

  const handleCheckPincode = async (codeToTest) => {
    const code = codeToTest || pincode;
    if (!code) return;
    setCheckingDelivery(true);
    const result = await shippingService.checkServiceability(code, product?.price || 0);
    setDeliveryResult(result);
    setCheckingDelivery(false);
  };

  if (!product) {
    return (
      <div className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-primary-maroon)' }}>Saree Not Found</h2>
        <p style={{ color: 'var(--color-muted-text)', marginTop: '8px', marginBottom: '24px' }}>
          The requested saree might have been updated or removed from the demo catalog.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={14} /> Back to Saree Storefront
        </Link>
      </div>
    );
  }

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= (product.lowStockThreshold || 3);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product.id, quantity, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product.id, quantity, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const relatedProducts = products
    .filter(p => (p.category === product.category || p.fabric === product.fabric) && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ backgroundColor: '#FAF7F2', paddingBottom: '70px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '20px 16px 40px 16px' }}>

        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--color-muted-text)',
            marginBottom: '18px',
            flexWrap: 'wrap'
          }}
        >
          <Link to="/" style={{ color: 'var(--color-soft-charcoal)', fontWeight: 500 }}>Home</Link>
          <ChevronRight size={12} />
          <Link to={`/?category=${product.category}`} style={{ color: 'var(--color-soft-charcoal)', fontWeight: 500 }}>
            {product.categoryName || 'Sarees'}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--color-primary-maroon)', fontWeight: 600 }}>
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase: Gallery Column + Details Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Gallery Column */}
          <div>
            {/* Main Stage Image */}
            <div style={{
              position: 'relative',
              paddingTop: '120%', // Portrait ratio
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = '/saree-paithani.png';
                }}
              />

              {/* Floating Badges */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
                {discountPercent > 0 && (
                  <span style={{
                    backgroundColor: 'var(--color-primary-maroon)',
                    color: '#FFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '2px'
                  }}>
                    {discountPercent}% OFF
                  </span>
                )}
                {product.isBestseller && (
                  <span style={{
                    backgroundColor: '#FFFFFF',
                    color: '#8A641B',
                    border: '1px solid #D4AF37',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '2px'
                  }}>
                    ★ Bestseller
                  </span>
                )}
              </div>

              {/* Floating Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 3,
                  color: isWishlisted ? '#E02424' : '#666059'
                }}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
              >
                <Heart size={18} fill={isWishlisted ? '#E02424' : 'none'} color={isWishlisted ? '#E02424' : 'currentColor'} />
              </button>
            </div>

            {/* Thumbnails Strip */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '68px',
                      height: '84px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: selectedImage === img ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                      cursor: 'pointer',
                      padding: 0,
                      flexShrink: 0,
                      opacity: selectedImage === img ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      backgroundColor: '#FFFFFF'
                    }}
                    aria-label={`Show view ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Info Column */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            backgroundColor: '#FFFFFF',
            padding: '24px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
          }}>
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-antique-gold)'
                }}>
                  {product.fabric} • {product.categoryName || 'Saree'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-muted-text)' }}>
                  SKU: <strong>{product.sku || product.id}</strong>
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
                lineHeight: 1.25,
                margin: '0 0 4px 0',
                color: 'var(--color-soft-charcoal)',
                fontFamily: 'var(--font-brand-display)',
                fontWeight: 700
              }}>
                {product.name}
              </h1>

              {product.marathiName && (
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-primary-maroon)',
                  margin: '0 0 10px 0',
                  fontWeight: 600
                }}>
                  {product.marathiName}
                </p>
              )}

              {/* Rating */}
              {product.rating && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    backgroundColor: '#FDF6E2',
                    border: '1px solid #D4AF37',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    fontWeight: 700,
                    color: '#8A641B'
                  }}>
                    <Star size={12} fill="#8A641B" color="#8A641B" /> {product.rating}
                  </span>
                  <span style={{ color: 'var(--color-muted-text)' }}>
                    ({product.reviewCount || 24} customer reviews)
                  </span>
                  <span style={{ color: 'var(--color-border)' }}>|</span>
                  <button
                    onClick={handleShare}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-muted-text)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Share2 size={12} /> {shared ? 'Link Copied!' : 'Share'}
                  </button>
                </div>
              )}
            </div>

            {/* Pricing Box */}
            <div style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-primary-maroon)',
                  fontFamily: 'var(--font-brand-display)'
                }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>

                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <span style={{
                      fontSize: '1.1rem',
                      textDecoration: 'line-through',
                      color: 'var(--color-muted-light)'
                    }}>
                      ₹{product.compareAtPrice.toLocaleString('en-IN')}
                    </span>
                    <span style={{
                      color: 'var(--color-success)',
                      fontWeight: 700,
                      fontSize: '13px'
                    }}>
                      Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '4px 0 0 0' }}>
                Inclusive of all taxes. Free Pan-India Doorstep Delivery on orders above ₹1,499.
              </p>
            </div>

            {/* Stock Availability */}
            <div>
              {isOutOfStock ? (
                <span style={{
                  backgroundColor: '#FDF2F2',
                  color: '#B42318',
                  border: '1px solid rgba(180, 35, 24, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700
                }}>
                  Currently Out of Stock
                </span>
              ) : isLowStock ? (
                <span style={{
                  backgroundColor: '#FFFBEB',
                  color: '#B45309',
                  border: '1px solid #FCD34D',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700
                }}>
                  ⚡ Only {product.stockQuantity} piece{product.stockQuantity > 1 ? 's' : ''} remaining in stock!
                </span>
              ) : (
                <span style={{
                  backgroundColor: '#EAF7EE',
                  color: '#1E7E45',
                  border: '1px solid rgba(30, 126, 69, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 600
                }}>
                  ✓ In Stock ({product.stockQuantity} available at Dharashiv Showroom)
                </span>
              )}
            </div>

            {/* Quantity Selector & Shopping Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              {/* Qty Counter */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#FFFFFF',
                height: '46px'
              }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '36px',
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ width: '38px', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stockQuantity || 10, quantity + 1))}
                  style={{
                    width: '36px',
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn btn-secondary btn-lg"
                style={{ flex: 1, minWidth: '150px', height: '46px', minHeight: '46px' }}
              >
                {added ? (
                  <>
                    <Check size={16} color="var(--color-success)" /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="btn btn-primary btn-lg"
                style={{ flex: 1, minWidth: '150px', height: '46px', minHeight: '46px' }}
              >
                Buy Now
              </button>
            </div>

            {/* Direct WhatsApp Consultation / Order Link */}
            <a
              href={getWhatsAppProductEnquiryUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #25D366',
                color: '#128C7E',
                backgroundColor: '#F0FDF4',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none'
              }}
              title="Enquire on WhatsApp with prefilled message"
            >
              <MessageCircle size={18} color="#25D366" />
              <span>Enquire / Request Video Call on WhatsApp (+91 {STORE_CONFIG.phone})</span>
            </a>

            {/* Delivery Estimator Checker */}
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              backgroundColor: '#FAF7F2'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                <Truck size={16} color="var(--color-primary-maroon)" />
                <span>Check Delivery to Your PIN Code</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="form-input"
                  style={{ height: '38px', minHeight: '38px', maxWidth: '170px', fontSize: '13px' }}
                />
                <button
                  type="button"
                  onClick={() => handleCheckPincode(pincode)}
                  disabled={checkingDelivery}
                  className="btn btn-secondary btn-sm"
                  style={{ height: '38px', minHeight: '38px' }}
                >
                  {checkingDelivery ? 'Checking...' : 'Check'}
                </button>
              </div>

              {deliveryResult && (
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  {deliveryResult.isServiceable ? (
                    <div style={{ color: 'var(--color-success)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: 600 }}>
                        ✓ Express Shipping to {deliveryResult.state} ({deliveryResult.pincode})
                      </span>
                      <span style={{ color: 'var(--color-soft-charcoal)' }}>
                        Delivery estimate: <strong>{deliveryResult.estimatedDays}</strong> from Dharashiv (PIN 413534).
                      </span>
                      <span style={{ color: 'var(--color-muted-text)' }}>
                        Cash on Delivery available pan-India.
                      </span>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--color-error)' }}>
                      {deliveryResult.message}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Saree Specifications Table */}
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: 'var(--color-cream-surface)',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)',
                letterSpacing: '0.02em'
              }}>
                Saree Details & Product Specifications
              </div>
              <table className="table" style={{ margin: 0 }}>
                <tbody>
                  <tr>
                    <td style={{ width: '38%', color: 'var(--color-muted-text)', fontSize: '12px' }}>Fabric / Weave</td>
                    <td style={{ fontWeight: 600, fontSize: '12px' }}>{product.fabric}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--color-muted-text)', fontSize: '12px' }}>Primary Colour</td>
                    <td style={{ fontSize: '12px' }}>{product.colour}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--color-muted-text)', fontSize: '12px' }}>Occasion</td>
                    <td style={{ fontSize: '12px' }}>{product.occasion}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--color-muted-text)', fontSize: '12px' }}>Blouse Piece</td>
                    <td style={{ fontSize: '12px' }}>{product.blousePiece || 'Included (0.8m pure silk running blouse)'}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--color-muted-text)', fontSize: '12px' }}>Saree Length</td>
                    <td style={{ fontSize: '12px' }}>{product.length || '6.3 Meters (including blouse piece)'}</td>
                  </tr>
                  <tr>
                    <td style={{ color: 'var(--color-muted-text)', fontSize: '12px' }}>Weaving Cluster</td>
                    <td style={{ fontSize: '12px' }}>Yeola / Varanasi Handloom Weavers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Description & Preservation */}
            <div>
              <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-antique-gold)', margin: '0 0 6px 0' }}>
                Description
              </h4>
              <p style={{ color: 'var(--color-soft-charcoal)', lineHeight: 1.6, fontSize: '13px', margin: 0 }}>
                {product.description}
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFF9ED',
              border: '1px solid #E6D2A8',
              borderRadius: 'var(--radius-sm)',
              padding: '12px'
            }}>
              <strong style={{ fontSize: '12px', color: '#8A641B' }}>Care & Storage Guidelines</strong>
              <p style={{ fontSize: '12px', color: '#524328', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                {product.careInstructions || 'Dry clean only. Preserve wrapped in a soft muslin cloth. Never spray perfume directly on metallic zari threads.'}
              </p>
            </div>

          </div>
        </div>

        {/* Related Sarees Section */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: '48px', paddingTop: '28px', borderTop: '1px solid rgba(197, 160, 89, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', margin: 0, color: 'var(--color-primary-maroon)' }}>
                  Similar Handwoven Sarees
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--color-muted-text)', margin: '2px 0 0 0' }}>
                  Handpicked alternatives from the same weaver lineage
                </p>
              </div>
              <Link to={`/?category=${product.category}`} style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary-maroon)' }}>
                View All →
              </Link>
            </div>

            <div className="mobile-grid-2col">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Mobile Sticky Bottom Floating Action Bar */}
      <div
        className="mobile-only"
        style={{
          position: 'fixed',
          bottom: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--color-border)',
          padding: '8px 12px',
          zIndex: 950,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.08)'
        }}
      >
        <div>
          <div style={{ fontSize: '10px', color: 'var(--color-muted-text)' }}>Price</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-primary-maroon)', lineHeight: 1.1 }}>
            ₹{product.price.toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flex: 1, justifyContent: 'flex-end' }}>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="btn btn-secondary btn-sm"
            style={{ height: '38px', minHeight: '38px', padding: '0 10px', fontSize: '11px', flex: 1 }}
          >
            {added ? '✓ Added' : '+ Add to Bag'}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="btn btn-primary btn-sm"
            style={{ height: '38px', minHeight: '38px', padding: '0 12px', fontSize: '11px', flex: 1 }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
