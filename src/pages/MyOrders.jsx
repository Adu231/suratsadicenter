import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, Calendar, MapPin, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { storageService } from '../services/storageService.js';
import { useAuth } from '../context/AuthContext.jsx';

export const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const allOrders = storageService.getOrders();
    setOrders(allOrders);
  };

  const handleCancelOrder = (orderNumber) => {
    if (window.confirm(`Are you sure you want to cancel demo order ${orderNumber}?`)) {
      storageService.cancelOrder(orderNumber, 'Customer initiated demo cancellation');
      loadOrders();
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="badge badge-success">✓ Delivered</span>;
      case 'Dispatched':
      case 'Out for Delivery':
        return <span className="badge badge-maroon">🚚 {status}</span>;
      case 'Processing':
        return <span className="badge badge-gold">⚙ Processing</span>;
      case 'Cancelled':
        return <span className="badge badge-error">✕ Cancelled</span>;
      default:
        return <span className="badge badge-neutral">✓ {status}</span>;
    }
  };

  return (
    <div className="container" style={{ padding: '36px 16px 80px 16px', maxWidth: '960px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', marginBottom: '4px' }}>
            My Demo Orders
          </h1>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem' }}>
            Track and manage your saree demo purchases stored in browser localStorage.
          </p>
        </div>
        <Link to="/catalog" className="btn btn-primary btn-sm">
          Browse Sarees <ArrowRight size={14} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '64px 20px',
          textAlign: 'center'
        }}>
          <Package size={48} strokeWidth={1.2} color="var(--color-muted-text)" style={{ marginBottom: '16px' }} />
          <h3>No Orders Found</h3>
          <p style={{ color: 'var(--color-muted-text)', marginTop: '8px', marginBottom: '24px' }}>
            You haven't placed any demo orders yet. Test adding a saree to the cart and completing checkout.
          </p>
          <Link to="/catalog" className="btn btn-primary">
            Explore Handloom Sarees
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map(order => (
            <div
              key={order.id || order.orderNumber}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              {/* Card Header */}
              <div style={{
                padding: '16px 20px',
                backgroundColor: 'var(--color-warm-ivory)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Package size={20} color="var(--color-primary-maroon)" />
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)' }}>Order Number</span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0, color: 'var(--color-primary-maroon)' }}>
                      {order.orderNumber}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Order Date</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, margin: 0 }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    {getStatusBadge(order.orderStatus)}
                  </div>
                </div>
              </div>

              {/* Items in this order */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>{item.name}</h4>


                        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                          Qty: {item.quantity} • ₹{item.price.toLocaleString('en-IN')} each
                        </p>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--color-soft-charcoal)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Details */}
                <div style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '0.85rem'
                }}>
                  <div>
                    <span style={{ color: 'var(--color-muted-text)' }}>Delivery To: </span>
                    <strong>{order.customer.name}</strong>, {order.customer.city} ({order.customer.pincode})
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                    <div>
                      <span style={{ color: 'var(--color-muted-text)' }}>Total: </span>
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-primary-maroon)' }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    {order.orderStatus !== 'Cancelled' && order.orderStatus !== 'Delivered' && (
                      <button
                        onClick={() => handleCancelOrder(order.orderNumber)}
                        className="btn btn-secondary btn-sm"
                        style={{ color: 'var(--color-error)' }}
                      >
                        <XCircle size={14} /> Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
