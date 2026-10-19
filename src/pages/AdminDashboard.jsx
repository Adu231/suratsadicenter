import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  SlidersHorizontal,
  ExternalLink,
  X,
  Layers,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  DollarSign,
  Boxes,
  ShieldCheck
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { storageService } from '../services/storageService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { STORE_CONFIG } from '../config/storeConfig.js';

export const AdminDashboard = () => {
  const {
    products,
    categories,
    saveProduct,
    deleteProduct,
    updateStock,
    resetAllData
  } = useProducts();
  const { user } = useAuth();

  // Active Tab: 'revenue', 'products', 'inventory', 'orders'
  const [activeTab, setActiveTab] = useState('revenue');
  const [orders, setOrders] = useState([]);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    marathiName: '',
    category: 'paithani-sarees',
    price: 4999,
    compareAtPrice: 6999,
    fabric: 'Pure Silk',
    colour: 'Deep Maroon',
    occasion: 'Wedding & Bridal',
    stockQuantity: 10,
    imageUrl: '/saree-paithani.png',
    description: '',
    careInstructions: 'Dry clean only. Roll in muslin cloth.'
  });

  // Order Details Modal
  const [viewingOrder, setViewingOrder] = useState(null);
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
  const validOrders = orders.filter(o => o.orderStatus !== 'Cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;
  const lowStockProducts = products.filter(p => p.stockQuantity <= (p.lowStockThreshold || 3));
  const lowStockCount = lowStockProducts.length;
  const outOfStockCount = products.filter(p => p.stockQuantity <= 0).length;
  const totalInventoryUnits = products.reduce((sum, p) => sum + (Number(p.stockQuantity) || 0), 0);
  const avgOrderValue = validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length) : 0;

  // PRODUCT ACTIONS: ADD, EDIT, DELETE
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      marathiName: '',
      category: categories[0]?.slug || 'paithani-sarees',
      price: 4999,
      compareAtPrice: 6999,
      fabric: 'Pure Silk',
      colour: 'Deep Maroon',
      occasion: 'Wedding & Bridal',
      stockQuantity: 10,
      imageUrl: '/saree-paithani.png',
      description: 'Handcrafted pure silk saree with certified zari motifs.',
      careInstructions: 'Dry clean only. Roll in muslin cloth.'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      id: prod.id,
      name: prod.name,
      marathiName: prod.marathiName || '',
      category: prod.category || 'paithani-sarees',
      price: prod.price,
      compareAtPrice: prod.compareAtPrice || prod.price,
      fabric: prod.fabric || 'Pure Silk',
      colour: prod.colour || 'Maroon',
      occasion: prod.occasion || 'Wedding & Bridal',
      stockQuantity: prod.stockQuantity,
      imageUrl: prod.images?.[0] || '/saree-paithani.png',
      description: prod.description || '',
      careInstructions: prod.careInstructions || ''
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (Number(productForm.price) <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    const payload = {
      ...productForm,
      id: editingProduct?.id,
      price: Number(productForm.price),
      compareAtPrice: Number(productForm.compareAtPrice) || Number(productForm.price),
      stockQuantity: Number(productForm.stockQuantity) || 0,
      images: [productForm.imageUrl || '/saree-paithani.png']
    };

    await saveProduct(payload);
    setIsProductModalOpen(false);
    showNotification(editingProduct ? `Updated "${productForm.name}"` : `Added "${productForm.name}" to store catalog`);
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will immediately remove it from the customer storefront.`)) {
      await deleteProduct(id);
      showNotification(`Deleted product: "${name}"`);
    }
  };

  // INVENTORY STOCK ADJUSTMENT
  const handleStockAdjust = async (id, newQty) => {
    await updateStock(id, newQty);
    showNotification('Inventory stock updated');
  };

  const handleQuickRestock = async (id, currentQty, addCount) => {
    const updatedQty = Number(currentQty) + addCount;
    await updateStock(id, updatedQty);
    showNotification(`Restocked +${addCount} units (Now: ${updatedQty})`);
  };

  // ORDER STATUS
  const handleOrderStatusChange = (orderId, newStatus) => {
    storageService.updateOrderStatus(orderId, newStatus);
    loadOrders();
    showNotification(`Order ${orderId} updated to: ${newStatus}`);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo products, orders, and stock levels back to default factory mock data?')) {
      resetAllData();
      loadOrders();
      showNotification('Demo data reset to factory defaults');
    }
  };

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      (p.fabric && p.fabric.toLowerCase().includes(productSearch.toLowerCase()));

    const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'all') return true;
    return o.orderStatus.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0F172A', // Distinct professional dark slate background
      color: '#F8FAFC',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* =========================================================================
          DEDICATED ADMIN TOPBAR (NO CUSTOMER NAVBAR, NO SEARCH, NO CART, NO WA)
          ========================================================================= */}
      <header style={{
        backgroundColor: '#1E293B',
        borderBottom: '1px solid #334155',
        padding: '12px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Admin Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              backgroundColor: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '16px',
              color: '#FFFFFF'
            }}>
              SSC
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', letterSpacing: '0.02em' }}>
                  Surat Sadi Center
                </span>
                <span style={{
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: '3px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}>
                  Admin Portal
                </span>
              </div>
              <p style={{ fontSize: '11px', color: '#94A3B8', margin: '1px 0 0 0' }}>
                Operational Control: Products • Stock • Revenue • Orders
              </p>
            </div>
          </div>

          {/* Quick Actions & Storefront Link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#334155',
                color: '#F8FAFC',
                padding: '7px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #475569',
                transition: 'background 0.2s ease'
              }}
              title="Return to Customer Storefront"
            >
              <ArrowLeft size={14} /> View Storefront
            </Link>

            <button
              onClick={handleResetData}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'transparent',
                color: '#94A3B8',
                border: '1px dashed #475569',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Reset mock products and orders to original data"
            >
              <RotateCcw size={12} /> Reset Data
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN ADMIN WORKSPACE
          ========================================================================= */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 16px' }}>

        {/* Real-time Notification Banner */}
        {notification && (
          <div style={{
            backgroundColor: '#064E3B',
            color: '#A7F3D0',
            border: '1px solid #059669',
            padding: '10px 16px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Check size={16} /> {notification}
          </div>
        )}

        {/* Admin Navigation Pills Strip (Responsive Grid - NO Horizontal Scroll) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '6px',
          backgroundColor: '#1E293B',
          borderRadius: '8px',
          border: '1px solid #334155',
          padding: '6px',
          marginBottom: '20px'
        }}>
          {[
            { id: 'revenue', label: 'Revenue & Overview', icon: TrendingUp },
            { id: 'products', label: `Manage Products (${products.length})`, icon: ShoppingBag },
            { id: 'inventory', label: `Stock Management (${lowStockCount} low)`, icon: Boxes },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: Package }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: active ? '#3B82F6' : 'transparent',
                  color: active ? '#FFFFFF' : '#94A3B8',
                  fontWeight: active ? 700 : 500,
                  fontSize: '12.5px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            TAB 1: REVENUE & OPERATIONAL OVERVIEW
            ===================================================================== */}
        {activeTab === 'revenue' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* KPI Metric Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}>
              {/* Total Revenue */}
              <div style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94A3B8', fontSize: '12px', fontWeight: 600 }}>
                  <span>TOTAL SALES REVENUE</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#064E3B', color: '#34D399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#34D399', marginTop: '8px' }}>
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  From {validOrders.length} valid orders
                </div>
              </div>

              {/* Total Orders */}
              <div style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94A3B8', fontSize: '12px', fontWeight: 600 }}>
                  <span>TOTAL ORDERS RECEIVED</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#1E3A8A', color: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
                  {totalOrdersCount}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Avg Order Value: ₹{avgOrderValue.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Active Products in Catalog */}
              <div style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94A3B8', fontSize: '12px', fontWeight: 600 }}>
                  <span>CATALOG SAREES</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#78350F', color: '#FBBF24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#FFFFFF', marginTop: '8px' }}>
                  {activeProductsCount}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  Total Units On-Hand: {totalInventoryUnits}
                </div>
              </div>

              {/* Low Stock Alerts */}
              <div style={{
                backgroundColor: '#1E293B',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94A3B8', fontSize: '12px', fontWeight: 600 }}>
                  <span>LOW STOCK WARNINGS</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#7F1D1D', color: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertTriangle size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, color: lowStockCount > 0 ? '#F87171' : '#34D399', marginTop: '8px' }}>
                  {lowStockCount}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                  {outOfStockCount > 0 ? `${outOfStockCount} completely sold out` : 'Immediate restock suggested'}
                </div>
              </div>
            </div>

            {/* Quick Restock Action Bar if low stock exists */}
            {lowStockCount > 0 && (
              <div style={{
                backgroundColor: '#1E293B',
                border: '1px solid #78350F',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={16} color="#FBBF24" />
                    <strong style={{ fontSize: '14px', color: '#FBBF24' }}>
                      Sarees Requiring Inventory Restock
                    </strong>
                  </div>
                  <button
                    onClick={() => setActiveTab('inventory')}
                    style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Open Full Stock Table →
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {lowStockProducts.map(p => (
                    <div key={p.id} style={{
                      backgroundColor: '#0F172A',
                      border: '1px solid #334155',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '12px', color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '11px', color: p.stockQuantity <= 0 ? '#EF4444' : '#F59E0B', fontWeight: 700 }}>
                          {p.stockQuantity <= 0 ? 'SOLD OUT' : `Only ${p.stockQuantity} Left`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button
                          onClick={() => handleQuickRestock(p.id, p.stockQuantity, 5)}
                          style={{
                            backgroundColor: '#2563EB',
                            color: '#FFF',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleQuickRestock(p.id, p.stockQuantity, 10)}
                          style={{
                            backgroundColor: '#1E293B',
                            color: '#94A3B8',
                            border: '1px solid #475569',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          +10
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Snapshot */}
            <div style={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>Recent Customer Orders</strong>
                <button
                  onClick={() => setActiveTab('orders')}
                  style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Manage All Orders ({orders.length}) →
                </button>
              </div>

              {/* Desktop Table View */}
              <div className="admin-table-desktop">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                      <th style={{ padding: '8px 10px' }}>Order ID</th>
                      <th style={{ padding: '8px 10px' }}>Customer</th>
                      <th style={{ padding: '8px 10px' }}>Items</th>
                      <th style={{ padding: '8px 10px' }}>Total Amount</th>
                      <th style={{ padding: '8px 10px' }}>Payment</th>
                      <th style={{ padding: '8px 10px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.orderNumber} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontWeight: 700, color: '#60A5FA' }}>{o.orderNumber}</td>
                        <td style={{ padding: '10px' }}>{o.customer.name} ({o.customer.phone})</td>
                        <td style={{ padding: '10px' }}>{o.items.length} Saree(s)</td>
                        <td style={{ padding: '10px', fontWeight: 700, color: '#34D399' }}>₹{o.total.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px', color: '#94A3B8' }}>{o.paymentMethod}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: o.orderStatus === 'Delivered' ? '#064E3B' : o.orderStatus === 'Cancelled' ? '#7F1D1D' : '#78350F',
                            color: o.orderStatus === 'Delivered' ? '#34D399' : o.orderStatus === 'Cancelled' ? '#F87171' : '#FBBF24'
                          }}>
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards View (NO Horizontal Scroll) */}
              <div className="admin-cards-mobile">
                {orders.slice(0, 5).map(o => (
                  <div key={o.orderNumber} style={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#60A5FA', fontSize: '13px' }}>{o.orderNumber}</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: o.orderStatus === 'Delivered' ? '#064E3B' : o.orderStatus === 'Cancelled' ? '#7F1D1D' : '#78350F',
                        color: o.orderStatus === 'Delivered' ? '#34D399' : o.orderStatus === 'Cancelled' ? '#F87171' : '#FBBF24'
                      }}>
                        {o.orderStatus}
                      </span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#F8FAFC' }}>
                      <strong>{o.customer.name}</strong> • <span style={{ color: '#94A3B8' }}>{o.customer.phone}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1E293B', paddingTop: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>{o.items.length} Saree(s) • {o.paymentMethod}</span>
                      <span style={{ fontWeight: 700, color: '#34D399', fontSize: '14px' }}>₹{o.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: PRODUCT MANAGEMENT (ADD, REMOVE, EDIT)
            ===================================================================== */}
        {activeTab === 'products' && (
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '18px'
          }}>
            {/* Header Control Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 300px' }}>
                <div style={{ position: 'relative', flex: 1, maxWidth: '320px' }}>
                  <input
                    type="text"
                    placeholder="Search by saree name, SKU, fabric..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    style={{
                      width: '100%',
                      height: '38px',
                      backgroundColor: '#0F172A',
                      border: '1px solid #475569',
                      borderRadius: '6px',
                      paddingLeft: '32px',
                      paddingRight: '12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                  <Search size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  style={{
                    height: '38px',
                    backgroundColor: '#0F172A',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    padding: '0 10px',
                    color: '#FFFFFF',
                    fontSize: '12px'
                  }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenAddProduct}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} /> Add Saree Product
              </button>
            </div>

            {/* Desktop Products Table View */}
            <div className="admin-table-desktop">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px' }}>Preview</th>
                    <th style={{ padding: '10px' }}>Product Title & SKU</th>
                    <th style={{ padding: '10px' }}>Category</th>
                    <th style={{ padding: '10px' }}>Selling Price</th>
                    <th style={{ padding: '10px' }}>Compare Price</th>
                    <th style={{ padding: '10px' }}>Stock Units</th>
                    <th style={{ padding: '10px' }}>Fabric</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '10px' }}>
                        <img
                          src={p.images?.[0] || '/saree-paithani.png'}
                          alt={p.name}
                          style={{ width: '42px', height: '52px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#0F172A' }}
                          onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                        />
                      </td>
                      <td style={{ padding: '10px' }}>
                        <strong style={{ color: '#F8FAFC', display: 'block', fontSize: '13px' }}>{p.name}</strong>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>SKU: {p.sku}</span>
                      </td>
                      <td style={{ padding: '10px', color: '#94A3B8' }}>{p.category}</td>
                      <td style={{ padding: '10px', fontWeight: 700, color: '#34D399' }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '10px', color: '#64748B', textDecoration: p.compareAtPrice > p.price ? 'line-through' : 'none' }}>
                        {p.compareAtPrice ? `₹${p.compareAtPrice.toLocaleString('en-IN')}` : '—'}
                      </td>
                      <td style={{ padding: '10px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          backgroundColor: p.stockQuantity <= 0 ? '#7F1D1D' : p.stockQuantity <= 3 ? '#78350F' : '#064E3B',
                          color: p.stockQuantity <= 0 ? '#F87171' : p.stockQuantity <= 3 ? '#FBBF24' : '#34D399'
                        }}>
                          {p.stockQuantity} units
                        </span>
                      </td>
                      <td style={{ padding: '10px', color: '#94A3B8' }}>{p.fabric}</td>
                      <td style={{ padding: '10px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            style={{
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#F8FAFC',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Edit Product Details"
                          >
                            <Edit size={12} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            style={{
                              backgroundColor: '#7F1D1D',
                              border: 'none',
                              color: '#F87171',
                              padding: '6px 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            title="Delete Product"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Product Cards View (NO Horizontal Scroll) */}
            <div className="admin-cards-mobile">
              {filteredProducts.map(p => (
                <div key={p.id} style={{
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <img
                      src={p.images?.[0] || '/saree-paithani.png'}
                      alt={p.name}
                      style={{ width: '56px', height: '68px', objectFit: 'cover', borderRadius: '6px', backgroundColor: '#1E293B', flexShrink: 0 }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ color: '#F8FAFC', fontSize: '13.5px', display: 'block', lineHeight: 1.3 }}>{p.name}</strong>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        SKU: {p.sku} • {p.fabric || 'Pure Silk'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, color: '#34D399', fontSize: '14.5px' }}>
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        {p.compareAtPrice > p.price && (
                          <span style={{ fontSize: '11px', color: '#64748B', textDecoration: 'line-through' }}>
                            ₹{p.compareAtPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span style={{
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          backgroundColor: p.stockQuantity <= 0 ? '#7F1D1D' : p.stockQuantity <= 3 ? '#78350F' : '#064E3B',
                          color: p.stockQuantity <= 0 ? '#F87171' : p.stockQuantity <= 3 ? '#FBBF24' : '#34D399'
                        }}>
                          {p.stockQuantity} units
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderTop: '1px solid #1E293B', paddingTop: '8px' }}>
                    <button
                      onClick={() => handleOpenEditProduct(p)}
                      style={{
                        backgroundColor: '#334155',
                        border: 'none',
                        color: '#F8FAFC',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Edit size={13} /> Edit Saree
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id, p.name)}
                      style={{
                        backgroundColor: '#7F1D1D',
                        border: 'none',
                        color: '#F87171',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: STOCK & INVENTORY MANAGEMENT
            ===================================================================== */}
        {activeTab === 'inventory' && (
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#FFFFFF' }}>
                  Real-Time Saree Stock Inventory
                </h2>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                  Adjust available on-hand units. If set to 0, customers immediately see "Sold Out" on the storefront.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#F87171', fontWeight: 600 }}>● {outOfStockCount} Sold Out</span>
                <span style={{ fontSize: '12px', color: '#FBBF24', fontWeight: 600 }}>● {lowStockCount} Low Stock</span>
                <span style={{ fontSize: '12px', color: '#34D399', fontWeight: 600 }}>● {products.length - lowStockCount} Healthy</span>
              </div>
            </div>

            {/* Desktop Stock Table View */}
            <div className="admin-table-desktop">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px' }}>Product</th>
                    <th style={{ padding: '10px' }}>Current Stock</th>
                    <th style={{ padding: '10px' }}>Adjust Quantity</th>
                    <th style={{ padding: '10px' }}>Quick Restock</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={p.images?.[0] || '/saree-paithani.png'}
                            alt={p.name}
                            style={{ width: '36px', height: '46px', objectFit: 'cover', borderRadius: '4px' }}
                            onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                          />
                          <div>
                            <strong style={{ color: '#F8FAFC', display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '11px', color: '#64748B' }}>SKU: {p.sku} • ₹{p.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <strong style={{ fontSize: '15px', color: p.stockQuantity <= 0 ? '#EF4444' : p.stockQuantity <= 3 ? '#F59E0B' : '#FFFFFF' }}>
                          {p.stockQuantity} units
                        </strong>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleStockAdjust(p.id, Math.max(0, p.stockQuantity - 1))}
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#FFFFFF',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'pointer'
                            }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={p.stockQuantity}
                            onChange={(e) => handleStockAdjust(p.id, Number(e.target.value))}
                            style={{
                              width: '54px',
                              height: '28px',
                              textAlign: 'center',
                              backgroundColor: '#0F172A',
                              border: '1px solid #475569',
                              color: '#FFFFFF',
                              borderRadius: '4px',
                              fontSize: '13px'
                            }}
                          />
                          <button
                            onClick={() => handleStockAdjust(p.id, p.stockQuantity + 1)}
                            style={{
                              width: '28px',
                              height: '28px',
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#FFFFFF',
                              borderRadius: '4px',
                              fontSize: '14px',
                              cursor: 'pointer'
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleQuickRestock(p.id, p.stockQuantity, 5)}
                            style={{
                              backgroundColor: '#2563EB',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            +5 units
                          </button>
                          <button
                            onClick={() => handleQuickRestock(p.id, p.stockQuantity, 10)}
                            style={{
                              backgroundColor: '#334155',
                              color: '#94A3B8',
                              border: '1px solid #475569',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            +10 units
                          </button>
                        </div>
                      </td>
                      <td style={{ padding: '10px' }}>
                        {p.stockQuantity <= 0 ? (
                          <span style={{ backgroundColor: '#7F1D1D', color: '#F87171', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                            Sold Out
                          </span>
                        ) : p.stockQuantity <= 3 ? (
                          <span style={{ backgroundColor: '#78350F', color: '#FBBF24', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                            Low Stock ({p.stockQuantity})
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#064E3B', color: '#34D399', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stock Cards View (NO Horizontal Scroll) */}
            <div className="admin-cards-mobile">
              {products.map(p => (
                <div key={p.id} style={{
                  backgroundColor: '#0F172A',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img
                      src={p.images?.[0] || '/saree-paithani.png'}
                      alt={p.name}
                      style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ color: '#F8FAFC', fontSize: '13px', display: 'block', lineHeight: 1.3 }}>{p.name}</strong>
                      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        SKU: {p.sku} • ₹{p.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ marginTop: '4px' }}>
                        {p.stockQuantity <= 0 ? (
                          <span style={{ backgroundColor: '#7F1D1D', color: '#F87171', padding: '2px 6px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>
                            Sold Out (0 units)
                          </span>
                        ) : p.stockQuantity <= 3 ? (
                          <span style={{ backgroundColor: '#78350F', color: '#FBBF24', padding: '2px 6px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>
                            Low Stock ({p.stockQuantity} units)
                          </span>
                        ) : (
                          <span style={{ backgroundColor: '#064E3B', color: '#34D399', padding: '2px 6px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700 }}>
                            In Stock ({p.stockQuantity} units)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1E293B', paddingTop: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    {/* - / + controls */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handleStockAdjust(p.id, Math.max(0, p.stockQuantity - 1))}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#334155',
                          border: 'none',
                          color: '#FFFFFF',
                          borderRadius: '6px',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={p.stockQuantity}
                        onChange={(e) => handleStockAdjust(p.id, Number(e.target.value))}
                        style={{
                          width: '56px',
                          height: '32px',
                          textAlign: 'center',
                          backgroundColor: '#1E293B',
                          border: '1px solid #475569',
                          color: '#FFFFFF',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 700
                        }}
                      />
                      <button
                        onClick={() => handleStockAdjust(p.id, p.stockQuantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#334155',
                          border: 'none',
                          color: '#FFFFFF',
                          borderRadius: '6px',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Quick Restock Buttons */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleQuickRestock(p.id, p.stockQuantity, 5)}
                        style={{
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        +5 restock
                      </button>
                      <button
                        onClick={() => handleQuickRestock(p.id, p.stockQuantity, 10)}
                        style={{
                          backgroundColor: '#334155',
                          color: '#94A3B8',
                          border: '1px solid #475569',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        +10
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: ORDER LIFECYCLE MANAGEMENT
            ===================================================================== */}
        {activeTab === 'orders' && (
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#FFFFFF' }}>
                  Orders & Dispatch Processing ({filteredOrders.length})
                </h2>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: '2px 0 0 0' }}>
                  Track customer delivery details, update lifecycle statuses, and manage COD settlements.
                </p>
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                style={{
                  height: '36px',
                  backgroundColor: '#0F172A',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  padding: '0 10px',
                  color: '#FFFFFF',
                  fontSize: '12px'
                }}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Desktop Orders Table View */}
            <div className="admin-table-desktop">
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px' }}>Order Reference</th>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Customer & Contact</th>
                    <th style={{ padding: '10px' }}>Destination</th>
                    <th style={{ padding: '10px' }}>Amount</th>
                    <th style={{ padding: '10px' }}>Payment Mode</th>
                    <th style={{ padding: '10px' }}>Lifecycle Status</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                        No orders match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => (
                      <tr key={order.orderNumber} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontWeight: 700, color: '#60A5FA' }}>
                          {order.orderNumber}
                        </td>
                        <td style={{ padding: '10px', color: '#94A3B8', fontSize: '12px' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </td>
                        <td style={{ padding: '10px' }}>
                          <strong style={{ color: '#F8FAFC', display: 'block' }}>{order.customer.name}</strong>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>📞 {order.customer.phone}</span>
                        </td>
                        <td style={{ padding: '10px', color: '#CBD5E1', fontSize: '12px' }}>
                          {order.customer.city} ({order.customer.pincode})
                        </td>
                        <td style={{ padding: '10px', fontWeight: 700, color: '#34D399' }}>
                          ₹{order.total.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '10px', color: '#94A3B8', fontSize: '12px' }}>
                          {order.paymentMethod}
                        </td>
                        <td style={{ padding: '10px' }}>
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleOrderStatusChange(order.orderNumber, e.target.value)}
                            style={{
                              backgroundColor: '#0F172A',
                              border: '1px solid #475569',
                              color: order.orderStatus === 'Delivered' ? '#34D399' : order.orderStatus === 'Cancelled' ? '#F87171' : '#FBBF24',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              fontSize: '11px',
                              fontWeight: 700
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
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          <button
                            onClick={() => setViewingOrder(order)}
                            style={{
                              backgroundColor: '#334155',
                              border: 'none',
                              color: '#F8FAFC',
                              padding: '5px 10px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Eye size={12} /> Inspect
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Orders Cards View (NO Horizontal Scroll) */}
            <div className="admin-cards-mobile">
              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', color: '#64748B' }}>
                  No orders match the selected filter.
                </div>
              ) : (
                filteredOrders.map(order => (
                  <div key={order.orderNumber} style={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 800, color: '#60A5FA', fontSize: '13.5px' }}>{order.orderNumber}</span>
                        <span style={{ fontSize: '11px', color: '#94A3B8', marginLeft: '6px' }}>
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <span style={{ fontWeight: 800, color: '#34D399', fontSize: '15px' }}>
                        ₹{order.total.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div style={{ fontSize: '13px', color: '#F8FAFC' }}>
                      <strong style={{ display: 'block' }}>{order.customer.name}</strong>
                      <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                        📞 <a href={`tel:${order.customer.phone}`} style={{ color: '#60A5FA' }}>{order.customer.phone}</a>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#CBD5E1', marginTop: '2px' }}>
                        📍 {order.customer.city} ({order.customer.pincode}) • {order.items.length} Saree(s) • {order.paymentMethod}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1E293B', paddingTop: '8px', gap: '8px' }}>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleOrderStatusChange(order.orderNumber, e.target.value)}
                        style={{
                          flex: 1,
                          backgroundColor: '#1E293B',
                          border: '1px solid #475569',
                          color: order.orderStatus === 'Delivered' ? '#34D399' : order.orderStatus === 'Cancelled' ? '#F87171' : '#FBBF24',
                          borderRadius: '6px',
                          padding: '6px 10px',
                          fontSize: '12px',
                          fontWeight: 700
                        }}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => setViewingOrder(order)}
                        style={{
                          backgroundColor: '#334155',
                          border: 'none',
                          color: '#F8FAFC',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={13} /> Inspect
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* =========================================================================
          PRODUCT ADD / EDIT MODAL
          ========================================================================= */}
      {isProductModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '560px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            border: '1px solid #475569',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#FFFFFF' }}>
                {editingProduct ? 'Edit Saree Product' : 'Add Saree to Store Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                  Saree Title *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal Peshwai Pure Silk Paithani"
                  style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                  Regional / Marathi Name (Optional)
                </label>
                <input
                  type="text"
                  value={productForm.marathiName}
                  onChange={(e) => setProductForm({ ...productForm, marathiName: e.target.value })}
                  placeholder="e.g. अस्सल येवला रेशीम पैठणी"
                  style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 8px', color: '#FFF' }}
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Fabric / Weave *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.fabric}
                    onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                    placeholder="e.g. Pure Silk"
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Original Compare Price (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={productForm.compareAtPrice}
                    onChange={(e) => setProductForm({ ...productForm, compareAtPrice: Number(e.target.value) })}
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={productForm.stockQuantity}
                    onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                    Colour
                  </label>
                  <input
                    type="text"
                    value={productForm.colour}
                    onChange={(e) => setProductForm({ ...productForm, colour: e.target.value })}
                    placeholder="e.g. Deep Maroon & Gold"
                    style={{ width: '100%', height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                </div>
              </div>

              {/* Image URL & Live Preview */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                  Image Asset Path / URL
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    placeholder="/saree-paithani.png"
                    style={{ flex: 1, height: '38px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '0 10px', color: '#FFF' }}
                  />
                  {productForm.imageUrl && (
                    <img
                      src={productForm.imageUrl}
                      alt="Preview"
                      style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #475569' }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                  )}
                </div>
                <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', display: 'block' }}>
                  Available local presets: <code>/saree-paithani.png</code>, <code>/saree-banarasi.png</code>, <code>/saree-kanjivaram.png</code>, <code>/saree-chanderi.png</code>, <code>/saree-bridal.png</code>
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '4px' }}>
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{ width: '100%', minHeight: '60px', backgroundColor: '#0F172A', border: '1px solid #475569', borderRadius: '4px', padding: '8px 10px', color: '#FFF', fontSize: '12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{
                    backgroundColor: '#334155',
                    color: '#F8FAFC',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {editingProduct ? 'Save Saree Changes' : 'Create Saree Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          ORDER INSPECT MODAL
          ========================================================================= */}
      {viewingOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1250,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#1E293B',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '22px',
            border: '1px solid #475569',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Customer Order</span>
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#60A5FA' }}>
                  {viewingOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Details */}
            <div style={{ backgroundColor: '#0F172A', padding: '12px', borderRadius: '6px', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#60A5FA', marginBottom: '4px' }}>Customer & Destination:</div>
              <div><strong>Name:</strong> {viewingOrder.customer.name}</div>
              <div><strong>Phone:</strong> {viewingOrder.customer.phone}</div>
              <div><strong>Address:</strong> {viewingOrder.customer.address}</div>
              <div><strong>PIN:</strong> {viewingOrder.customer.pincode} ({viewingOrder.customer.city}, {viewingOrder.customer.state})</div>
            </div>

            {/* Saree Items */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontWeight: 700, fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>Ordered Saree(s):</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {viewingOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '36px', height: '46px', objectFit: 'cover', borderRadius: '3px' }}
                      onError={(e) => { e.target.src = '/saree-paithani.png'; }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: '12px', color: '#F8FAFC' }}>{item.name}</strong>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#34D399' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', borderTop: '1px solid #334155', paddingTop: '10px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Subtotal:</span>
                <strong style={{ color: '#FFF' }}>₹{viewingOrder.subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                <span>Delivery:</span>
                <strong style={{ color: '#34D399' }}>{viewingOrder.shippingFee === 0 ? 'FREE' : `₹${viewingOrder.shippingFee}`}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#34D399', marginTop: '4px' }}>
                <span>Total Amount:</span>
                <span>₹{viewingOrder.total.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', marginTop: '4px' }}>
                <span>Payment Mode:</span>
                <span style={{ color: '#F8FAFC' }}>{viewingOrder.paymentMethod}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                onClick={() => setViewingOrder(null)}
                style={{
                  backgroundColor: '#334155',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
