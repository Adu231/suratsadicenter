import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, Minus, Truck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { STORE_CONFIG, getWhatsAppCartOrderUrl } from '../config/storeConfig.js';

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

  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold || 1499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const whatsappCartUrl = getWhatsAppCartOrderUrl(items, total);

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
        maxWidth: '430px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-drawer)',
        zIndex: 1101
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FAF7F2'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} color="var(--color-primary-maroon)" />
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700 }}>
              Shopping Bag ({itemCount})
            </h3>
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
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{
          padding: '10px 20px',
          backgroundColor: '#FFFDF9',
          borderBottom: '1px solid rgba(197, 160, 89, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', marginBottom: '5px' }}>
            <Truck size={13} color="var(--color-primary-maroon)" />
            <span>
              {remainingForFreeShipping === 0 ? (
                <strong style={{ color: 'var(--color-success)' }}>
                  🎉 You unlocked FREE Pan-India Delivery!
                </strong>
              ) : (
                <span>
                  Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Pan-India Delivery</strong>
                </span>
              )}
            </span>
          </div>
          <div style={{
            height: '5px',
            backgroundColor: '#EAE2D5',
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
          padding: '16px 20px'
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 16px',
              color: 'var(--color-muted-text)'
            }}>
              <ShoppingBag size={44} strokeWidth={1.2} style={{ marginBottom: '14px', opacity: 0.4 }} />
              <h4 style={{ color: 'var(--color-primary-maroon)' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px', marginTop: '6px', marginBottom: '20px' }}>
                Discover pure silk Paithani, Banarasi, and authentic bridal sarees.
              </p>
              <button
                onClick={() => {
                  closeDrawer();
                  navigate('/');
                }}
                className="btn btn-primary btn-sm"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '68px',
                      height: '86px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-secondary-surface)'
                    }}
                    onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                        <h4 style={{ fontSize: '13px', lineHeight: 1.3, margin: '0 0 2px 0', fontWeight: 600 }}>
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
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: 0 }}>
                        {item.fabric} {item.colour ? `• ${item.colour}` : ''}
                      </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
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
                          <Minus size={11} />
                        </button>
                        <span style={{ fontSize: '12px', fontWeight: 700, minWidth: '22px', textAlign: 'center' }}>
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
                          <Plus size={11} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--color-primary-maroon)' }}>
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

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--color-border)',
            backgroundColor: '#FAF7F2'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
              <span style={{ color: 'var(--color-muted-text)' }}>Shipping:</span>
              <span style={{ fontWeight: 600, color: shippingFee === 0 ? 'var(--color-success)' : 'inherit' }}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '14px',
              fontSize: '15px',
              fontWeight: 700,
              borderTop: '1px dashed var(--color-border)',
              paddingTop: '8px'
            }}>
              <span>Total Payable:</span>
              <span style={{ color: 'var(--color-primary-maroon)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            {/* Checkout & WhatsApp Order Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '42px', height: '42px', fontSize: '12px' }}
              >
                Proceed to Checkout <ArrowRight size={15} />
              </button>

              <a
                href={whatsappCartUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  width: '100%',
                  minHeight: '38px',
                  height: '38px',
                  fontSize: '11px',
                  color: '#1E7E45',
                  borderColor: '#1E7E45',
                  gap: '6px'
                }}
              >
                <MessageCircle size={15} color="#1E7E45" /> Order via WhatsApp (+91 {STORE_CONFIG.phone})
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
