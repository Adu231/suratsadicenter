import React, { useState, useEffect } from 'react';
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  RotateCcw,
  Check,
  Search,
  Filter,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { storageService } from '../services/storageService.js';
import { useAuth } from '../context/AuthContext.jsx';

export const AdminDashboard = () => {
  const { products, categories, saveProduct, deleteProduct, updateStock, resetAllData } = useProducts();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'products', 'inventory', 'settings'
  const [orders, setOrders] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState('all');

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    marathiName: '',
    category: 'paithani-sarees',
    price: 4999,
    compareAtPrice: 6999,
    fabric: 'Pure Silk',
    colour: 'Magenta',
    occasion: 'Wedding & Bridal',
    stockQuantity: 10,
    description: '',
    careInstructions: 'Dry clean recommended.'
  });

  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const all = storageService.getOrders();
    setOrders(all);
  };

  // KPI Calculations
  const totalRevenue = orders.reduce((sum, o) => (o.orderStatus !== 'Cancelled' ? sum + o.total : sum), 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const lowStockCount = products.filter(p => p.stockQuantity <= (p.lowStockThreshold || 3)).length;

  const handleStatusChange = (orderId, newStatus) => {
    storageService.updateOrderStatus(orderId, newStatus);
    loadOrders();
    showNotification(`Order ${orderId} updated to ${newStatus}`);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      marathiName: '',
      category: 'paithani-sarees',
      price: 4999,
      compareAtPrice: 6999,
      fabric: 'Pure Silk',
      colour: 'Deep Maroon',
      occasion: 'Wedding & Bridal',
      stockQuantity: 10,
      description: 'Handwoven pure silk saree with traditional zari motifs.',
      careInstructions: 'Dry clean only. Roll in muslin cloth.'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.name,
      marathiName: prod.marathiName || '',
      category: prod.category || 'paithani-sarees',
      price: prod.price,
      compareAtPrice: prod.compareAtPrice || prod.price,
      fabric: prod.fabric,
      colour: prod.colour,
      occasion: prod.occasion,
      stockQuantity: prod.stockQuantity,
      description: prod.description || '',
      careInstructions: prod.careInstructions || ''
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) return;

    await saveProduct({
      ...productForm,
      id: editingProduct?.id,
      images: editingProduct?.images || ['/saree-paithani.png']
    });

    setIsProductModalOpen(false);
    showNotification(editingProduct ? 'Product updated successfully!' : 'New Saree added to catalog!');
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Delete "${name}" from the product catalogue?`)) {
      await deleteProduct(id);
      showNotification('Product deleted');
    }
  };

  const handleStockAdjust = async (id, newQty) => {
    await updateStock(id, newQty);
    showNotification('Inventory stock updated');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo products, orders, and cart back to default factory mock data?')) {
      resetAllData();
      loadOrders();
      showNotification('All demo data restored to defaults!');
    }
  };

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.orderStatus.toLowerCase() === orderFilter.toLowerCase();
  });

  const filteredProducts = products.filter(p => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.fabric.toLowerCase().includes(q);
  });

  return (
    <div className="container" style={{ padding: '32px 16px 80px 16px' }}>
      {/* Admin Notice Header */}
      <div style={{
        backgroundColor: '#252321',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '32px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              backgroundColor: 'var(--color-antique-gold)',
              color: '#1A1816',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              DEMO ERP
            </span>
            <h1 style={{ color: '#FFFFFF', fontSize: '1.6rem', margin: 0 }}>
              Surat Sadi Center — Admin Dashboard
            </h1>
          </div>
          <p style={{ color: '#D6D3D1', fontSize: '0.85rem', marginTop: '6px', margin: 0 }}>
            Operating locally in-browser. All product edits, order lifecycle changes, and stock updates persist in browser localStorage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleResetData}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={14} /> Reset Factory Demo Data
          </button>
        </div>
      </div>

      {notification && (
        <div style={{
          backgroundColor: '#EAF4EE',
          color: 'var(--color-success)',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={18} /> {notification}
        </div>
      )}

      {/* KPI Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
            <span>Total Demo Revenue</span>
            <TrendingUp size={18} color="var(--color-success)" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-maroon)', marginTop: '8px', margin: 0 }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>From placed demo orders</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
            <span>Total Orders</span>
            <Package size={18} color="var(--color-primary-maroon)" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '8px', margin: 0 }}>
            {totalOrdersCount}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Across all customers</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
            <span>Catalog Items</span>
            <ShoppingBag size={18} color="var(--color-antique-gold)" />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, marginTop: '8px', margin: 0 }}>
            {activeProductsCount}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>Active sarees in store</span>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
            <span>Low Stock Alerts</span>
            <AlertTriangle size={18} color={lowStockCount > 0 ? 'var(--color-error)' : 'var(--color-muted-text)'} />
          </div>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: lowStockCount > 0 ? 'var(--color-error)' : 'inherit', marginTop: '8px', margin: 0 }}>
            {lowStockCount}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>&le; 3 units remaining</span>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid var(--color-border)',
        marginBottom: '28px',
        gap: '8px',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'orders' ? 700 : 500,
            color: activeTab === 'orders' ? 'var(--color-primary-maroon)' : 'var(--color-soft-charcoal)',
            border: 'none',
            borderBottom: activeTab === 'orders' ? '3px solid var(--color-primary-maroon)' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={16} /> Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'products' ? 700 : 500,
            color: activeTab === 'products' ? 'var(--color-primary-maroon)' : 'var(--color-soft-charcoal)',
            border: 'none',
            borderBottom: activeTab === 'products' ? '3px solid var(--color-primary-maroon)' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShoppingBag size={16} /> Products Catalog ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: activeTab === 'inventory' ? 700 : 500,
            color: activeTab === 'inventory' ? 'var(--color-primary-maroon)' : 'var(--color-soft-charcoal)',
            border: 'none',
            borderBottom: activeTab === 'inventory' ? '3px solid var(--color-primary-maroon)' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <SlidersHorizontal size={16} /> Inventory Stock Levels
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Customer Orders</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-text)' }}>Filter Status:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="form-select"
                style={{ height: '36px', width: 'auto', fontSize: '0.85rem' }}
              >
                <option value="all">All Orders</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>City / State</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '32px' }}>
                      No orders match the filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.orderNumber}>
                      <td>
                        <strong style={{ color: 'var(--color-primary-maroon)' }}>{order.orderNumber}</strong>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td>
                        <div>
                          <strong>{order.customer.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                            {order.customer.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        {order.customer.city} ({order.customer.pincode})
                      </td>
                      <td>
                        {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                      </td>
                      <td>
                        <strong>₹{order.total.toLocaleString('en-IN')}</strong>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem' }}>{order.paymentMethod}</span>
                      </td>
                      <td>
                        <select
                          value={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.orderNumber, e.target.value)}
                          className="form-select"
                          style={{
                            height: '32px',
                            fontSize: '0.8rem',
                            padding: '0 8px',
                            fontWeight: 600,
                            color: order.orderStatus === 'Delivered' ? 'var(--color-success)' : order.orderStatus === 'Cancelled' ? 'var(--color-error)' : 'var(--color-primary-maroon)'
                          }}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '18px'
          }}>
            <div style={{ position: 'relative', width: '280px' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="form-input"
                style={{ height: '38px', paddingLeft: '34px', fontSize: '0.85rem' }}
              />
              <Search size={15} color="var(--color-muted-text)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>

            <button onClick={handleOpenAddModal} className="btn btn-primary btn-sm">
              <Plus size={16} /> Add New Saree
            </button>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name & Marathi</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Fabric</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={p.images?.[0] || '/saree-paithani.png'}
                        alt={p.name}
                        style={{ width: '44px', height: '55px', objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                      />
                    </td>
                    <td>
                      <div>
                        <strong>{p.name}</strong>
                        {p.marathiName && (
                          <div className="font-devanagari" style={{ fontSize: '0.8rem', color: 'var(--color-primary-maroon)' }}>
                            {p.marathiName}
                          </div>
                        )}
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>SKU: {p.sku}</span>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <strong>₹{p.price.toLocaleString('en-IN')}</strong>
                      {p.compareAtPrice && p.compareAtPrice > p.price && (
                        <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--color-muted-text)' }}>
                          ₹{p.compareAtPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${p.stockQuantity <= 3 ? 'badge-error' : 'badge-neutral'}`}>
                        {p.stockQuantity} units
                      </span>
                    </td>
                    <td>{p.fabric}</td>
                    <td>
                      <span className="badge badge-success">Active</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="Edit Saree"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px', color: 'var(--color-error)' }}
                          title="Delete Saree"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INVENTORY STOCK ADJUSTMENT */}
      {activeTab === 'inventory' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Real-Time Stock Adjustment</h2>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.85rem' }}>
              Modify current on-hand units. Changes immediately update customer availability and cart validation.
            </p>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Threshold</th>
                  <th>Adjust Quantity</th>
                  <th>Stock Health</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={p.images?.[0] || '/saree-paithani.png'}
                          alt={p.name}
                          style={{ width: '36px', height: '45px', objectFit: 'cover', borderRadius: '4px' }}
                          onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                        />
                        <div>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>SKU: {p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong style={{ fontSize: '1rem' }}>{p.stockQuantity} units</strong>
                    </td>
                    <td>
                      {p.lowStockThreshold || 3} units
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleStockAdjust(p.id, Math.max(0, p.stockQuantity - 1))}
                          className="btn btn-secondary btn-sm"
                          style={{ width: '28px', height: '28px', padding: 0 }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={p.stockQuantity}
                          onChange={(e) => handleStockAdjust(p.id, Number(e.target.value))}
                          style={{ width: '56px', height: '28px', textAlign: 'center', borderRadius: '4px', border: '1px solid var(--color-border)' }}
                        />
                        <button
                          onClick={() => handleStockAdjust(p.id, p.stockQuantity + 1)}
                          className="btn btn-secondary btn-sm"
                          style={{ width: '28px', height: '28px', padding: 0 }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      {p.stockQuantity <= 0 ? (
                        <span className="badge badge-error">Out of Stock</span>
                      ) : p.stockQuantity <= (p.lowStockThreshold || 3) ? (
                        <span className="badge badge-error">⚠️ Low Stock ({p.stockQuantity})</span>
                      ) : (
                        <span className="badge badge-success">Healthy Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(37, 35, 33, 0.6)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            boxShadow: 'var(--shadow-drawer)'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>
              {editingProduct ? 'Edit Saree' : 'Add New Saree to Catalog'}
            </h3>

            <form onSubmit={handleSaveProduct}>
              <div className="form-group">
                <label className="form-label">Saree Name (English) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal Peshwai Paithani Saree"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Local/Regional Name (Optional)</label>
                <input
                  type="text"
                  className="form-input"
                  value={productForm.marathiName}
                  onChange={(e) => setProductForm({ ...productForm, marathiName: e.target.value })}
                  placeholder="e.g. Royal Peacock Border Pure Silk Paithani"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Fabric</label>
                  <input
                    type="text"
                    className="form-input"
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="e.g. Pure Silk"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    className="form-input"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Compare Price (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={productForm.compareAtPrice}
                    onChange={(e) => setProductForm({ ...productForm, compareAtPrice: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Stock Units</label>
                  <input
                    type="number"
                    className="form-input"
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Occasion</label>
                  <input
                    type="text"
                    className="form-input"
                    value={productForm.occasion}
                    onChange={(e) => setProductForm({ ...productForm, occasion: e.target.value })}
                    placeholder="e.g. Wedding & Bridal"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Save Changes' : 'Create Saree'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
