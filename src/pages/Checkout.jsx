import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { storageService } from '../services/storageService.js';

export const Checkout = () => {
  const { items, subtotal, shippingFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.address?.fullName || user?.name || 'Pooja Kulkarni',
    phone: user?.address?.phone || user?.phone || '9823456789',
    email: user?.email || 'pooja@example.com',
    pincode: user?.address?.pincode || '413534',
    addressLine1: user?.address?.addressLine1 || 'Flat 302, Sai Shraddha Residency',
    locality: user?.address?.locality || 'Station Road',
    city: user?.address?.city || 'Dharashiv',
    state: user?.address?.state || 'Maharashtra',
    orderNotes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  // Handle PIN auto fill
  const handlePincodeChange = (pin) => {
    setFormData(prev => ({ ...prev, pincode: pin }));
    if (pin.trim() === '413534') {
      setFormData(prev => ({
        ...prev,
        city: 'Dharashiv',
        state: 'Maharashtra'
      }));
    } else if (pin.startsWith('411')) {
      setFormData(prev => ({
        ...prev,
        city: 'Pune',
        state: 'Maharashtra'
      }));
    } else if (pin.startsWith('400')) {
      setFormData(prev => ({
        ...prev,
        city: 'Mumbai',
        state: 'Maharashtra'
      }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!formData.pincode.trim()) {
      errs.pincode = 'PIN Code is required';
    } else if (!/^[1-9]\d{5}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit Indian PIN code';
    }
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Delivery Address is required';
    if (!formData.city.trim()) errs.city = 'City / District is required';
    if (!formData.state.trim()) errs.state = 'State is required';

    if (paymentMethod === 'online') {
      errs.paymentMethod = 'Online payment is not enabled in this demo. Please choose Cash on Delivery.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.addressLine1}, ${formData.locality ? formData.locality + ', ' : ''}${formData.city}, ${formData.state}`,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      items: items.map(i => ({
        id: i.productId || i.id,
        productId: i.productId || i.id,
        name: i.name,
        marathiName: i.marathiName,
        sku: i.sku || 'SSC-SAREE',
        price: i.price,
        quantity: i.quantity,
        image: i.image
      })),
      subtotal,
      shippingFee,
      total,
      paymentMethod: 'Cash on Delivery (Demo)',
      notes: formData.orderNotes
    };

    // Store in browser storage
    const createdOrder = storageService.createOrder(orderPayload);
    clearCart();

    // Redirect to Order Confirmation
    setTimeout(() => {
      navigate(`/order-confirmation/${createdOrder.orderNumber}`);
    }, 600);
  };

  return (
    <div className="container" style={{ padding: '36px 16px 64px 16px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-primary-maroon)', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Bag
        </Link>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '28px'
      }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', margin: 0 }}>
          Demo Checkout
        </h1>
        <div style={{
          backgroundColor: '#FAF7F2',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '6px 14px',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Lock size={14} color="var(--color-success)" />
          <span>Frontend Demo Mode: No Payment Credentials Collected</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left Column: Delivery Address & Payment Method */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Delivery Address Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="var(--color-primary-maroon)" /> 1. Delivery Details
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Recipient's Name"
                    autoComplete="name"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={10}
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile"
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email (Optional)</label>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="order-updates@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery PIN Code *</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={6}
                    className="form-input"
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="e.g. 413534"
                  />
                  {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">City / Town *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Dharashiv"
                  />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Street Address / House No. *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="House / Flat No., Apartment Name, Street"
                  />
                  {errors.addressLine1 && <span className="form-error">{errors.addressLine1}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Locality / Landmark</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    placeholder="Near Temple / Market"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                  />
                  {errors.state && <span className="form-error">{errors.state}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--color-primary-maroon)" /> 2. Payment Method
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Cash on Delivery (Enabled) */}
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: paymentMethod === 'cod' ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                  backgroundColor: paymentMethod === 'cod' ? '#FDF8F9' : '#FFFFFF',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    style={{ marginTop: '4px', accentColor: 'var(--color-primary-maroon)' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Cash on Delivery (COD)</span>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Recommended for Demo</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
                      Pay in cash or scan UPI upon doorstep delivery. Saree will be inspected upon receipt.
                    </p>
                  </div>
                </label>

                {/* Online Payment (Disabled in demo) */}
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: paymentMethod === 'online' ? '2px solid var(--color-border)' : '1px solid var(--color-border)',
                  backgroundColor: '#F9F8F6',
                  cursor: 'pointer',
                  opacity: 0.85
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    style={{ marginTop: '4px' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Online Payment (UPI, Cards, NetBanking)</span>
                      <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>Disabled in Demo</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#B42318', marginTop: '4px' }}>
                      *Online payment is not enabled in this demo. Please choose Cash on Delivery to test the order workflow.
                    </p>
                  </div>
                </label>
              </div>

              {errors.paymentMethod && (
                <div style={{ marginTop: '12px', color: 'var(--color-error)', fontSize: '0.85rem' }}>
                  {errors.paymentMethod}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Submit */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            position: 'sticky',
            top: '120px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
              Order Review
            </h3>

            {/* Items summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxHeight: '240px', overflowY: 'auto' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.2 }}>{item.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-muted-text)' }}>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-muted-text)' }}>Shipping:</span>
                <span style={{ color: shippingFee === 0 ? 'var(--color-success)' : 'inherit', fontWeight: 600 }}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 700,
                borderTop: '2px solid var(--color-border)',
                paddingTop: '14px',
                marginTop: '4px'
              }}>
                <span>Total Payable:</span>
                <span style={{ color: 'var(--color-primary-maroon)' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '24px' }}
            >
              {isSubmitting ? 'Placing Demo Order...' : 'Place Demo Order (COD)'}
            </button>

            <div style={{
              marginTop: '16px',
              padding: '10px',
              backgroundColor: '#FAF7F2',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--color-muted-text)',
              lineHeight: 1.4
            }}>
              ✓ This order will be recorded in your browser's local storage and can be inspected in <strong>My Orders</strong> and the <strong>Admin Dashboard</strong>.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
