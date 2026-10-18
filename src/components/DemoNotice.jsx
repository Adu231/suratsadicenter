import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, RefreshCw, X, Shield, Settings2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export const DemoNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, switchRole } = useAuth();
  const { resetAllData } = useProducts();
  const { refreshCart } = useCart();
  const [resetMessage, setResetMessage] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demo products, orders, and cart back to original boutique data?')) {
      resetAllData();
      refreshCart();
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 3000);
    }
  };

  return (
    <>
      {/* Floating Discrete Luxury Badge */}
      <div
        style={{
          position: 'fixed',
          bottom: '82px',
          left: '16px',
          zIndex: 990,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: 'rgba(20, 18, 18, 0.92)',
              backdropFilter: 'blur(12px)',
              color: 'var(--color-antique-gold)',
              border: '1.5px solid rgba(197, 160, 89, 0.5)',
              borderRadius: 'var(--radius-full)',
              width: '38px',
              height: '38px',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            title={`Store Console (${isAdmin ? 'Admin' : 'Client'})`}
            aria-label="Open Store Console"
          >
            <Settings2 size={16} color="var(--color-antique-gold)" />
          </button>
        ) : (
          <div
            style={{
              backgroundColor: 'rgba(18, 16, 16, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              color: 'var(--color-warm-ivory)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              width: '310px',
              animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={14} color="var(--color-antique-gold)" />
                <span style={{
                  fontFamily: 'var(--font-brand-display)',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: 'var(--color-antique-gold)',
                  textTransform: 'uppercase',
                  fontWeight: 700
                }}>
                  Store Demo Console
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted-light)',
                  cursor: 'pointer',
                  padding: '2px'
                }}
              >
                <X size={14} />
              </button>
            </div>

            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', margin: '0 0 14px 0', lineHeight: 1.5 }}>
              Switch role to test the store from an Administrator or Customer perspective.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => switchRole('customer')}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: !isAdmin ? 'var(--color-antique-gold)' : 'rgba(255,255,255,0.15)',
                    backgroundColor: !isAdmin ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
                    color: !isAdmin ? 'var(--color-antique-gold)' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer'
                  }}
                >
                  Client View
                </button>
                <button
                  onClick={() => switchRole('admin')}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: isAdmin ? 'var(--color-antique-gold)' : 'rgba(255,255,255,0.15)',
                    backgroundColor: isAdmin ? 'rgba(197, 160, 89, 0.15)' : 'transparent',
                    color: isAdmin ? 'var(--color-antique-gold)' : 'rgba(255,255,255,0.7)',
                    cursor: 'pointer'
                  }}
                >
                  Admin View
                </button>
              </div>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  style={{
                    backgroundColor: 'var(--color-primary-maroon)',
                    color: 'var(--color-white)',
                    textAlign: 'center',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    letterSpacing: '0.04em'
                  }}
                >
                  Open Admin Dashboard →
                </Link>
              )}

              <button
                onClick={handleReset}
                style={{
                  background: 'none',
                  border: '1px dashed rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.6)',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={11} /> {resetMessage ? 'Reset Complete!' : 'Reset Demo Data'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
