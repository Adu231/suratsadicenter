import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';
import { useProducts } from '../context/ProductContext.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

export const Catalog = () => {
  const { products, categories, loading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state initialized from URL
  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Derive unique filter lists
  const allFabrics = useMemo(() => {
    const set = new Set();
    products.forEach(p => { if (p.fabric) set.add(p.fabric); });
    return Array.from(set);
  }, [products]);

  const allOccasions = useMemo(() => {
    const set = new Set();
    products.forEach(p => { if (p.occasion) set.add(p.occasion); });
    return Array.from(set);
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.marathiName && p.marathiName.toLowerCase().includes(q)) ||
        p.fabric.toLowerCase().includes(q) ||
        p.colour.toLowerCase().includes(q) ||
        p.occasion.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Fabrics
    if (selectedFabrics.length > 0) {
      result = result.filter(p => selectedFabrics.includes(p.fabric));
    }

    // Occasions
    if (selectedOccasions.length > 0) {
      result = result.filter(p => selectedOccasions.includes(p.occasion));
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter(p => p.stockQuantity > 0);
    }

    // Price
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
  }, [products, searchQuery, selectedCategory, selectedFabrics, selectedOccasions, inStockOnly, maxPrice, sortBy]);

  const handleCategoryChange = (slug) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleFabricToggle = (fabric) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const handleOccasionToggle = (occ) => {
    setSelectedOccasions(prev =>
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
  };

  const resetFilters = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
    setSelectedFabrics([]);
    setSelectedOccasions([]);
    setInStockOnly(false);
    setMaxPrice(20000);
    setSortBy('newest');
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedFabrics.length +
    selectedOccasions.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 20000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="container" style={{ padding: '36px 16px 64px 16px' }}>
      {/* Header Bar */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', marginBottom: '6px' }}>
          {selectedCategory !== 'all'
            ? categories.find(c => c.slug === selectedCategory)?.name || 'Saree Collection'
            : 'All Authentic Sarees'}
        </h1>
        <p style={{ color: 'var(--color-muted-text)', fontSize: '0.95rem' }}>
          Showing <strong>{filteredProducts.length}</strong> handwoven sarees
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>

      {/* Mobile-Friendly Horizontal Category Pills Strip */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '16px',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <button
          onClick={() => handleCategoryChange('all')}
          style={{
            flexShrink: 0,
            padding: '7px 16px',
            borderRadius: 'var(--radius-sm)',
            border: selectedCategory === 'all' ? '1px solid var(--color-antique-gold)' : '1px solid rgba(197, 160, 89, 0.25)',
            backgroundColor: selectedCategory === 'all' ? 'var(--color-primary-maroon)' : '#FFFFFF',
            color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--color-soft-charcoal)',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          All Sarees
        </button>
        {categories.map(c => {
          const isSelected = selectedCategory === c.slug;
          return (
            <button
              key={c.slug}
              onClick={() => handleCategoryChange(c.slug)}
              style={{
                flexShrink: 0,
                padding: '7px 16px',
                borderRadius: 'var(--radius-sm)',
                border: isSelected ? '1px solid var(--color-antique-gold)' : '1px solid rgba(197, 160, 89, 0.25)',
                backgroundColor: isSelected ? 'var(--color-primary-maroon)' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : 'var(--color-soft-charcoal)',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Search & Filter / Sort Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '20px',
        padding: '10px 14px',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)'
      }}>
        {/* Mobile Search Input */}
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <input
            id="catalog-search-input"
            type="text"
            placeholder="Search Paithani, Silk..."
            value={searchQuery}
            onChange={(e) => {
              const newParams = new URLSearchParams(searchParams);
              if (e.target.value) {
                newParams.set('search', e.target.value);
              } else {
                newParams.delete('search');
              }
              setSearchParams(newParams);
            }}
            className="form-input"
            style={{ height: '38px', minHeight: '38px', paddingLeft: '34px', fontSize: '14px' }}
          />
          <Search size={15} color="var(--color-muted-text)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="btn btn-secondary btn-sm mobile-only"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', height: '38px', minHeight: '38px' }}
          >
            <Filter size={14} /> Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary-maroon)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ height: '38px', minHeight: '38px', width: 'auto', padding: '0 8px', fontSize: '13px' }}
          >
            <option value="newest">Newest</option>
            <option value="bestseller">Bestseller</option>
            <option value="price_asc">Price: Low-High</option>
            <option value="price_desc">Price: High-Low</option>
          </select>
        </div>
      </div>

      {/* Main Grid Layout: Sidebar Filters + Products */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {/* Desktop Sidebar Filters */}
        <aside
          className="desktop-only"
          style={{
            width: '260px',
            flexShrink: 0,
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <SlidersHorizontal size={16} /> Filter Sarees
            </h3>
            {activeFiltersCount > 0 && (
              <span className="badge badge-maroon">{activeFiltersCount} active</span>
            )}
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Category</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => handleCategoryChange('all')}
                />
                All Categories
              </label>
              {categories.map(cat => (
                <label key={cat.slug} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.slug}
                    onChange={() => handleCategoryChange(cat.slug)}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fabric Filter */}
          <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Fabric & Material</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {allFabrics.map(fabric => (
                <label key={fabric} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
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

          {/* Occasion Filter */}
          <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px' }}>Occasion</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {allOccasions.map(occ => (
                <label key={occ} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedOccasions.includes(occ)}
                    onChange={() => handleOccasionToggle(occ)}
                  />
                  <span>{occ}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', margin: 0 }}>Max Price</h4>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary-maroon)' }}>
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary-maroon)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-muted-text)', marginTop: '4px' }}>
              <span>₹2,000</span>
              <span>₹20,000</span>
            </div>
          </div>

          {/* In Stock Only */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In Stock Sarees Only
            </label>
          </div>
        </aside>

        {/* Product Cards Grid */}
        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '64px 20px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)'
            }}>
              <Search size={44} strokeWidth={1.5} color="var(--color-muted-text)" style={{ marginBottom: '16px' }} />
              <h3>No Sarees Match Your Filters</h3>
              <p style={{ color: 'var(--color-muted-text)', marginTop: '8px', marginBottom: '24px' }}>
                Try relaxing your price range, clearing selected fabrics, or searching with another keyword.
              </p>
              <button onClick={resetFilters} className="btn btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="mobile-grid-2col">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(37, 35, 33, 0.65)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '85%',
            maxWidth: '360px',
            height: '100%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0 }}>Filter Sarees</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Category */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="form-select"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Price */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                Max Price: ₹{maxPrice.toLocaleString('en-IN')}
              </h4>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-primary-maroon)' }}
              />
            </div>

            {/* Mobile In Stock */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                In Stock Sarees Only
              </label>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 'auto' }}
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
