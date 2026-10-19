import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CheckCircle2, AlertCircle, ArrowLeft, Lock, CreditCard, Smartphone, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { storageService } from '../services/storageService.js';
import { STORE_CONFIG } from '../config/storeConfig.js';

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

  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'online_demo'
  const [selectedDemoUpi, setSelectedDemoUpi] = useState('gpay'); // 'gpay', 'phonepe', 'paytm'
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);

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
    } else if (pin.startsWith('395')) {
      setFormData(prev => ({
        ...prev,
        city: 'Surat',
        state: 'Gujarat'
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
    if (!formData.city.trim()) errs.city = 'City / Town is required';
    if (!formData.state.trim()) errs.state = 'State is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInitiateOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (paymentMethod === 'online_demo') {
      setShowSimulatedModal(true);
    } else {
      executeOrder('Cash on Delivery (Demo)');
    }
  };

  const executeOrder = (finalPaymentMethod) => {
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
      paymentMethod: finalPaymentMethod,
      notes: formData.orderNotes
    };

    // Store order in local storage
    const createdOrder = storageService.createOrder(orderPayload);
    clearCart();

    // Redirect to Order Confirmation
    setTimeout(() => {
      navigate(`/order-confirmation/${createdOrder.orderNumber}`);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh', padding: '24px 16px 64px 16px' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '18px' }}>
          <Link
            to="/cart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '13px',
              color: 'var(--color-primary-maroon)',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={15} /> Back to Shopping Bag
          </Link>
        </div>

        {/* Checkout Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 0, color: 'var(--color-primary-maroon)' }}>
              Checkout
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--color-muted-text)' }}>
              Dispatched directly from Dharashiv Flagship Showroom
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            borderRadius: 'var(--radius-sm)',
            padding: '6px 12px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-soft-charcoal)'
          }}>
            <Lock size={13} color="var(--color-success)" />
            <span>Frontend Demo Mode • Safe & Verified Checkout</span>
          </div>
        </div>

        <form onSubmit={handleInitiateOrder}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            alignItems: 'start'
          }}>
            {/* Left Column: Delivery Address & Payment Method */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* 1. Delivery Details Card */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-maroon)' }}>
                  <Truck size={17} /> 1. Delivery Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
                  <div className="form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>Customer Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Pooja Kulkarni"
                    />
                    {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>Mobile Number (10 digits) *</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>Email (Optional)</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="pooja@example.com"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>PIN Code (6 digits) *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      className="form-input"
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 413534"
                    />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>City / Town *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Dharashiv"
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1', margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>Flat / House No. & Building *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      placeholder="Flat 302, Sai Shraddha Residency"
                    />
                    {errors.addressLine1 && <span className="form-error">{errors.addressLine1}</span>}
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>Locality / Area / Landmark</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="Station Road"
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '12px' }}>State *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Maharashtra"
                    />
                    {errors.state && <span className="form-error">{errors.state}</span>}
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selection Card */}
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary-maroon)' }}>
                  <ShieldCheck size={17} /> 2. Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Option 1: Cash on Delivery */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    border: paymentMethod === 'cod' ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                    backgroundColor: paymentMethod === 'cod' ? '#FFFDFD' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      style={{ marginTop: '3px', accentColor: 'var(--color-primary-maroon)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '13px' }}>Cash on Delivery (COD)</strong>
                        <span style={{
                          backgroundColor: '#EAF7EE',
                          color: '#1E7E45',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '2px'
                        }}>
                          Recommended
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '3px 0 0 0' }}>
                        Pay cash or scan UPI QR upon doorstep delivery. Open box inspection allowed.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Online Payment (Demo Mode) */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    border: paymentMethod === 'online_demo' ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                    backgroundColor: paymentMethod === 'online_demo' ? '#FFFDFD' : '#FFFFFF',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online_demo"
                      checked={paymentMethod === 'online_demo'}
                      onChange={() => setPaymentMethod('online_demo')}
                      style={{ marginTop: '3px', accentColor: 'var(--color-primary-maroon)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '13px' }}>Online Payment (Demo Mode)</strong>
                        <span style={{
                          backgroundColor: 'rgba(197, 160, 89, 0.15)',
                          color: '#8A641B',
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '2px'
                        }}>
                          Simulated UPI / Cards
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '3px 0 0 0' }}>
                        Simulate an instant online transaction (Google Pay, PhonePe, Paytm, or Card).
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Review & Submit */}
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
              position: 'sticky',
              top: '90px'
            }}>
              <h3 style={{ fontSize: '1.15rem', margin: '0 0 14px 0', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', color: 'var(--color-primary-maroon)' }}>
                Order Summary ({items.length} items)
              </h3>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', maxHeight: '220px', overflowY: 'auto' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '2px' }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', margin: '1px 0 0 0' }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--color-soft-charcoal)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted-text)' }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted-text)' }}>Shipping Charge:</span>
                  <span style={{ color: shippingFee === 0 ? 'var(--color-success)' : 'inherit', fontWeight: 600 }}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  borderTop: '2px solid var(--color-border)',
                  paddingTop: '12px',
                  marginTop: '4px'
                }}>
                  <span>Final Payable Amount:</span>
                  <span style={{ color: 'var(--color-primary-maroon)' }}>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '20px', minHeight: '46px', height: '46px', fontSize: '12px' }}
              >
                {isSubmitting
                  ? 'Placing Demo Order...'
                  : paymentMethod === 'cod'
                    ? 'Place Demo Order (Cash on Delivery)'
                    : 'Proceed to Simulated Online Payment'}
              </button>

              <p style={{ fontSize: '11px', color: 'var(--color-muted-text)', textAlign: 'center', margin: '10px 0 0 0', lineHeight: 1.4 }}>
                ✓ Simulated demo order will be recorded in browser storage and available in Admin Dashboard and My Orders.
              </p>
            </div>

          </div>
        </form>
      </div>

      {/* Simulated Online Payment Modal (Demo Mode) */}
      {showSimulatedModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          zIndex: 1300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            maxWidth: '440px',
            width: '100%',
            padding: '24px',
            boxShadow: 'var(--shadow-drawer)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Smartphone size={20} color="var(--color-primary-maroon)" />
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-primary-maroon)' }}>
                Simulate Online Payment (Demo)
              </h3>
            </div>

            {/* Clear Demonstration Notice */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FCD34D',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '11px',
              color: '#92400E',
              lineHeight: 1.5,
              marginBottom: '16px'
            }}>
              <strong>⚠️ Demo Simulation Notice:</strong> This is a frontend demonstration of online checkout. No real money or bank credentials will be deducted.
            </div>

            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-muted-text)', marginBottom: '4px' }}>Payable Amount</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-primary-maroon)' }}>
                ₹{total.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Select simulated method */}
            <div style={{ marginBottom: '18px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                Select Simulated UPI App:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'gpay', name: 'Google Pay' },
                  { id: 'phonepe', name: 'PhonePe' },
                  { id: 'paytm', name: 'Paytm UPI' }
                ].map(app => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedDemoUpi(app.id)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: selectedDemoUpi === app.id ? '2px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                      backgroundColor: selectedDemoUpi === app.id ? '#FAF7F2' : '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '11px',
                      cursor: 'pointer'
                    }}
                  >
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowSimulatedModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1, minHeight: '40px', height: '40px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSimulatedModal(false);
                  executeOrder(`Online Payment (${selectedDemoUpi.toUpperCase()} Demo)`);
                }}
                className="btn btn-primary"
                style={{ flex: 1.4, minHeight: '40px', height: '40px' }}
              >
                Simulate Successful Pay ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
