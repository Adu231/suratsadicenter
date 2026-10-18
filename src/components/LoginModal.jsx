import React, { useState } from 'react';
import { X, User, Lock, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { DEMO_USERS } from '../data/mockData.js';

export const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register } = useAuth();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isRegisterMode) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill all required fields');
        return;
      }
      register(formData);
    } else {
      if (!formData.email) {
        setError('Please enter your email or phone number');
        return;
      }
      login({ email: formData.email, password: formData.password });
    }
  };

  const handleQuickLogin = (role) => {
    const creds = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.customer;
    login({ email: creds.email, password: 'demoPassword' });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(37, 35, 33, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '460px',
        boxShadow: 'var(--shadow-drawer)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: '#FFFFFF',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '4px' }}>
              {isRegisterMode ? 'Create Customer Account' : 'Demo Account Login'}
            </h3>
            <p style={{ color: '#F4EAEF', fontSize: '0.85rem' }}>
              Surat Sadi Center — Premium Handloom Sarees
            </p>
          </div>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Quick Demo Login Buttons */}
          <div style={{
            backgroundColor: 'var(--color-warm-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <p style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-primary-maroon)',
              marginBottom: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              ⚡ Quick 1-Click Demo Login
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('customer')}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', height: '40px', padding: '0 8px' }}
              >
                Pooja (Customer)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className="btn btn-primary"
                style={{ fontSize: '0.8rem', height: '40px', padding: '0 8px' }}
              >
                Admin (Storeowner)
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginTop: '8px', lineHeight: 1.4 }}>
              *This demo uses browser local storage. No actual password or account verification is needed.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {isRegisterMode && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Anjali Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email or Phone Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="customer@example.com or 9823456789"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {isRegisterMode && (
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Password (Demo)</label>
              <input
                type="password"
                className="form-input"
                placeholder="Any mock password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              {isRegisterMode ? 'Create Demo Account' : 'Sign In (Demo)'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError('');
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-maroon)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              {isRegisterMode
                ? 'Already have an account? Sign In'
                : "Don't have an account? Register here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
