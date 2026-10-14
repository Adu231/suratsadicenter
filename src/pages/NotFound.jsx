import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-primary-maroon)', marginBottom: '8px' }}>404</h1>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--color-muted-text)', maxWidth: '480px', margin: '0 auto 28px auto' }}>
        The saree collection or page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        <ArrowLeft size={18} /> Return to Homepage
      </Link>
    </div>
  );
};
