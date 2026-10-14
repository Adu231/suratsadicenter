import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, RefreshCw, X, UserCog } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export const DemoNotice = () => {
  const [dismissed, setDismissed] = useState(false);
  const { user, isAdmin, switchRole } = useAuth();
  const { resetAllData } = useProducts();
  const { refreshCart } = useCart();
  const [resetMessage, setResetMessage] = useState(false);

  if (dismissed) return null;

  const handleReset = () => {
    if (window.confirm('Reset all demo products, orders, and cart back to factory sample data?')) {
      resetAllData();
      refreshCart();
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 3000);
    }
  };

  return (
    <aside
      aria-label="Demo notice banner"
      style={{
        backgroundColor: 'var(--color-soft-charcoal)',
        color: 'var(--color-warm-ivory)',
        fontSize: 'var(--text-xs)',
        padding: '8px 16px',
        borderBottom: '1px solid rgba(209, 180, 119, 0.3)',
        position: 'relative',
        zIndex: 50
      }}
    >
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: 'var(--color-antique-gold)',
            color: 'var(--color-soft-charcoal)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.05em'
          }}>
            FRONTEND DEMO MVP
          </span>
          <span>
            Operating in-browser with localStorage. No external database or payment gateway required.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {resetMessage ? (
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓ Demo data restored!</span>
          ) : (
            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'var(--color-warm-ivory)',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Reset products and orders to original mock data"
            >
              <RefreshCw size={12} /> Reset Demo Data
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--color-antique-gold)' }}>Role:</span>
            <button
              onClick={() => switchRole(isAdmin ? 'customer' : 'admin')}
              style={{
                background: isAdmin ? 'var(--color-primary-maroon)' : '#3F3B36',
                color: 'var(--color-white)',
                border: 'none',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <UserCog size={12} /> {isAdmin ? 'Admin View' : 'Customer View'} (Toggle)
            </button>
          </div>

          <Link
            to="/admin"
            style={{
              color: 'var(--color-antique-gold)',
              fontWeight: 600,
              textDecoration: 'underline',
              fontSize: 'var(--text-xs)'
            }}
          >
            Admin Panel →
          </Link>

          <button
            onClick={() => setDismissed(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-muted-text)',
              cursor: 'pointer',
              marginLeft: '4px',
              display: 'inline-flex',
              alignItems: 'center'
            }}
            title="Dismiss notice"
            aria-label="Dismiss demo banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
