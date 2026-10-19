import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Search,
  Filter,
  Check,
  Star,
  Sparkles,
  Heart,
  ChevronDown
} from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

export const Home = () => {
  const { products, categories, loading } = useProducts();
  const { wishlistIds } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || ''; // 'wishlist', 'new', 'bestseller'

  // Local filter states
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'bestseller', 'price_asc', 'price_desc'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync search input if typed from header
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Derived filter options from active products
  const availableFabrics = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      if (p.fabric) set.add(p.fabric);
    });
    return Array.from(set);
  }, [products]);

  const availableOccasions = useMemo(() => {
    const set = new Set();
    products.forEach(p => {
      if (p.occasion) set.add(p.occasion);
    });
    return Array.from(set);
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    const activeSearch = searchQuery.trim().toLowerCase();
    if (activeSearch) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(activeSearch) ||
        (p.marathiName && p.marathiName.toLowerCase().includes(activeSearch)) ||
        (p.fabric && p.fabric.toLowerCase().includes(activeSearch)) ||
        (p.colour && p.colour.toLowerCase().includes(activeSearch)) ||
        (p.occasion && p.occasion.toLowerCase().includes(activeSearch)) ||
        (p.sku && p.sku.toLowerCase().includes(activeSearch)) ||
        (p.category && p.category.toLowerCase().includes(activeSearch))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        result = result.filter(p => p.isNewArrival);
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }

    // Wishlist filter mode
    if (filterParam === 'wishlist') {
      result = result.filter(p => wishlistIds.includes(p.id));
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      result = result.filter(p => selectedFabrics.includes(p.fabric));
    }

    // Occasion filter
    if (selectedOccasion !== 'all') {
      result = result.filter(p => p.occasion === selectedOccasion);
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter(p => p.stockQuantity > 0);
    }

    // Price Filter
    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'bestseller') {
      result.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, filterParam, wishlistIds, selectedFabrics, selectedOccasion, inStockOnly, maxPrice, sortBy]);

  const handleCategorySelect = (slug) => {
    const nextParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', slug);
    }
    // Clear wishlist filter if picking category
    nextParams.delete('filter');
    setSearchParams(nextParams);
  };

  const handleFabricToggle = (fabric) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const resetAllFilters = () => {
    const nextParams = new URLSearchParams();
    setSearchParams(nextParams);
    setSelectedFabrics([]);
    setSelectedOccasion('all');
    setInStockOnly(false);
    setMaxPrice(20000);
    setSortBy('newest');
    setLocalSearch('');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (filterParam ? 1 : 0) +
    selectedFabrics.length +
    (selectedOccasion !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 20000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const getActiveCategoryTitle = () => {
    if (filterParam === 'wishlist') return 'My Saree Wishlist';
    if (selectedCategory === 'new-arrivals') return 'New Arrival Sarees';
    if (selectedCategory === 'all') return 'Explore Sarees';
    const found = categories.find(c => c.slug === selectedCategory);
    return found ? found.name : 'Saree Collection';
  };

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: 'calc(100vh - 120px)', paddingBottom: '40px' }}>
      {/* DIRECT PRODUCT DISPLAY — Immediately below header & category navigation */}
      <div className="container" style={{ paddingTop: '16px' }}>

        {/* Catalog Control Bar (Compact Header: Heading, Count, Filter Chips, Sort) */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(197, 160, 89, 0.25)',
          padding: '12px 16px',
          marginBottom: '16px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Top Line: Title + Count + Action Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
                  margin: 0,
                  color: 'var(--color-primary-maroon)',
                  fontFamily: 'var(--font-brand-display)',
                  letterSpacing: '0.02em',
                  fontWeight: 700
                }}>
                  {getActiveCategoryTitle()}
                </h1>
                <span style={{
                  backgroundColor: 'rgba(94, 18, 29, 0.08)',
                  color: 'var(--color-primary-maroon)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: '1px solid rgba(94, 18, 29, 0.2)'
                }}>
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Saree' : 'Sarees'}
                </span>
              </div>
              {searchQuery && (
                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: 'var(--color-muted-text)' }}>
                  Search results for: <strong>"{searchQuery}"</strong>
                </p>
              )}
            </div>

            {/* Quick Sort & Filter Trigger Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="btn btn-secondary btn-sm mobile-only"
                style={{
                  height: '34px',
                  minHeight: '34px',
                  padding: '0 10px',
                  fontSize: '11px',
                  gap: '4px',
                  borderColor: activeFiltersCount > 0 ? 'var(--color-primary-maroon)' : 'var(--color-border)'
                }}
              >
                <Filter size={13} />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span style={{
                    backgroundColor: 'var(--color-primary-maroon)',
                    color: '#FFF',
                    borderRadius: '999px',
                    padding: '0 5px',
                    fontSize: '10px',
                    fontWeight: 700
                  }}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* In Stock Quick Toggle (Desktop) */}
              <label className="desktop-only" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--color-soft-charcoal)',
                cursor: 'pointer',
                padding: '4px 8px',
                backgroundColor: inStockOnly ? 'var(--color-maroon-light)' : '#FAF7F2',
                borderRadius: 'var(--radius-sm)',
                border: inStockOnly ? '1px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                userSelect: 'none'
              }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary-maroon)' }}
                />
                In Stock Only
              </label>

              {/* Sort By Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="desktop-only" style={{ fontSize: '11px', color: 'var(--color-muted-text)', fontWeight: 500 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                  style={{
                    height: '34px',
                    minHeight: '34px',
                    width: 'auto',
                    padding: '0 24px 0 8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-soft-charcoal)',
                    borderRadius: 'var(--radius-sm)',
                    borderColor: 'rgba(197, 160, 89, 0.4)',
                    backgroundColor: '#FAF7F2',
                    cursor: 'pointer'
                  }}
                  aria-label="Sort sarees"
                >
                  <option value="newest">Featured & Newest</option>
                  <option value="bestseller">Popular Bestsellers</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Filters action */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-primary-maroon)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 6px'
                  }}
                  title="Clear all filters"
                >
                  <RotateCcw size={12} /> Clear ({activeFiltersCount})
                </button>
              )}
            </div>
          </div>

          {/* Secondary Quick Filter Pills Strip: Fabric & Price Pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid rgba(197, 160, 89, 0.15)',
            overflowX: 'auto'
          }} className="no-scrollbar">
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-antique-gold)', fontWeight: 700, flexShrink: 0 }}>
              Quick Fabrics:
            </span>

            {['Pure Silk', 'Banarasi Katan Silk', 'Mulberry Silk', 'Chanderi Silk Cotton', 'Pure Tussar Silk'].map(fabric => {
              const active = selectedFabrics.includes(fabric);
              return (
                <button
                  key={fabric}
                  onClick={() => handleFabricToggle(fabric)}
                  style={{
                    flexShrink: 0,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '11px',
                    fontWeight: active ? 700 : 500,
                    border: active ? '1px solid var(--color-primary-maroon)' : '1px solid var(--color-border)',
                    backgroundColor: active ? 'var(--color-primary-maroon)' : '#FFFFFF',
                    color: active ? '#FFFFFF' : 'var(--color-soft-charcoal)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {fabric} {active && '✓'}
                </button>
              );
            })}

            {/* Quick Wishlist Filter Chip */}
            <button
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                if (filterParam === 'wishlist') {
                  nextParams.delete('filter');
                } else {
                  nextParams.set('filter', 'wishlist');
                }
                setSearchParams(nextParams);
              }}
              style={{
                flexShrink: 0,
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                border: filterParam === 'wishlist' ? '1px solid #E02424' : '1px solid var(--color-border)',
                backgroundColor: filterParam === 'wishlist' ? '#FDF2F2' : '#FFFFFF',
                color: filterParam === 'wishlist' ? '#E02424' : 'var(--color-soft-charcoal)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Heart size={11} fill={filterParam === 'wishlist' ? '#E02424' : 'none'} color="#E02424" />
              <span>Wishlist ({wishlistIds.length})</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        {filteredProducts.length === 0 ? (
          /* Meaningful Empty State */
          <div style={{
            textAlign: 'center',
            padding: '56px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid rgba(197, 160, 89, 0.25)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            <Search size={42} strokeWidth={1.5} color="var(--color-muted-text)" style={{ marginBottom: '14px', opacity: 0.6 }} />
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-maroon)', marginBottom: '8px' }}>
              No Sarees Found Matching Your Criteria
            </h3>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '13px', maxWidth: '440px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
              {searchQuery
                ? `No sarees match "${searchQuery}". Please check your spelling or try searching for "Silk", "Paithani", or "Banarasi".`
                : 'No sarees matched the currently selected filters. Relax your fabric, category, or price filters to browse available stock.'}
            </p>
            <button onClick={resetAllFilters} className="btn btn-primary btn-sm">
              <RotateCcw size={13} /> View All Sarees Catalog
            </button>
          </div>
        ) : (
          /* Responsive Product Grid:
             Desktop: 4-5 cards per row
             Tablet: 3 cards per row
             Mobile: 2 cards per row */
          <div className="storefront-product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

      {/* Mobile Slide-over Filter Modal */}
      {mobileFilterOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(3px)'
        }}>
          <div style={{
            width: '85%',
            maxWidth: '340px',
            height: '100%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-drawer)',
            padding: '20px',
            overflowY: 'auto'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={16} color="var(--color-primary-maroon)" />
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Filter Sarees</h3>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter by Category */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-antique-gold)', marginBottom: '8px' }}>
                Category
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="mobile-cat"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategorySelect('all')}
                  />
                  <span>All Sarees</span>
                </label>
                {categories.map(c => (
                  <label key={c.slug} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="mobile-cat"
                      checked={selectedCategory === c.slug}
                      onChange={() => handleCategorySelect(c.slug)}
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Fabric */}
            <div style={{ marginBottom: '18px' }}>
              <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-antique-gold)', marginBottom: '8px' }}>
                Fabric
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {availableFabrics.map(fabric => (
                  <label key={fabric} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => handleFabricToggle(fabric)}
                    />
                    <span>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Price Range */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-antique-gold)', margin: 0 }}>
                  Max Price
                </h4>
                <strong style={{ fontSize: '12px', color: 'var(--color-primary-maroon)' }}>
                  ₹{maxPrice.toLocaleString('en-IN')}
                </strong>
              </div>
              <input
                type="range"
                min="1500"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary-maroon)' }}
              />
            </div>

            {/* In Stock Only */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span>In Stock Sarees Only</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={resetAllFilters}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn btn-primary btn-sm"
                style={{ flex: 1 }}
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid styles for exact responsive spec: 4-5 on desktop, 3 on tablet, 2 on mobile */}
      <style>{`
        .storefront-product-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 640px) {
          .storefront-product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 1024px) {
          .storefront-product-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
          }
        }

        @media (min-width: 1380px) {
          .storefront-product-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};
