import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export const CartDrawer = () => {
  const {
    items,
    subtotal,
    shippingFee,
    total,
    itemCount,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart
  } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(37, 35, 33, 0.6)',
      backdropFilter: 'blur(3px)',
      zIndex: 1100,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 0.2s ease-in-out'
    }}>
      {/* Backdrop click to close */}
      <div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        onClick={closeDrawer}
      />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-drawer)',
        zIndex: 1101
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-warm-ivory)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--color-primary-maroon)" />
            <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Shopping Cart ({itemCount})</h3>
          </div>
          <button
            onClick={closeDrawer}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-soft-charcoal)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '12px 24px',
          backgroundColor: '#FAF7F2',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', marginBottom: '6px' }}>
            <Truck size={14} color="var(--color-primary-maroon)" />
            <span>
              {remainingForFreeShipping === 0 ? (
                <strong style={{ color: 'var(--color-success)' }}>
                  🎉 Congratulations! You qualify for FREE Pan-India Shipping!
                </strong>
              ) : (
                <span>
                  Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Pan-India Delivery</strong>!
                </span>
              )}
            </span>
          </div>
          <div style={{
            height: '6px',
            backgroundColor: '#E3DACE',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: remainingForFreeShipping === 0 ? 'var(--color-success)' : 'var(--color-primary-maroon)',
              transition: 'width 0.3s ease-in-out'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px'
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 16px',
              color: 'var(--color-muted-text)'
            }}>
              <ShoppingBag size={48} strokeWidth={1.2} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <h4>Your cart is empty</h4>
              <p style={{ fontSize: '0.875rem', marginTop: '8px', marginBottom: '24px' }}>
                Discover handwoven Paithani, Banarasi, and authentic bridal sarees.
              </p>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/catalog');
                }}
                className="btn btn-primary"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '74px',
                      height: '92px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-secondary-surface)'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h4 style={{ fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '2px' }}>
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-muted-text)',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                        {item.fabric} • {item.colour}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      {/* Quantity Controls */}
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
                            width: '26px',
                            height: '26px',
                            border: 'none',
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{
                            width: '26px',
                            height: '26px',
                            border: 'none',
                            background: 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-primary-maroon)' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-warm-ivory)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Estimated Delivery:</span>
              <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--color-success)' : 'inherit' }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '18px',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderTop: '1px dashed var(--color-border)',
              paddingTop: '10px'
            }}>
              <span>Total:</span>
              <span style={{ color: 'var(--color-primary-maroon)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/cart');
                }}
                className="btn btn-secondary"
              >
                View Cart
              </button>
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
              >
                Checkout <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
