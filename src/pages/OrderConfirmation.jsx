import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, Truck, MapPin, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { storageService } from '../services/storageService.js';

export const OrderConfirmation = () => {
  const { orderNumber } = useParams();
  const order = storageService.getOrderById(orderNumber);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
        <h2>Order Not Found</h2>
        <p style={{ color: 'var(--color-muted-text)', marginTop: '8px', marginBottom: '24px' }}>
          Could not locate order reference "{orderNumber}" in browser local storage.
        </p>
        <Link to="/catalog" className="btn btn-primary">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Demo Order Placed', desc: 'Saved in LocalStorage', done: true },
    { title: 'Packaging in Muslin', desc: 'Dharashiv Hub (413534)', done: order.orderStatus !== 'Cancelled' },
    { title: 'Surface Express Dispatch', desc: 'Pan-India Transit', done: ['Dispatched', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { title: 'Doorstep Delivery', desc: 'Cash on Delivery Collection', done: order.orderStatus === 'Delivered' }
  ];

  return (
    <div className="container" style={{ padding: '48px 16px 80px 16px', maxWidth: '800px' }}>
      {/* Success Badge & Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 20px',
        textAlign: 'center',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '28px'
      }}>
        {/* Shop Logo in Receipt */}
        <div style={{ marginBottom: '18px' }}>
          <img
            src="/surat-sadi-center-logo.png"
            alt="Surat Sadi Center - Premium Handloom Sarees"
            style={{
              height: '42px',
              maxWidth: '240px',
              objectFit: 'contain',
              margin: '0 auto',
              display: 'block'
            }}
          />
        </div>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#EAF4EE',
          color: 'var(--color-success)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <CheckCircle2 size={38} />
        </div>

        <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 14px', marginBottom: '12px' }}>
          ✓ Demo Order Placed Successfully
        </span>

        <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginTop: '8px', marginBottom: '6px' }}>
          Thank You for Shopping with Surat Sadi Center!
        </h1>

        <p style={{ color: 'var(--color-soft-charcoal)', fontSize: '0.95rem', maxWidth: '580px', margin: '0 auto 16px auto' }}>
          Your saree demo order has been registered in the browser database.
        </p>

        {/* Demo Warning Box */}
        <div style={{
          backgroundColor: '#FAF7F2',
          border: '1px dashed var(--color-antique-gold)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 20px',
          display: 'inline-block',
          textAlign: 'left',
          maxWidth: '560px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#7D5D1D', fontWeight: 600, margin: 0 }}>
            ⚠️ DEMO MVP NOTICE:
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-soft-charcoal)', marginTop: '4px', margin: 0, lineHeight: 1.4 }}>
            This is a simulated order stored in your browser's local storage. No real money has been charged, and no actual courier package will be dispatched.
          </p>
        </div>

        {/* Order Number & Meta */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '0.85rem',
          color: 'var(--color-muted-text)'
        }}>
          <div>
            <span>Demo Order Reference:</span>
            <p style={{ fontWeight: 700, color: 'var(--color-primary-maroon)', fontSize: '1.05rem', margin: '2px 0 0 0' }}>
              {order.orderNumber}
            </p>
          </div>
          <div>
            <span>Placed On:</span>
            <p style={{ fontWeight: 600, color: 'var(--color-soft-charcoal)', margin: '2px 0 0 0' }}>
              {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <span>Payment Method:</span>
            <p style={{ fontWeight: 600, color: 'var(--color-soft-charcoal)', margin: '2px 0 0 0' }}>
              {order.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Simulated Tracking Stepper */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Truck size={18} color="var(--color-primary-maroon)" /> Simulated Order Lifecycle
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          position: 'relative'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              opacity: step.done ? 1 : 0.4
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '999px',
                backgroundColor: step.done ? 'var(--color-primary-maroon)' : 'var(--color-secondary-surface)',
                color: step.done ? '#FFFFFF' : 'var(--color-soft-charcoal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '8px'
              }}>
                {idx + 1}
              </div>
              <h4 style={{ fontSize: '0.85rem', marginBottom: '2px' }}>{step.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-subtle)'
      }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingBag size={18} color="var(--color-primary-maroon)" /> Ordered Sarees
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                onError={(e) => { e.target.src = '/saree-paithani.png'; }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '2px' }}>{item.name}</h4>


                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                  Quantity: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                </p>
              </div>
              <span style={{ fontWeight: 700, color: 'var(--color-primary-maroon)' }}>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Delivery Address & Summary */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          backgroundColor: 'var(--color-warm-ivory)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-md)'
        }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--color-primary-maroon)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Delivery Destination
            </h4>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0 0 2px 0' }}>{order.customer.name}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-soft-charcoal)', margin: '0 0 2px 0' }}>{order.customer.address}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', margin: 0 }}>
              Phone: {order.customer.phone} • PIN: {order.customer.pincode}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span style={{ fontWeight: 600 }}>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Fee:</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderTop: '1px dashed var(--color-border)',
              paddingTop: '8px',
              marginTop: '4px'
            }}>
              <span>Total Payable:</span>
              <span style={{ color: 'var(--color-primary-maroon)' }}>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center' }}>
        <Link to="/orders" className="btn btn-secondary btn-lg">
          <Package size={18} /> View in My Orders
        </Link>
        <Link to="/catalog" className="btn btn-primary btn-lg">
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};
