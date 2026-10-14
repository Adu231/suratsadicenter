import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export const CartPage = () => {
  const {
    items,
    subtotal,
    shippingFee,
    total,
    itemCount,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  const freeShippingThreshold = 1499;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-secondary-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            color: 'var(--color-primary-maroon)'
          }}>
            <ShoppingBag size={40} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Your Shopping Bag is Empty</h2>
          <p style={{ color: 'var(--color-muted-text)', marginBottom: '28px', lineHeight: 1.6 }}>
            Explore our heritage handloom Paithani, Banarasi, and bridal saree collection woven with authentic zari.
          </p>
          <Link to="/catalog" className="btn btn-primary btn-lg">
            Browse Saree Collection <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '36px 16px 64px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <Link to="/catalog" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-primary-maroon)', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>

      <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', marginBottom: '24px' }}>
        Shopping Cart ({itemCount} {itemCount === 1 ? 'Saree' : 'Sarees'})
      </h1>

      {/* Free Shipping Alert Box */}
      <div style={{
        backgroundColor: '#FAF7F2',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px 20px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', marginBottom: '8px' }}>
          <Truck size={18} color="var(--color-primary-maroon)" />
          {remainingForFreeShipping === 0 ? (
            <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>
              🎉 You have unlocked FREE Pan-India Delivery!
            </span>
          ) : (
            <span>
              Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more to your bag for <strong>FREE Pan-India Delivery</strong>.
            </span>
          )}
        </div>
        <div style={{
          height: '8px',
          backgroundColor: '#E3DACE',
          borderRadius: '999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            backgroundColor: remainingForFreeShipping === 0 ? 'var(--color-success)' : 'var(--color-primary-maroon)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Cart Grid Layout: Items Table + Summary Card */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '36px',
        alignItems: 'start'
      }}>
        {/* Items List */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-secondary-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Saree Details</span>
            <button
              onClick={clearCart}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-error)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Clear Cart
            </button>
          </div>

          <div style={{ padding: '0 20px' }}>
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '20px',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--color-border)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '84px',
                    height: '105px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-secondary-surface)'
                  }}
                  onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                />

                <div style={{ flex: 1 }}>
                  <Link to={`/product/${item.slug}`}>
                    <h3 style={{ fontSize: '1rem', lineHeight: 1.35, marginBottom: '2px' }}>
                      {item.name}
                    </h3>
                  </Link>
                  {item.marathiName && (
                    <p className="font-devanagari" style={{ fontSize: '0.8rem', color: 'var(--color-primary-maroon)' }}>
                      {item.marathiName}
                    </p>
                  )}
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                    {item.fabric} • {item.colour}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
                    {/* Quantity Selector */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#FFFFFF'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 600 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary-maroon)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--color-muted-text)',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Card */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Subtotal ({itemCount} items)</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Pan-India Delivery</span>
              <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--color-success)' : 'inherit' }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Taxes (GST)</span>
              <span style={{ color: 'var(--color-muted-text)' }}>Included</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.2rem',
              fontWeight: 700,
              borderTop: '2px solid var(--color-border)',
              paddingTop: '16px',
              marginTop: '4px'
            }}>
              <span>Total Amount:</span>
              <span style={{ color: 'var(--color-primary-maroon)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Proceed to Demo Checkout <ArrowRight size={18} />
            </button>

            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', textAlign: 'center', lineHeight: 1.4 }}>
              *This is a local demo checkout. No actual charges are made.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '0.8rem',
            color: 'var(--color-muted-text)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="var(--color-success)" />
              <span>100% Genuine Handloom Quality Assurance</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Truck size={16} color="var(--color-primary-maroon)" />
              <span>Dispatched from Dharashiv, Maharashtra (PIN 413534)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
