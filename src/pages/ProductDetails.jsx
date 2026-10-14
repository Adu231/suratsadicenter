import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Check,
  ChevronRight,
  Phone,
  Clock,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { shippingService } from '../services/shippingService.js';
import { ProductCard } from '../components/ProductCard.jsx';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

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
        <h2>Saree Not Found</h2>
        <p style={{ color: 'var(--color-muted-text)', marginTop: '8px', marginBottom: '24px' }}>
          The requested saree might have been updated or removed from the catalog.
        </p>
        <Link to="/catalog" className="btn btn-primary">
          Back to Saree Collection
        </Link>
      </div>
    );
  }

  const discountPercent = product.compareAtPrice && product.compareAtPrice > product.price
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= (product.lowStockThreshold || 3);

  const handleAddToCart = () => {
    addToCart(product.id, quantity, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity, false);
    navigate('/checkout');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container" style={{ padding: '32px 16px 64px 16px' }}>
      {/* Breadcrumb */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.85rem',
        color: 'var(--color-muted-text)',
        marginBottom: '24px'
      }}>
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/catalog">Sarees</Link>
        <ChevronRight size={14} />
        <Link to={`/catalog?category=${product.category}`}>{product.categoryName || 'Collection'}</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--color-soft-charcoal)', fontWeight: 600 }}>{product.name}</span>
      </nav>

      {/* Main Product Showcase: 2 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '48px',
        alignItems: 'start'
      }}>
        {/* Gallery Column */}
        <div>
          {/* Main Display Image */}
          <div style={{
            position: 'relative',
            paddingTop: '125%', // 4:5 Aspect Ratio
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-secondary-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <img
              src={selectedImage}
              alt={product.name}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = '/saree-paithani.png';
              }}
            />

            {/* Badges */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              {product.isBestseller && (
                <span className="badge badge-gold" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                  ★ Bestseller
                </span>
              )}
              {discountPercent > 0 && (
                <span className="badge" style={{ backgroundColor: '#256B45', color: '#FFF', fontSize: '0.8rem', padding: '4px 10px' }}>
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '72px',
                    height: '90px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: selectedImage === img ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                    opacity: selectedImage === img ? 1 : 0.7,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-neutral">{product.fabric}</span>
              <span className="badge badge-neutral">{product.occasion}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginLeft: 'auto' }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', lineHeight: 1.25, marginBottom: '6px' }}>
              {product.name}
            </h1>

            {product.marathiName && (
              <p className="font-devanagari" style={{
                fontSize: '1.15rem',
                color: 'var(--color-primary-maroon)',
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                {product.marathiName}
              </p>
            )}

            {product.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#FDF6E2',
                  border: '1px solid #D1B477',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 700,
                  color: '#7D5D1D'
                }}>
                  <Star size={13} fill="#7D5D1D" color="#7D5D1D" /> {product.rating}
                </span>
                <span style={{ color: 'var(--color-muted-text)' }}>
                  ({product.reviewCount || 24} customer ratings)
                </span>
              </div>
            )}
          </div>

          {/* Pricing Box */}
          <div style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-primary-maroon)'
              }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span style={{
                    fontSize: '1.15rem',
                    textDecoration: 'line-through',
                    color: 'var(--color-muted-text)'
                  }}>
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{
                    color: 'var(--color-success)',
                    fontWeight: 700,
                    fontSize: '0.95rem'
                  }}>
                    Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')} ({discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
              Inclusive of all taxes. Free Pan-India Delivery on this saree.
            </p>
          </div>

          {/* Stock Availability */}
          <div>
            {isOutOfStock ? (
              <span className="badge badge-error" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                Currently Sold Out
              </span>
            ) : isLowStock ? (
              <span className="badge badge-error" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                ⚡ Only {product.stockQuantity} pieces remaining in stock!
              </span>
            ) : (
              <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                ✓ In Stock ({product.stockQuantity} available)
              </span>
            )}
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              height: '48px'
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
                  fontSize: '1.1rem'
                }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stockQuantity || 10, quantity + 1))}
                style={{
                  width: '36px',
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontSize: '1.1rem'
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn btn-secondary btn-lg"
              style={{ flex: 1, minWidth: '160px' }}
            >
              {added ? (
                <>
                  <Check size={18} color="var(--color-success)" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={18} /> Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="btn btn-primary btn-lg"
              style={{ flex: 1, minWidth: '160px' }}
            >
              Buy Now (Demo)
            </button>
          </div>

          {/* WhatsApp Direct Enquiry */}
          <a
            href={`https://wa.me/919876543210?text=Hello%20Surat%20Sadi%20Center,%20I%20am%20interested%20in%20"${encodeURIComponent(product.name)}"%20(SKU:%20${product.sku})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #25D366',
              color: '#128C7E',
              backgroundColor: '#F0FDF4',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none'
            }}
          >
            <Phone size={16} /> Request Video Call View on WhatsApp
          </a>

          {/* Delivery PIN Code Serviceability Checker */}
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            backgroundColor: '#FFFFFF'
          }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={16} color="var(--color-primary-maroon)" /> Pan-India Delivery Estimate
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Enter 6-digit PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                className="form-input"
                style={{ height: '42px', maxWidth: '200px' }}
              />
              <button
                onClick={() => handleCheckPincode(pincode)}
                disabled={checkingDelivery}
                className="btn btn-secondary btn-sm"
              >
                {checkingDelivery ? 'Checking...' : 'Check Service'}
              </button>
            </div>

            {deliveryResult && (
              <div style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                {deliveryResult.isServiceable ? (
                  <div style={{ color: 'var(--color-success)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: 600 }}>
                      ✓ Serviceable to {deliveryResult.state} ({deliveryResult.pincode})
                    </span>
                    <span style={{ color: 'var(--color-soft-charcoal)' }}>
                      Estimated delivery: <strong>{deliveryResult.estimatedDays}</strong> from Dharashiv (PIN 413534).
                    </span>
                    <span style={{ color: 'var(--color-muted-text)' }}>
                      Shipping: <strong>{deliveryResult.shippingFee === 0 ? 'FREE' : `₹${deliveryResult.shippingFee}`}</strong> • Cash on Delivery Available
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

          {/* Specifications Table */}
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}>
            <h4 style={{
              backgroundColor: 'var(--color-secondary-surface)',
              padding: '12px 16px',
              fontSize: '0.95rem',
              margin: 0
            }}>
              Saree Specifications & Fabric Details
            </h4>
            <table className="table" style={{ margin: 0 }}>
              <tbody>
                <tr>
                  <td style={{ width: '35%', color: 'var(--color-muted-text)', fontWeight: 500 }}>Fabric / Material</td>
                  <td style={{ fontWeight: 600 }}>{product.fabric}</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--color-muted-text)', fontWeight: 500 }}>Colour / Shade</td>
                  <td>{product.colour}</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--color-muted-text)', fontWeight: 500 }}>Occasion</td>
                  <td>{product.occasion}</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--color-muted-text)', fontWeight: 500 }}>Blouse Piece</td>
                  <td>{product.blousePiece || 'Included (0.8m pure silk)'}</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--color-muted-text)', fontWeight: 500 }}>Saree Length</td>
                  <td>{product.length || '6.3 Meters (including blouse piece)'}</td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--color-muted-text)', fontWeight: 500 }}>Origin Cluster</td>
                  <td>Yeola / Varanasi Handloom Weavers</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Description & Care Instructions */}
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Description</h4>
            <p style={{ color: 'var(--color-soft-charcoal)', lineHeight: 1.6, fontSize: '0.95rem' }}>
              {product.description}
            </p>
          </div>

          <div style={{
            backgroundColor: '#FAF7F2',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '4px', color: 'var(--color-primary-maroon)' }}>
              Handloom Care & Muslin Preservation
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-soft-charcoal)', lineHeight: 1.5 }}>
              {product.careInstructions || 'Dry clean recommended. Preserve in a breathable cotton or muslin bag. Air occasionally.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Sarees */}
      {relatedProducts.length > 0 && (
        <section style={{ marginTop: '72px', paddingTop: '48px', borderTop: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>
            Similar Handwoven Sarees
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
